---
title: "Search Online Pcaps"
description: "\"There's nothing that cannot be found through some search engine or on the Internet somewhere.\" – Eric Schmidt"
date: 2019-07-01
author: Ross Jacobs

pre: <b><i class="fas fa-download"></i> </b>
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
Well now you can with [Search Pcaps](/download/search_pcaps). Search over 6000 pcaps to find the right one!

### Search Syntax

* All fields are searchable
* Space is AND
* Use [brackets] around a protocol
* double quotes can be used to search for long strings

### Sources

* <a href="https://wiki.wireshark.org/SampleCaptures">Wireshark's Sample Captures</a>
* <a href="https://packetlife.net/captures/">Packetlife's Captures</a>
* <a href="https://bugs.wireshark.org/">Wireshark Bugzilla Captures</a>

## Table of Contents

{{% children description="true" depth="4" %}}