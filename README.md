# Packet Analysis with Tshark

[![Netlify Status](https://api.netlify.com/api/v1/badges/a4908e43-12a2-4a57-926d-43b639fed0a4/deploy-status)](https://app.netlify.com/sites/pedantic-lumiere-bf6286/deploys)

This repo exists for managing guide content.

<a href="https://tshark.dev"><img src="https://dl.dropboxusercontent.com/s/nbu25m8ro80iukx/tshark_dev.png" alt="tshark.dev screenshot" style="margin-left: 6%;margin-right: 6%;"/></a>

The main aim for the site is to provide example usage of
working with packets and hopefully give back something
to the networking community in the process.

This website is built using [hugo](https://gohugo.io/), an open-source static
site generator.

## Build it

### Serve tshark.dev locally

1. Download the repo

   ```
   git clone https://github.com/pocc/tshark.dev
   cd tshark.dev
   ```

2. [Install hugo](https://gohugo.io/getting-started/installing/)

3. Start the server: `hugo server`

4. Open the address in a browser (default is localhost:1313)

### Generate tshark.dev PDF

1. Install the latest [pandoc](https://pandoc.org/installing.html).
   Do NOT your package manager's version as it may use deprecated command syntax.

2. Install a PDF engine for pandoc to use.

    On linux, this will be [XeTeX](https://en.wikipedia.org/wiki/XeTeX):

    ```bash
    $ sudo apt install texlive-xetex
    ```

    On Macos, install mactex or basictex:
    ```bash
    # mactex is ~1GB
    brew cask install mactex
    
    # basictex is smaller and should have most features
    brew cask install basictex
    # Install required font not bundled with basictex
    # tlmgr is a tex package manager that is part of basictex
    sudo tlmgr install lm-math
    ```

    More information about installation can be found at the [LaTeX website](https://www.latex-project.org/get/).

3. Combine all content into one markdown document ("Packet-Analysis.md") by calling `python makepdf.py`.
   This script should also generate the accompanying PDF.

4. (Optional) Generate the PDF manually

    These commands are modified from pandoc's examples and sphinx-build latex output.
    If these fonts are not available on Ubuntu, use "Ubuntu"/"Arial"/"DejaVu Sans Mono"

    ```bash
    cd tshark.dev/pdf
    pandoc -N --template=template.tex Packet-Analysis.md --pdf-engine=xelatex --toc \
        --variable mainfont="Palatino" \
        --variable sansfont="Arial" \
        --variable monofont="Menlo" \
        --variable fontsize=12pt \
        --variable version=2.0 \
        -o Packet-Analysis.pdf
    ```

## Contribution Guide

Contributions to the site are greatly appreciated, if you see a typo or
something that isn't quite right and want to help improve the site for everyone
then please feel free to submit a pull request.

- Start off by forking the repository
- Make any changes you have in mind
- Submit a Pull Request from your forked version back into the original version
  of the site
- I'll review it and approve it
- It'll automatically go live in seconds!

A list of contributors is available [here](https://github.com/pocc/tshark.dev/graphs/contributors).
