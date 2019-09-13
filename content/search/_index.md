---
title: "Search Pcaps"
description: "\"There's nothing that cannot be found through some search engine or on the Internet somewhere.\" – Eric Schmidt"
date: 2019-07-01
author: Ross Jacobs

pre: <b><i class="fas fa-search"></i> </b>
weight: 11
draft: false
---

## Finding Captures

Sometimes it can be beneficial to use someone else's captures instead of your own.
Here are a couple reasons why this might make sense:

* You are learning how a protocol works and do not have access to the devices that use it
* You could capture traffic, but it would be faster to download an existing capture
* You are [writing a protocol dissector](https://www.wireshark.org/docs/wsdg_html_chunked/ChDissectAdd.html) and need more test files

Whatever your reason, there are many repositories of public packet captures.
The largest collection of packet capture collections is [hosted by Netresec](https://www.netresec.com/?page=PcapFiles).
Of these, Wireshark's [Sample Captures](https://wiki.wireshark.org/SampleCaptures) is the most complete.

## Searching Captures

Wouldn't it be nice if you could search existing packet captures for a protocol?  
Well now you can with [Search Pcaps](/search/pcaptable). Search over 6000 pcaps to find the right one!

<a href="/search/pcaptable"><img src="https://dl.dropboxusercontent.com/s/436v02uq6gnnf4b/pcapsearch_screenshot.png" alt="Searching Packet Capturesl" /></a>

### Search Syntax

* All columns are searchable (including description)
* Space is AND
* Double quotes can be used to search for strings with spaces
* To ensure that you search for captures containing a protocol (and not in the description), use brackets like [igmp]

#### Examples

`igmp "AirPcap trace"`: Find all captures that reference the igmp protocol and "AirPcap trace" in the description.
`wlan llc [radiotap]`: All captures that reference wlan and llc in description or protocols, and contain the radiotap protocol.

### Inequality Search Syntax

* A column in `["size", "length", "packets", "ifaces"]`
* An operator in `["==", "!=", ">=", "<=", ">", "<"]`
* A numeric value. KB/MB/GB are understod when comparing size

#### Examples

`size >= 100KB`: All captures that are 100KB or larger  
`length > 60`: All captures longer than 60 seconds

### Sources

* <a href="https://wiki.wireshark.org/SampleCaptures">Wireshark's Sample Captures</a>
* <a href="https://packetlife.net/captures/">Packetlife's Captures</a>
* <a href="https://bugs.wireshark.org/">Wireshark Bugzilla Captures</a>

## Table of Contents

{{% children description="true" depth="4" %}}