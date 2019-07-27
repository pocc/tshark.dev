---
title: "Pcapng Format"
description: Format, The Next Generation
date: 2019-07-06
author: Ross Jacobs

summary: ''
weight: 40
draft: false
---

## Pcapng

Pcapng is an evolution from the pcap format, created to address some of its deficiencies. Namely, the lack of extensibility and inability to store additional information. Any file that uses comments MUST be a pcapng file because this is one of the features pcapng format enables.

For deconstructing pcapng structure, I would consult Sam's Browne's [wonderful article](https://samsclass.info/seminars/wireshark/pcapng.htm) on the subject.

## Pcapng Links

### Pcapng Docs

* 2004-03, WinPcap, [Pcapng Standard](https://www.winpcap.org/ntar/draft/PCAP-DumpFileFormat.html)

### Pcapng Dissection

* 2013-07, Sam Browne, [Pcapng File Format](https://samsclass.info/seminars/wireshark/pcapng.htm)

### Pcapng Articles

* 2019, Scott Fether, [PCAP Next Generation: Is Your Sniffer Up to Snuff?](https://www.sans.org/reading-room/whitepapers/detection/pcap-generation-sniffer-snuff-38335) (28 pages): Great all around discussion of the Wireshark ecosystem and file formats within it.
* 2015, Cloudshark, [Five Reasons to Move to the Pcapng Capture Format](https://cloudshark.io/articles/5-reasons-to-move-to-pcapng/)
* 2014-08, Jasper Bongertz, [The PCAPng file format](https://blog.packet-foo.com/2014/08/the-trouble-with-multiple-capture-interfaces/): The trouble with multiple capture interfaces
