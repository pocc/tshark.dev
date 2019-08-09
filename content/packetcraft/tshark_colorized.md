---
title: "Tshark, Colorized"
description: "With color one obtains an energy that seems to stem from witchcraft. — Henri Matisse"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: '[colors in tshark!](http://blog.goodell.io/2017/06/13/tshark-colors/) | [24bit color](https://github.com/termstandard/colors)'
weight: 20
draft: false
---

Part of the allure of Wireshark is the ability to identify networking problems
with the use of color. Relatively recently, tshark has gained this ability too
with the `--color` flag. This article goes over how to set it up on your system.

<img src="https://dl.dropboxusercontent.com/s/pt45pphiekt4srh/packets_the_universal_interface.png" alt="Color on all 4 Operating Systems" style="width:61%;">
<div style="text-align:center;">_Demonstration of tshark \-\-color on Windows, Macos, Linux, and BSD._</div>

## Aliasing Tshark for Color

You can alias tshark for your terminal session with this:

```bash
alias tshark='tshark --color'`
```

Add this line to your .bashrc to have it permanently:

```bash
echo -e "alias tshark='tshark --color'" >> ~/.bashrc
source ~/.bashrc
```

## Using a compatible terminal

Support for terminal colors depends on whether "truecolor" 24-bit colors are
implemented. One way to check for it is to query the `$COLORTERM` environment
variable. If supported, `echo $COLORTERM` will return `truecolor` or `24bit`.

[This repo](https://github.com/termstandard/colors) keeps track whether your
${TERMINAL} supports 24bit-color as well as general 24bit-color info.

I have tested 24bit-color and `tshark --color` compatibility across multiple terminals.  
These are my recommendations:

| Platform | Recommendations                                                                                                       |
|----------|-----------------------------------------------------------------------------------------------------------------------|
| Windows  | [Mobaxterm](https://mobaxterm.mobatek.net/), [WSL](http://wsl-guide.org/en/latest/installation.html) [1]              |
| Macos    | [iTerm2](https://www.iterm2.com/), [upterm](https://github.com/railsware/upterm)                                      |
| Linux    | [gnome-terminal](http://manpages.ubuntu.com/manpages/cosmic/man1/gnome-terminal.1.html), Any terminal using `libvte`  |
| BSD      | [gnome-terminal](http://manpages.ubuntu.com/manpages/cosmic/man1/gnome-terminal.1.html),  Any terminal using `libvte` |

[1]: Note that you can call Powershell from Mobaxterm or WSL, but given that
Powershell does not support 24bit-color, you are limited to using bash
pseudo-terminals on Windows to get 24bit-color.

## Windows Considerations

_As with most things terminal, Windows complicates things._

### The problem

- The Windows version of tshark will print 16 colors, instead of 24bit
  "truecolor". 
- The Linux version of tshark usable by WSL and Mobaxterm can print in
  truecolor
- The Linux version of tshark (like tcpdump on WSL) is not able to capture
  packets. This is because sockets (SOCK_RAW/SOCK_PACKET) are [not yet
  implemented](https://github.com/Microsoft/WSL/issues/1515) in WSL.

### The hack

I created a hack that will allow you to use `tshark --color` while capturing on
Windows by using both Windows and Linux tsharks.

1. [Install Wireshark](/setup/install) # Link to the Windows section
2. [Install WSL](http://wsl-guide.org/en/latest/installation.html)
3. Install tshark on WSL with `sudo apt install tshark`
4. Add this [bash function](https://gist.github.com/pocc/b2017eeb2609f80a38d8db811d1c6cb8) to your `~/.bashrc`:
5. `source ~/.bashrc`
6. Test by live capturing with the `tshark` command with no options:

<img src="https://dl.dropboxusercontent.com/s/lofz8vta3nsyb8o/tshark_on_windows.png" alt="Color on Windows" style="width:80%"></img>
