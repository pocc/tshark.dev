---
title: "Communicate Results"
description: "If a network has an outage and no one reports it, did it actually break?"
date: 2019-07-01
author: Ross Jacobs

pre: <b><i class="fas fa-envelope"></i> </b>
weight: 80
draft: false
---

Packet captures are evidence that events are taking place on your network.
If you think that a packet capture says something, you will want to filter
it for relevant traffic and send it off.

## Preparing the Packet Capture

If you are sending your packet capture on for others to look at, make sure to remove everything that is not necessary.

### Sanitize the Packet Capture

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

### Filter for relevant traffic

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

### Package it

If there are multiple files, you may want to create an archive of them.
If your file is too large, you may want to compress it.

On unix systems, tar/gzip are used:

```bash
tar -cfz coolStory.pcap coolStory.tgz
```

On Windows systems, zip/7z are generally used instead.

## Hosting it

Use a service like dropbox or google drive to host your file(s).
If the packet capture has sensitive information, [edit it out]() as feasible.

You will also need to share the file with the target audience.
If there are specific recipients in mind, you should specify
their email addresses/access. For corporate infrastructure,
this may be built in to only share with colleagues at the same company.
Regardless, the least access is the best access.

## Writing the message

When communicating your findings to others, you should any relevant details
that may help the person reading your message. For example:

* Devices/interfaces you gathered data off of. Include topologies as
appropriate.
* If you are not pre-filtering the packet capture, include the relevant filters.

Any message should have these gestalt elements (at the very least):

* What is the problem (one sentence)?
* How did you collect the packet capture?
* How does the packet capture demonstrate the problem?
* What should be done based upon that conclusion?
