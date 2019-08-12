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
Unlike Wireshark and tshark, dumpcap cannot see non-physical interfaces like [extcap interfaces](/capture/sources/extcap_interfaces).
tshark has most of the same flags that dumpcap has because tshark calls dumpcap for much of its capture functionality.

Under high loads, there is [some evidence](https://www.networkcomputing.com/networking/wireshark-packet-capture-tshark-vs-dumpcap) that tshark drops more packets than dumpcap; however, these results
are taken from a single machine (i.e. n=1).

For normal traffic loads, the choice of using tshark vs dumpcap should depend on which flags you want to use.

## Flags Unique to Dumpcap

There are a couple of dumpcap (not tshark) flags that can be used to limit resource usage.

* <u>**-N NUM**</u>: Max number of packets buffered within dumpcap
* <u>**-C NUM**</u>: Max number of bytes used for buffering packets within dumpcap
* <u>**-t**</u>: use a separate thread per interface

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

* [Generate BPF code](/packetcraft/arcana/bpf_instructions) with `dumpcap -d`
* [How to use Dumpcap to capture a rolling packet trace](https://support.microfocus.com/kb/doc.php?id=7015122)
