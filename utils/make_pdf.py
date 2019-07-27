#!/usr/bin/env python3
"""This script will convert content/ to a pdf.

Assumes that there is a "title" variable in front matter
and that there are no H1 headings.

Make sure that you wrote all files in content/ as it's possible
for something malicious to happen in parsing it.
"""
import glob
import json
import operator
import os
import platform
import re
import shutil
import subprocess as sp


import toml
import yaml


def check_env():
    """Make sure we are in the right directory and that pandoc is available."""
    this_dir = os.getcwd()
    if os.path.basename(this_dir) != "utils" and "utils" in os.listdir():
        os.chdir("utils")
        this_dir = os.getcwd()
    if os.path.basename(this_dir) != "utils":
        raise Exception("Make sure this script is run from project root or utils subfolder")
    if not os.path.exists("../content"):
        raise Exception("Hugo `content` folder not found in root")
    if not os.path.exists("../config.toml"):
        raise Exception("Hugo `config.toml` file not found in root")
    
    pandoc_path = shutil.which("pandoc")
    if not pandoc_path:
        install_pandoc()

    os.makedirs("_build", exist_ok=True)


def get_value_by_key(key, filename, text):
    """Get value for given regex key in text. 
    Throws an error if there are no results."""
    regex = r"\"? *(?::|=) *\"?(.*?)\"?\n"
    try:
        value = re.findall(key + regex, text)[0]
    except IndexError as e:
        print("WARNING:", filename, "does not contain the " + key +
              " key in toml/yaml front matter.")
        return input("Enter the value for site var, ", key, ": ", sep='')
    return value


def parse_document(filetext: str) -> (dict, str):
    """Parse a document into a frontmatter dict and remaining text as str."""
    matches = re.findall(r"^(?:---\n([\s\S]*?)\n---"
                         r"|\+\+\+\n([\s\S]*?)\n\+\+\+"
                         r"|({\n[\s\S]*\n})\n)([\s\S]*)", filetext)[0]
    if len(matches) == 0:
        raise Exception("File has frontmatter in invalid format."
                        "\nSee https://gohugo.io/content-management/front-matter/.")
    text = matches[-1]
    frontmatter = list(filter(None, matches[:-1]))[0]
    if matches[0]: # YAML
        return yaml.safe_load(frontmatter), text
    elif matches[1]: # TOML
        return toml.loads(frontmatter), text
    elif matches[2]: # JSON
        return json.loads(frontmatter), text
    else:
        raise Exception("Regex failed. Please create an issue!")


def get_proj_params() -> (str, str):
    """Get hugo project params from config.toml."""
    with open("../config.toml") as f:
        config_text = f.read()
    title = get_value_by_key("title", "config.toml", config_text)
    author = get_value_by_key("author", "config.toml", config_text)
    baseURL = get_value_by_key("baseURL", "config.toml", config_text)
    
    return title, author, baseURL


def install_pandoc():
    os_name = platform.system()
    commands = {
            "Windows": ["choco", "install", "pandoc"],
            "Darwin": ["brew", "install", "pandoc"],
            "Linux": ["apt", "install", "pandoc"]
    }
    choice = input("Pandoc not found. Install pandoc (y/n)? ")
    if choice == 'y':
        try: 
            # Using os.system so that pkg manager output is sent to user
            os.system(' '.join(commands[os_name]))
        except Exception as e:
            print("Error installing pandoc:\n", e)
    else:
        exit(1)


def get_text_from_folder(folder: str, index: int, baseURL: str) -> str:
    """ Algorithm is to create a dict of weights and text to be arranged.
    This function checks one folder at a time, recursively
    
    If 2 files at the same level have the same weight, order by title
    """
    proj_dir = os.getcwd()
    combined_text = ""
    file_data = []
    for filename in glob.glob(folder + "/*.md"):
        with open(filename) as f:
            filetext = f.read()
            fm, text = parse_document(filetext)
            if "weight" not in fm: 
                fm["weight"] = 1000000 # Artificially high so as to always rank last (All pages should have a weight)
            if "description" not in fm: 
                if "desc" in fm and fm["desc"]:
                    fm["description"] = fm["desc"]
                else:
                    fm["description"] = ""

            if isinstance(fm["weight"], str):
                if not fm["weight"].isdigit():
                    raise Exception("In file", filename, "weight `",
                                    fm["weight"], "` is not a number.")
                fm["weight"] = int(fm["weight"]) 
            # Convert to quoted block with bolded notice. If there are \n\n in notice block, then part of it will come out of block
            text = re.sub(r"{{% notice ([\S]+?) %}}\n([\s\S]+?)\n{{% +\/notice +%}}", "> __\\1__: \\2", text)
            # Remove chapter TOCs
            text = re.sub(r"\n#+ Table of Contents", "", text)
            text = re.sub(r"{{% children[\s\S]*? %}}", "", text)
            # Skip webp and svg, which pandoc doesn't handle as well
            text = re.sub(r"!\[.*?\]\(.*?.(?:webp|svg).*?\)", "", text)
            # Replace local links with links with baseURL 
            text = re.sub(r"\]\(\/", "](" + baseURL + "/", text)
            try:
                file_datum = {
                        "name": filename,
                        "title": fm["title"], 
                        "desc": fm["description"], 
                        "weight": fm["weight"], 
                        "text": text
                }
            except KeyError as e:
                print("Error with", fm, "\n", e)
                exit(1) 
            if os.path.basename(filename) == "_index.md":
                # to ensure that it gets sorted to be first
                file_datum["weight"] = 0  
            else:
                # Increase heading # by 1 so chapters exist, articles are ##
                text = re.sub(r"\n##", "\n###", text)
                # If H1, H1->H3
                text = re.sub(r"\n# ", "\n### ", text)
                file_datum["text"] = text
            file_data.append(file_datum)

    ordered_files = sorted(file_data, key=operator.itemgetter("weight"))
    for fdict in ordered_files:
        # Chapter sections at level 0 should be top level headers
        is_index = os.path.basename(fdict["name"]) == "_index.md"
        if index < 2 and is_index:
            combined_text += "\n# " + fdict["title"]
        else:
            combined_text += "\n## " + fdict["title"]
        combined_text += "\n\n_" + fdict["desc"] + "_\n" + fdict["text"] + "\n"
    
    folder_data = {}
    for folder in glob.glob(folder + "/*/"):
        index_path = folder + "_index.md"
        if os.path.exists(index_path): # It's not worth worrying about if _index.md denoting section is not present
            with open(index_path) as f:
                index_text = f.read()
            fm, _ = parse_document(index_text)
            if "weight" in fm:
                weight = int(fm["weight"])
            else:
                weight = 1000
            folder_data[folder] = weight

    folders_ordered_by_weight = sorted(folder_data, key=folder_data.get)
    for folder in folders_ordered_by_weight:
        print("INFO: Reading folder", folder)
        if index > 4:
            print("WARNING: Recursing", index, "level of folders deep in", folder)
        combined_text += get_text_from_folder(folder, index+1, baseURL)

    return combined_text


def make_tex_template(title: str, author: str):
    # If a logo exists on this path, add it to the latex on the title page
    logo_text = r"\\vspace{2cm}"
    if os.path.exists("../static/images/logo.png"):
        logo_text = r"\\includegraphics[width=0.6\\textwidth]{static/images/logo.png}"
    tex_addtions = r"""
% Add color to links (Via https://tex.stackexchange.com/questions/57952/changing-pdf-links-style)
\\usepackage{{hyperref}}% http://ctan.org/pkg/hyperref
\\hypersetup{{
  colorlinks=true,
  linkcolor=black,
  urlcolor=cyan
}}

\\begin{{document}}
% Adds \\maketitle manually
\\begin{{titlepage}}
  \\begin{{center}}
      \\vspace*{{1cm}}
      
      \\textbf{{\\Huge {}}}
      
      \\vspace{{4cm}}

      {}
      
      \\vspace{{1.5cm}}
      
      \\textbf{{\\Large {}}}

      \\today
      
      \\vfill
  \\end{{center}}
\\end{{titlepage}}
""".format(title, logo_text, author)
    with open("pandoc_demo.tex") as source:
        text = source.read()
    text = re.sub(r"\\begin{document}", tex_addtions, text)
    with open("_build/template.tex", "w") as template:
        template.write(text)

def convert_to_pdf(title: str, sitename: str, filetext: str):
    """Convert to pdf using pandoc."""
    matches = re.findall(r"https?:\/\/w*\.?([^\/]*)", sitename)
    if len(matches) > 0:
        pdf_name = matches[0]
    else:
        print("WARNING: Fix your baseURL param to be the URL of your website. Using title instead.")
        pdf_name = ''.join(c for c in title if c.isalnum() or c in "-_.")
    input_file = "_build/" + pdf_name + ".md"
    output_file = "_build/" + pdf_name + ".pdf"
    this_dir = os.getcwd() + '/_build/'
    if platform.system() != "Linux": 
        # Supported on Macos, Windows
        fonts = ["Palatino", "Arial", "Menlo"]
    else: 
        # These are supported on a typical Ubuntu installation
        fonts = ["Ubuntu", "Arial", "DejaVu Sans Mono"]
    print("INFO: Converting to PDF using these fonts:", ", ".join(fonts))

    with open(input_file, "w") as f:
        f.write(filetext)
        f.flush()
    cmds = """pandoc -N --template={0}template.tex {1} \
--pdf-engine=xelatex --toc --highlight-style=tango \
--variable mainfont={2} \
--variable sansfont={3} \
--variable monofont={4} \
--variable fontsize=12pt \
-o {5}""".format(this_dir, input_file, *fonts, output_file)
    print("INFO: Calling pandoc with:\n", cmds, sep="")
    sp.call(cmds.split(' '))


def makepdf():
    """Generate a pdf from folders containing markdown files."""
    check_env()
    title, author, baseURL = get_proj_params()
    all_text = get_text_from_folder("../content", 0, baseURL)
    make_tex_template(title, author)
    convert_to_pdf(title, baseURL, all_text)


if __name__ == '__main__':
    makepdf()
