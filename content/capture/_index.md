---
title: "Capture Pcap"
description: Everything comes to us that belongs to us if we create the capacity to receive it. – Rabindranath Tagore
date: 2019-06-07
author: Ross Jacobs

pre: <b><i class="fas fa-network-wired"></i> </b>
weight: 10
draft: false
---

Most of the captures you look at will be ones you captured yourself.
This tshark command combines multiple elements that may be relevant to your capture:

| Cmd    | Read From                       | [Limit Filesize](/capture/limit_size) | Change Capture                                                 | Output Format                    |
|--------|---------------------------------|---------------------------------------|----------------------------------------------------------------|----------------------------------|
| tshark | [Interface](/capture/interface) | -f Capture Filter                     | [Name resolving flags](/capture/add_context)                   | [-w Capture]()                   |
|        | [File](/capture/file)           | -Y Display Filters                    | [Comments]()                                                   | [-x Hexdump](/edit/text2pcap)    |
|        | [Pipe](/capture/pipe)           | Disable Protocols                     | [-K Decrypt with Keytab](/analyze/tshark_decryption/#kerberos) | -T Data Formats                  |
|        |                                 | Disable Heuristics                    | [-X Lua Scripting](/packetcraft/lua_scripts/)                  | [Text Report](/reports)          |
|        |                                 | -O Protocols                          |                                                                | [Export Files](/export)          |
|        |                                 | -a Stop Condition                     |                                                                |                                  |
|        |                                 | -b Ring Buffers                       |                                                                |                                  |

## Similar resources

* https://wiki.wireshark.org/CaptureSetup 

#### Table of Contents

{{% children description="true" %}}
