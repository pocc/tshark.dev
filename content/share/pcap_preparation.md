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

```bash
editcap cut_short.pcap cut_short.pcap
```

You can also make sure that the packet capture is correctly ordered with [reordercap](/edit/reordercap/):

```bash
reordercap coolStory.pcap temp.pcap
mv temp.pcap coolStory.pcap
```

## Filter only for relevant traffic

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

## Hosting it

{{% notice tip %}}
When linking to an online resource in an email, it is best to verify that it works before sending.
{{% /notice %}}

Use a service like dropbox or google drive to host your file(s).
If the packet capture has sensitive information, [edit it out](/edit/sanitizing_hex/) as feasible.

You will also need to share the file with the target audience.
If there are specific recipients in mind, you should specify
their email addresses/access. For corporate infrastructure,
this may be built in to only share with colleagues at the same company.
Regardless, the least access is the best access.

### Package it

If there are multiple files, you may want to create an archive of them.
If your file is too large, you may want to compress it.

On unix systems, tar/gzip are used:

```bash
tar -cfz coolStory.pcap coolStory.tgz
```

On Windows systems, zip/7z are generally used instead.
