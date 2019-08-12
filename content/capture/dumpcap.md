---
title: "dumpcap"
description: "The part that captures packets"
date: 2019-8-03
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/dumpcap.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsdumpcap.html) | [code](https://github.com/wireshark/wireshark/blob/master/dumpcap.c)'
weight: 97
draft: false
---

## About

Dumpcap is the part of the wireshark suite that captures packets.
Unlike Wireshark and tshark, dumpcap cannot see non-physical interfaces like extcap interfaces.
All of the flags that dumpcap has, tshark also has as tshark has a superset of features of dumpcap.
Not only that, but tshark calls dumpcap for capture functionality.

Under high loads, there is [some evidence](https://www.networkcomputing.com/networking/wireshark-packet-capture-tshark-vs-dumpcap) that tshark drops more packets than dumpcap; however, these results
are taken from a single machine (i.e. n=1).

For normal traffic loads, the choice of using tshark vs dumpcap should be whether you need to use tshark flags.

## Finding The Generated Temporary File

Wireshark and dumpcap will generate a temporary file if you do not specify an output file. This is how it is able to do 2-pass analysis: It has access to a file that it can operate on. tshark will generate this file too, but won't tell you where it is.

{{% notice tip %}}
Specifying the save file with `-w $file` is faster than creating and searching for a temp file.
{{% /notice %}}

### How to find it in Wireshark

<img src="https://dl.dropboxusercontent.com/s/fb65vq02zmh9lyc/wireshark_temp_file.webp" alt="Finding the temp file Wireshark creates">

### How to find it in dumpcap

<img src="https://dl.dropboxusercontent.com/s/glu9t7c8ukgo19d/dumpcap_temp_file.png" alt="Finding the temp file dumpcap creates">

## Further Reading

* Generate [BPF code]() with `dumpcap -d`
* 