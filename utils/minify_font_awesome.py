"""Minimize font awesome size by removing unused icons.
Save new file at /static/css/fontawesome-custom.min.css.
"""
import re
import glob

all_fa = {} # fa = font-awesome
all_files = glob.glob("../layouts/**/*.html", recursive=True) + glob.glob("**/*.md", recursive=True)
for f in all_files:
    with open(f) as fl:
        text = fl.read()
    matches = re.findall(r"<i class=\"(f.*?)\"", text)
    for match in matches:
        all_fa[match] = True
used_icons = [icon.split(' ')[1] for icon in all_fa]
print('\n'.join(used_icons))

with open("../static/css/fontawesome-all.min.css") as fa_css:
    css = fa_css.read()

matches = re.findall("(^[\s\S]*?fff}\.)([\s\S]+?)(sr-only[\s\S]*?$)", css)
if len(matches) == 0:
    print("Problem parsing fontawesome. Please create an issue.")
    exit(1)
start, icon_str, end = matches[0]
icons = re.findall(r"fa(?:b|s)?-[a-z0-9-]+:before{content:\"[^\"]+\"}\.", icon_str)
used_icon_strings = []
for icon_text in icons:
    for used_icon in used_icons:
        if used_icon in icon_text:
            used_icon_strings += [icon_text]

custom_fa_min = start + ''.join(used_icon_strings) + end
print(custom_fa_min)
with open("../static/css/fontawesome-custom.min.css", "w") as used_css:
    used_css.write(custom_fa_min)
