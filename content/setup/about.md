---
title: About
description: "What does this thing do?"
date: 2019-08-09
author: Ross Jacobs

summary: 'User Guide: [What is Wireshark?](https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html#ChIntroWhatIs)'
weight: 5
draft: false
---

## What is tshark.dev?

tshark.dev is your complete guide to working with packet captures on the command-line. The focus here is on doing everything in the CLI because that is an interface your scripts and programs can use. Bash features prominently here, with some examples also in python and ruby. Programs such as
[Termshark](https://termshark.io) and [PyShark](https://kiminewt.github.io/pyshark/) do novel things by leveraging tshark. You can too by using this guide!

For the uninitiated, tshark is the CLI component of Wireshark (see below), and both help you troubleshoot network problems. If you do not have Wireshark installed and configured, [<i class="fas fa-map-marked"></i>  Start Here](/setup/).
Use the minimap or sidebar to find what you need.

This is a living, breathing guide. [Contributions](/nextsteps/contributing/) and suggestions are welcome!

## What is Wireshark?

[Wireshark](https://en.wikipedia.org/wiki/Wireshark) is a tool used to visualize network issues (see below).

Part of the power of Wireshark is that it makes Network Analysis easy by making it visual. You can search for
packets with display filters and then use the packet details pane to look at the relevant info.
Wireshark is well documented with the [Official Documentation](https://www.wireshark.org/docs/)
and the [Wireshark Forums](https://ask.wireshark.org), among others.

<a href="/setup/install"><img src="/images/wireshark_example_welcome.png" style="width:61%" alt="Parts of Wireshark"></a>

<p style="text-align:center"><i>Here we see the details and bytes of the selected packet.</i></p>

In addition to a GUI version, Wireshark comes with many command-line utilities like tshark.

## What is Tshark?

tshark (<u>**T**</u>erminal wire<u>**SHARK**</u>) is the command line tool (CLI) that has most, but not all, of the features of Wireshark.
What features tshark lacks is often found in other CLI tools that are bundled with Wireshark.
All are documented online with [manpages](https://www.wireshark.org/docs/man-pages/).

Most existing documentation on Wireshark focuses on the GUI. Wireshark's CLI is just as good for most tasks and far better for scripting. This guide's focus is tshark for these reasons.

<a href="/setup/install"><img src="/images/tshark_example_welcome.png" style="width:61%" alt="Tshark Example"></a>

## How Is This Different from Wireshark Docs?

Most Wireshark documentation focuses on the GUI. In its many forms, it spans two Wireshark guides, multiple forums, a wiki, man pages, developer email chains, etc. That is not to say the existing documentation is not good. You will find what you are looking for eventually.

Being outside of the Wireshark project allows this website to cover topics that are external to it.
Depending on the article, this can vary from scripting with bash or example usage of other programs. Tshark.dev and Wireshark docs are related but differ in their scopes.