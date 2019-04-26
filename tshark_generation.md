---
title: "Wireshark Generation"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Generating pcaps for fun and profit!"
tags:
  - networking
  - wireshark
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

_Make traffic that didn't exist before._

__Note for Windows users__: _By default, `randpkt`, `androiddump`, `sshdump`,
`udpdump`, and `randpktdump` are not installed during a Windows installation. If
you want to use these, you will need to manually select them for installation._

## <a name=randpkt></a>randpkt

Note: <i>On Windows, the default is to not install randpkt. You must select
randpkt manually during installation.</i>

Caveat: <i>randpkt -r
[crashes for -c > 1](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15627)</i>

[randpkt](https://www.wireshark.org/docs/man-pages/randpkt.html) creates
malformed packets to test packet sniffers and protocol implementations.
randpkt is limited to outputting pcaps and can only create random pcaps of one
type at a time. 
<script id="asciicast-235407" src="https://asciinema.org/a/235407.js" async></script>

Most likely, you want a traffic generator and not a pcap generator:

* [Scapy](https://scapy.net/): Packet generator with a Python API for scripting
* [Ostinato](https://github.com/pstavirs/ostinato): Network traffic generator
  with a GUI (also has a Python API)
* [TRex](https://trex-tgn.cisco.com/) is based on DPDK and can generate 10Gbps
  of traffic
* Ixia/Spirent/etc. have comprehensive paid solutions that are suitable for device
  manufacturers

