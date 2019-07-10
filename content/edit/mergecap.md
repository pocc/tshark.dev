---
title: "mergecap"
description: "Merge captures together"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/mergecap.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsmergecap.html) | [code](https://github.com/wireshark/wireshark/blob/master/mergecap.c)'
weight: 30
draft: false
---

## Why combine captures

* You captured with a <!--TODO WRITE YOUR OWN! -->[ring buffer](https://www.cellstream.com/reference-reading/tipsandtricks/328-wireshark-ring-buffer-capture-from-the-command-line-using-t-shark) with `tshark -b files:$NUM`, and need one file
* You have a program that accepts one file as input and you have multiple
* You want to aggregate all instances of a problem found in multiple captures, remove non-relevant traffic, and then send it to a colleague.

### Caveats

#### Input captures should be correctly ordered

`mergecap` assumes that all packet captures are already correctly ordered. 
If one of the source capture has out-of-order packets, the merged capture will have unpredictably located, out-of-order packets.

#### Default capture type is pcapng

`mergecap` will save a file as pcapng unless a different capture type is specified.
This means that `mergecap file1.pcap ... -w merged.pcap` will have a pcap extension but filetype pcapng.

### Examples

* Combine all .pcap files in current directory

        mergecap *.pcap -w merged.pcapng

* Combine all files recursively in a directory ([<i class="fab fa-stack-overflow"></i> inspiration](https://unix.stackexchange.com/questions/113834/using-mergecap-for-set-of-files))

        find /path/to/dir -type f -maxdepth 2 \
          | xargs mergecap -w merged.pcapng

* Same as above, but reorder all pcaps before merging ([preempts caveat](#input-captures-should-be-correctly-ordered))

        find /path/to/dir -type f -maxdepth 2 \
          | xargs -I"{}" reordercap "{}" "{}" \
          | xargs mergecap -w merged.pcapng

### Similar Tools

#### Joincap

[joincap](https://github.com/assafmo/joincap) is a go-based tool that merges captures together, but avoids these errors:

* Corrupt input global header
* Corrupt input packet header
* Input file size is between 24 and 40 bytes (global header is ok, first packet header is truncated)
* Input file doesn't exists
* Input file is a directory

#### Tcpslice

[tcpslice](https://linux.die.net/man/8/tcpslice) merges captures together with 1.5X throughput and speed compared to mergecap (based on [mergecap v2.4.5 testing](https://github.com/assafmo/joincap#benchmarks)).
It has fewer features: Namely, it can only merge and select packets based upon timestamp.
It will also fail if the difference between timestamps exceeds a year.

### Similar Articles

* [Comprehensive Example](https://blog.packet-foo.com/2018/07/pcap-split-and-merge/)
* [Example on Windows 10](https://www.cellstream.com/reference-reading/tipsandtricks/329-using-the-mergecap-tool-to-merge-packet-captures)
