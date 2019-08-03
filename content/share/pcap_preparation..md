---
title: "Preparing The Capture"
description: "Prepare your capture to be shared with others"
date: 2019-08-03
author: Ross Jacobs

summary: ''
weight: 30
draft: false
---

If you are sending your packet capture on for others to look at, make sure to remove everything that is not necessary.

## Sanitize the Packet Capture

```perl
mbp:tshark.dev rj$ tshark -r cut_short.pcap
    1   0.000000 00:0e:58:54:10:68 → Broadcast    802.11 137 Data, SN=359, FN=0, Flags=.p....F.C

tshark: The file "cut_short.pcap" appears to have been cut short in the middle of a packet.
```

To fix this, you can use any wireshark tool to read and then write the packets.
Using editcap is the shortest here and allows you to replace to the same file.

* `editcap cut_short.pcap cut_short.pcap`

You can also make sure that the packet capture is correctly ordered with reordercap:

```bash
reordercap coolStory.pcap temp.pcap
mv temp.pcap coolStory.pcap
```

### Filter only for relevant traffic

You should know what the relevant traffic is here.
A couple example filters are provided below for various issues:

```bash
# If there is a dhcp problem
filter='dhcp'
# The problem is between frames 100 and 200 (inclusive)
filter='frame.number >= 100 && frame.number <= 200'
# The problem is between seconds 5 and 7 after pcap start
filter='frame.time_relative >= 5 && frame.time_relative <= 7'
```

Once you've decided what filter you want to use, edit your pcap.

```bash
tshark -r coolStory.pcap -Y "$filter" -w coolStory.pcap
```
