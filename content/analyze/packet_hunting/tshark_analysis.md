---
title: "Basic Analysis"
description: "The ultimate authority must always rest with the individual's own reason and critical analysis. – Dalai Lama"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

summary: 'Wireshark: [Statistics](https://wiki.wireshark.org/Statistics) | [Network Troubleshooting](https://wiki.wireshark.org/NetworkTroubleshooting)'
weight: 70
draft: true
---

Wireshark is like Google Maps. While you could look at the entire world, Maps
is useful when you zoom into the streets in your town. Maps is also useful
because you can read the words on the screen and understand that roads take
you from point A to point B.

If you open Wireshark and start capturing, you will __ALL__ of the traffic
your machine sees. This is like looking at the most zoomed out version of
Google Maps: The lack of context makes the information less useful. If you
know what you're looking for (like directions to a street address), then
Wireshark can help you. Filter traffic with protocol names and values to arrive at your destination!

To summarize:

- You need to know what you are looking for
- You need understand the relevant protocols. If you are analyzing an
[Monitor-Mode](https://wiki.wireshark.org/CaptureSetup/WLAN) pcap, make sure
you understand [802.11
association](https://mrncciew.com/2014/10/27/cwap-802-11-probe-requestresponse/).

## What to look for

If a tree falls in the forest and nobody heard it, did it actually fall? The
same can be said of a Packet Analysis: If you do not communicate your
findings, then it's as if you didn't find anything. There are a couple types
of problems that you can identify with Wireshark:

### 1. Traffic that should be in a capture is not

Traffic in this category is the most common type of problem

- Any stateful protocol that does not receive a response
- Apple's Rapid DHCP, which may skip Discover+Offer of DHCP
- Expected routing updates not seen

### 2. Traffic that is in the capture that should not be

- Duplicate IP address with different MAC addresses

### 3. Traffic is delayed or out of order

Software implementations of protocols like DHCP have timers. If the response
for a Discover or Request takes too long, the software implementation may
assume it failed and move onto getting an IP addresns with APIPA.

### 4. Traffic violates protocol expectations

If you are writing a software implementation of a protocol or think that your
device may be violating one, you can use Wireshark to analyze the packets.
You can then compare the actual bytes that you see transmitted to the RFC or
spec on the subject.

## Further Reading (Wireshark)

- [Protocol Heirarchy Stats](https://hub.packtpub.com/statistical-tools-in-wireshark-for-packet-analysis/): Viewing packet counts for the protocols present in the capture
- [Viewing Captured Packets](https://www.wireshark.org/docs/wsug_html_chunked/ChapterWork.html): Looking at packets in Wireshark
