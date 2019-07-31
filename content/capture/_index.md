---
title: "Capture Pcap"
description: "\"Everything comes to us that belongs to us if we create the capacity to receive it.\" – Rabindranath Tagore"
date: 2019-06-07
author: Ross Jacobs

pre: <b><i class="fas fa-network-wired"></i> </b>
weight: 10
draft: false
---

When trying to find the root of a network problem, it helps to look at the packets that might be a symptom.
In order to look at these packets, you must first capture them. This section covers setting up many types of interfaces
and how to limit the capture size.

<a href="/capture/sources"><img src="https://dl.dropboxusercontent.com/s/je9czwd3xgw5qat/port_mirror_topology.png" alt="Diagram of a Network Tap" style="width:61%;"></a>

This is a diagram of a port mirror, but could also be of a network tap. Logically, any capture is a copy of traffic being sent.

<!-- This looks bad because it's incomplete. Do not include yet.
This tshark command combines multiple elements that may be relevant to your capture (eventually all of these will be links):

Drafts that can't be linked yet
[Limit Filesize](/capture/limit_size)
[Name resolving flags](/analyze/add_context) 

Also see https://wiki.wireshark.org/CaptureSetup.

| Cmd    | Read From                                 | Limit Filesize                                | Change Capture                                                 | Output Format                 |
|--------|-------------------------------------------|-----------------------------------------------|----------------------------------------------------------------|-------------------------------|
| tshark | [Interface](/capture/sources)             | -f Capture Filter                             | Name resolving flags                                           | -w Capture                    |
|        | [File](/capture/sources/downloading_file) | -Y Display Filters                            | Comments                                                       | [-x Hexdump](/edit/text2pcap) |
|        | [Pipe](/capture/sources/pipe)             | Disable Protocols                             | [-K Decrypt with Keytab](/analyze/tshark_decryption/#kerberos) | -T Data Formats               |
|        |                                           | Disable Heuristics                            | -X Lua Scripting                                               | Text Report                   |
|        |                                           | -O Protocols                                  |                                                                | [Export Files](/export)       |
|        |                                           | -a Stop Condition                             |                                                                |                               |
|        |                                           | -b Ring Buffers                               |                                                                |                               |
-->

#### Table of Contents

{{% children description="true" depth="9" %}}
