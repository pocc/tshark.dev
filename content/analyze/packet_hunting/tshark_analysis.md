---
title: "Basic Analysis"
description: "The ultimate authority must always rest with the individual's own reason and critical analysis. – Dalai Lama"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

summary: 'Wireshark: [Statistics](https://wiki.wireshark.org/Statistics) | [Network Troubleshooting](https://wiki.wireshark.org/NetworkTroubleshooting)'
weight: 70
draft: false
---

If you open Wireshark and start capturing, you will see __ALL__ of the traffic
your machine sees. Looking for packets without a filter is like trying to find your friend's place by driving around with a picture of his house. If you
know what you're looking for (like a street address), then
Wireshark can help you find traffic faster. When you start your capture journey, you should know what you are looking for, generally speaking.

You also need to understand the operations of relevant protocols.
If you don't understand how protocols work, you won't understand why they break.
If you are analyzing an
[Monitor-Mode](https://wiki.wireshark.org/CaptureSetup/WLAN) pcap, make sure
you understand [802.11
association](https://mrncciew.com/2014/10/27/cwap-802-11-probe-requestresponse/).

## What to look for

{{% notice tip %}}
When in doubt, consult relevant [RFCs](https://tools.ietf.org/rfc/index), protocol documentation, and product manuals.
{{% /notice %}}

While analysis will depend on your domain experience, there are general classes of problems that you can identify with Wireshark.
They are detailed below.

### 1. Traffic that should be in a capture is not

Traffic in this category is the most common type of problem.

- Any stateful protocol that does not receive a response
- Apple's Rapid DHCP, which may skip Discover+Offer of DHCP
- Expected routing updates not seen

### 2. Traffic that is in the capture that should not be

Examples:

- Duplicate IP address with different MAC addresses
- Traffic on the wrong subnet
- DHCP requests in an environment with static IP addresses

### 3. Traffic is delayed or out of order

Software implementations of protocols like DHCP have timers. If the response
for a Discover or Request takes too long, the software implementation may
assume it failed and move onto getting an IP address with APIPA.

### 4. Traffic violates protocol expectations

If you are writing a software implementation of a protocol or think that your
device may be violating one, you can use Wireshark to analyze the packets.
You can then compare the actual bytes that you see transmitted to the RFC or
spec on the subject.

### 5+ Many others

<!-- Add content -->

Feel free to make a [pull request](https://github.com/pocc/tshark.dev/pulls) if there's something I'm missing.

## Further Reading (Wireshark)

- [Protocol Hierarchy Stats](https://hub.packtpub.com/statistical-tools-in-wireshark-for-packet-analysis/): Viewing packet counts for the protocols present in the capture
- [Viewing Captured Packets](https://www.wireshark.org/docs/wsug_html_chunked/ChapterWork.html): Looking at packets in Wireshark
