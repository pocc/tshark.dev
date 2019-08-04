---
title: "dumpcap"
description: "Utility that captures packets"
date: 2019-8-03
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/dumpcap.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsdumpcap.html) | [code](https://github.com/wireshark/wireshark/blob/master/dumpcap.c)'
weight: 97
draft: false
---

Dumpcap is the part of the wireshark suite that captures packets.
Unlike Wireshark and tshark, dumpcap cannot see non-physical interfaces like extcap interfaces.
All of the flags that dumpcap has, tshark also has as tshark has a superset of features of dumpcap.
Not only that, but tshark calls dumpcap for capture functionality.

{{% notice tip %}}
When in doubt, use [tshark](/capture/tshark) as a wrapper for dumpcap.
{{% /notice %}}
