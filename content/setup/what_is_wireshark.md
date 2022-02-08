---
title: What is Wireshark?
description: "What does this thing do?"
date: 2019-08-09
author: Ross Jacobs

summary: 'User Guide: [What is Wireshark?](https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html#ChIntroWhatIs)'
weight: 5
draft: false
---

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
