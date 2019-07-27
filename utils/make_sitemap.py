"""This script calls mermaid on the mermaid file
and then does post-processing to create a sitemap partial,
which contains hugo variables and functions.
"""

import os
import shutil
import subprocess as sp

def check_env():
    """Check if mermaid is installed."""
    has_mermaid = shutil.which("mmdc")
    if not has_mermaid:
        print("ERROR: Please install required mmdc (mermaid cli).\nSee https://github.com/mermaidjs/mermaid.cli")
        exit(1)
    this_dir = os.getcwd()
    if os.path.basename(this_dir) != "utils" and "utils" in os.listdir():
        os.chdir("utils")
        this_dir = os.getcwd()
    if os.path.basename(this_dir) != "utils":
        raise Exception("Make sure this script is run from project root or utils subfolder")
    os.makedirs("_build", exist_ok=True)
        

def call_mermaid(input_file: str, output_file: str):
    cmds = ["mmdc", "-i", input_file, "-o", output_file]
    child = sp.Popen(cmds, stdout=sp.PIPE, stderr=sp.PIPE)
    stdout, stderr = child.communicate()
    if stdout:
        print("INFO: mmdc run with commands", cmds, "\nStdout:", stdout)
    if stderr or child.returncode:
        print("ERROR: Returned exit code", child.returncode, "\nStderr:", stderr)
        exit(1)
    if os.path.exists("_build/sitemap.svg"):
        print("INFO: Mermaid svg created successfully!")
    else:
        print("ERROR: Problem creating sitemap with no error from mmdc.")
        print("Commands", cmds)

class SvgOps():
    def __init__(self):
        pass

    def postprocess(self):
        """Move around and change elements in ways that mermaid does not support."""
        pass

def convert_svg_to_html():
    """Convert the svg into a inline svg in html."""
    os.rename("_build/sitemap.svg", "_build/sitemap.html")


def hugofy_html():
    """Add hugo functions and variables."""
    pass

def move_to_layouts():
    """Move the finished partial to layouts/partial"""
    os.rename("_build/sitemap.html", "../layouts/partials/mermaid-map.html")
    print("INFO: Completed file move to /layouts/partials")


def run():
    check_env()
    call_mermaid("sitemap.mmd", "_build/sitemap.svg")
    svg = SvgOps()
    svg.postprocess()

    convert_svg_to_html()
    hugofy_html()
    move_to_layouts()


if __name__ == '__main__':
    run()