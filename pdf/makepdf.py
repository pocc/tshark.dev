#!/usr/bin/env python3
"""This script will convert content/ to a pdf.

Assumes that there is a "title" variable in front matter
and that there are no H1 headings.

Make sure that you wrote all files in content/ as it's possible
for something malicious to happen in parsing it.
"""
import glob
import operator
import os
import platform
import re
import shutil
import subprocess as sp
import sys
import tempfile

import toml
import yaml

def check_env():
    """Make sure we have the right files available."""
    this_dir = os.getcwd()
    if os.path.basename(this_dir) == "pdf":
        parent_dir = os.path.dirname(this_dir)
        os.chdir(parent_dir)
    if not os.path.exists("content"):
        raise Exception("Hugo `content` folder not found in root")
    if not os.path.exists("config.toml"):
        raise Exception("Hugo `config.toml` file not found in root")

def get_value_by_key(key, filename, text):
    """Get value for given regex key in text. 
    Throws an error if there are no results."""
    regex = r"\"? *(?::|=) *\"?(.*?)\"?\n"
    try:
        value = re.findall(key + regex, text)[0]
    except IndexError as e:
        print("ERROR:", filename, "does not contain the " + key + " key in toml/yaml front matter."
              "\n\tRegex used: `" + key + regex + "`")
        exit(1)
    return value

def parse_document(filetext: str) -> (dict,):
    """Parse a document into a frontmatter dict and remaining text as str."""
    matches = re.findall(r"^(?:---\n([\s\S]*?)\n---|\+\+\+\n([\s\S]*?)\n\+\+\+|({\n[\s\S]*\n})\n)([\s\S]*)", filetext)[0]
    if len(matches) == 0:
        raise Exception("File has frontmatter in invalid format." + \
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
    with open("config.toml") as f:
        config_text = f.read()
    title = get_value_by_key("title", "config.toml", config_text)
    author = get_value_by_key("author", "config.toml", config_text)
    
    return title, author

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

def get_text_from_folder(folder: str, index: int) -> str:
    """ Algorithm is to create a dict of weights and text so that they can be arranged.
    This function checks one folder at a time, recursively
    
    If 2 files at the same level have the same weight, order by title
    """
    combined_text = ""
    file_data = []
    for filename in glob.glob(folder + "/*.md"):
        with open(filename) as f:
            filetext = f.read()
            fm, text = parse_document(filetext)
            if "weight" not in fm: 
                raise Exception("In file", filename, "weight parameter is not set in front matter.")
            if isinstance(fm["weight"], str):
                if not fm["weight"].isdigit():
                    raise Exception("In file", filename, "weight `", fm["weight"], "` is not a number.")
                fm["weight"] = int(fm["weight"]) 
            # Get rid of notices. At some point convert these to a tex library like bclogo
            text = re.sub(r"{{% notice[\s\S]*?/notice %}}", "", text)
            file_datum = {
                    "name": filename,
                    "title": fm["title"], 
                    "desc": fm["description"], 
                    "weight": fm["weight"], 
                    "text": text
            }
            if os.path.basename(filename) == "_index.md":
                # to ensure that it gets sorted to be first
                file_datum["weight"] = 0  
            else:
                # Decrease heading # by 1 to allow for chapters if ## is being used
                text = re.sub(r"\n##", "\n###", text)
            file_data.append(file_datum)

    ordered_files = sorted(file_data, key=operator.itemgetter("weight"))
    for f_dict in ordered_files:
        # Chapter sections at level 0 should be top level headers
        is_index = os.path.basename(f_dict["name"]) == "_index.md"
        if index < 2 and is_index:
            combined_text += "\n# " + f_dict["title"]
        else:
            combined_text += "\n## " + f_dict["title"]
        combined_text += "\n\n_" + f_dict["desc"] + "_\n" + f_dict["text"] + "\n"
    
    folder_data = {}
    for folder in glob.glob(folder + "/*/"):
        index_path = folder + "_index.md"
        with open(index_path) as f:
            index_text = f.read()
        weight = int(get_value_by_key("weight", index_path, index_text))
        folder_data[folder] = weight

    folders_ordered_by_weight = sorted(folder_data, key=folder_data.get)
    for folder in folders_ordered_by_weight:
        print("INFO: Reading folder", folder)
        if index > 4:
            print("WARNING: Recursing", index, "level of folders deep in", folder)
        combined_text += get_text_from_folder(folder, index+1)

    return combined_text

def convert_to_pdf(filetext: str):
    print("INFO: Converting to PDF")
    this_dir = os.getcwd()
    with tempfile.NamedTemporaryFile() as temp_md:
        temp_md.write(bytes(filetext, "utf-8"))
        temp_md.flush()
        shutil.copy(temp_md.name, "all.md")
        cmds = """pandoc -N --template=template.tex {} --pdf-engine=xelatex --toc
 --variable mainfont="Palatino"
 --variable sansfont="Arial"
 --variable monofont="Menlo"
 --variable fontsize=12pt
 --variable version=2.0
 -o tshark_dev.pdf""".format(this_dir)
        sp.call(cmds.split(' '))

def makepdf():
    check_env()
    title, author = get_proj_params()
    pandoc_path = shutil.which("pandoc")
    if not pandoc_path:
        install_pandoc()
    all_text = "# " + title + "\n\nBy " + author + get_text_from_folder("content", 0)

    convert_to_pdf(all_text)

if __name__ == '__main__':
    makepdf()
