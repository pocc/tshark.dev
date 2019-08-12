---
title: "editcap"
description: "Edit packet captures after they have been taken"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/editcap.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolseditcap.html) | [code](https://github.com/wireshark/wireshark/blob/master/editcap.c)'
weight: 30
draft: false
---

## Packet manipulation: tshark vs. editcap

Editcap allows you to filter out packets with -A, -B, packet range selection
[packet#-packet#] and inverted selection (-r). While tshark/editcap have the
same functionality below, tshark is more explicit, [which is better for maintainability](https://dave.cheney.net/2019/07/09/clear-is-better-than-clever).

| editcap flags            | tshark flags                                   |
|--------------------------|------------------------------------------------|
| `-A 2019-01-23 19:01:23` | `-Y "frame.time >= 1548270083"`                |
| `-B 2019-01-23 19:01:23` | `-Y "frame.time <= 1548270083"`                |
| `3-5`                    | `-Y "frame.number >= 3 and frame.number <= 5"` |
| `-r 3-5`                 | `-Y "frame.number < 3 or frame.number > 5`     |
| `7`                      | `-Y "frame.number == 7"`                       |
| `-r 7`                   | `-Y "frame.number != 7"`                       |

### Using tshark to filter by capture/display filter

In order to create a oneliner and pass the filtered file to editcap, you can
create a temporary file:

```bash
tempfile=$(mktemp)
tshark -r dhcp.pcap -Y "dhcp.type == 1" -w $tempfile
editcap $tempfile dhcp2.pcap -a 1:"Cool story bro!"
```

This isn't as elegant as reading from stdin, but editcap does not currently have
this capability

tshark can be used to reduce packet size.

## Fuzzing

editcap has several options to fuzz, including -E, -o, and --seed. You can use them in combination to randomly change a packet capture to fuzz it with your program. This can mimic the bit-flipping that will naturally occur on lossy mediums like 802.11.

### Similar Articles

| Date | Article | Author |
| ---- | ------- | ------ |
| 2018-07-31 | [PCAP Split and Merge](https://blog.packet-foo.com/2018/07/pcap-split-and-merge/) | Jasper |
| 2018-02-22 | [Split a large capture into smaller files](https://supportcenter.checkpoint.com/supportcenter/portal?eventSubmit_doGoviewsolutiondetails=&solutionid=sk43076) | Checkpoint |
| 2011-04-11 | [Extracting Packets From Large Captures](https://packetlife.net/blog/2011/apr/11/extracting-packets-large-captures/) | Packetlife |
| 2009-02-26 | [Editcap, 11 examples](https://www.thegeekstuff.com/2009/02/editcap-guide-11-examples-to-handle-network-packet-dumps-effectively/) | Ramesh Natarajan |
