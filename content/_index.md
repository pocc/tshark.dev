---
title: "tshark.dev"
description: "Using the Wireshark CLI for Packet Analysis"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

weight: 1
draft: false
---

## Tshark.dev

tshark.dev provides a unified and intuitive UI docs for working with packet captures on the CLI. The focus is on doing everything in the CLI because that is an interface your scripts and programs can use. Bash features prominently here, with some examples also in python and ruby. Programs such as
[Termshark](https://termshark.io) and [PyShark](https://kiminewt.github.io/pyshark/) do novel things by leveraging tshark. You can too by using this guide!

For the uninitiated, tshark is the [CLI component of Wireshark](/setup/what_is_wireshark), and both help you troubleshoot network problems. If you do not have Wireshark installed and configured, [<i class="fas fa-map-marked"></i>  Start Here](/setup).
Use the minimap or sidebar to find what you need.

This is a living, breathing guide. [Contributions](/nextsteps/contributing) and suggestions are welcome!

### How Is This Different from Wireshark Docs?

Most Wireshark documentation focuses on the GUI. In its many forms, it spans 2 Wireshark guides, multiple forums, a wiki, man pages, developer email chains, etc. That is not to say the existing documentation is not good. You will find what you are looking for eventually.

Being outside of the Wireshark project allows this website to cover topics that are external to it.
Depending on the article, this can vary from scripting with bash or example usage of other programs. Tshark.dev and Wireshark docs are related but differ in their scopes.

## Table of Contents

{{% children depth="4" %}}
