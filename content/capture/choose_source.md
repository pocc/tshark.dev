---
title: "Reading from a source"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs
desc: "Like building a regex but more fun!"
tags:
  - networking
  - tshark
weight: 30

draft: true
---

You can read from stdin like so: `tshark -w - | tshark -r -`. Note that if you
are reading from stdin, then the dat astream MUST confrom to a capture type that
tshark knows how to parse. This means, for example, that a pcap file needs to
send the pcap header first or the packets that come after won't be parsed. 

`-r ${input}` can be a file. 

(See bug 2874)

You can also read from a pipe like so:

```bash
mkfifo myfifo
tshark -Q -w myfifo & tshark -i myfifo
```

Confusingly, reading a pipe is through `-i` even though a pipe is not a
configured interface.
