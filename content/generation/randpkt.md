---
title: "Randpkt"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
description: "Fuzzy wuzzy was a malformed packet..."
weight: 20
---

{{% notice note %}}
On <i class="fab fa-windows"></i><b>Windows</b>, the default is to not install randpkt. You must select
randpkt manually during installation.

By default, `randpkt`, `androiddump`, `sshdump`,
`udpdump`, and `randpktdump` are not installed during a Windows installation. If
you want to use these, you will need to manually select them for installation.
{{% /notice %}}

{{% notice warning %}}
~~randpkt -r [crashes for -c > 1](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15627)~~
{{% /notice %}}

## randpkt

[randpkt](https://www.wireshark.org/docs/man-pages/randpkt.html) creates
malformed packets to test packet sniffers and protocol implementations.
randpkt is limited to outputting pcaps and can only create random pcaps of one
type at a time.

<script id="asciicast-235407" src="https://asciinema.org/a/235407.js" async></script>
