---
title: "tshark.dev"
description: "Using the Wireshark CLI for Packet Analysis"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

weight: 1
draft: false
---

## TShark.dev

This guide provides an outline for packet analysis using tshark. If you do not have Wireshark installed and configured, [<i class="fas fa-map-marked"></i>  Start Here](/setup).
Use the minimap or sidebar to find what you need. Context and a Table of Contents are below.

This is a living, breathing guide. If you’d like to contribute, [fork me on GitHub](https://github.com/pocc/tshark.dev).

### What is Wireshark?

[Wireshark](https://en.wikipedia.org/wiki/Wireshark) is a tool used to visualize network issues.

<a href="/setup/install"><img src="https://dl.dropboxusercontent.com/s/lh17bbhgeumqo2j/wireshark_example.png" alt="Parts of Wireshark" style="width:61%"></a>

_Here we see the details and bytes of the selected packet._

Part of the power of Wireshark is that it makes Network Analysis easy by making it visual. You can search for
traffic you are looking for and then peruse it once you find it.
Wireshark is well documented with the [Official Documentation](https://www.wireshark.org/docs/)
and the [Wireshark Forums](https://ask.wireshark.org), among others.

In addition to a GUI version, Wireshark comes with many command-line utilities like tshark.

### What is tshark?

tshark (Terminal SHARK) is the command line tool (CLI) that has most, but not all, of the features of Wireshark.
What features tshark lacks is often found in other CLI tools that are bundled with Wireshark.
All are documented online with [manpages](https://www.wireshark.org/docs/man-pages/).

<a href="/setup/install"><img src="https://dl.dropboxusercontent.com/s/xu2ufkngsrgrfrm/tshark_example.png" alt="Tshark Example" style="width:61%"></a>

Most existing documentation on Wireshark focuses on the GUI. This guide focuses exclusively on tshark and friends, but links to Wireshark articles when appropriate.

## Table of Contents

{{% children depth="4" %}}
