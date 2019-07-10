---
title: "Randpkt"
description: "Test protocol dissectors or software with malformed packets."
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/randpkt.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsrandpkt.html) | [code](https://github.com/wireshark/wireshark/blob/master/randpkt.c)'
weight: 10
draft: false
---

## About

randpkt is a tool used to generate [fuzzed](https://www.owasp.org/index.php/Fuzzing) packets for a specefic protocol or randomly from a list. While randpkt has a more limited feature set than [similar tools](#further-reading), it is only has 4 flags and generates packets quickly.

`randpktdump` is available as an [extcap interface](/capture/interfaces/extcap) if you want to tshark to treat this generator as if it were an interface.

## Caveats

* On <i class="fab fa-windows"></i><b>Windows</b>, the default is to not install randpkt. You must select randpkt manually during [installation](/setup/install).
* The `tcp` option uses token-ring instead of ethernet at layer 2. To get packets using the eth/ip/tcp stack, use `giop`, `tdp`, or `bgp`.
* If you set `-b`, byte counts will vary wildly *up to* this byte count ceiling.
* [~~randpkt -r crashes for -c > 1~~](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15627)

## Examples

### Save to pcap

In this asciicast, we'll create pcap with 100 ethernet-II frames and then read it with tshark.

<script id="asciicast-235407" src="https://asciinema.org/a/235407.js" async></script>

To get an idea of possible traffic, [this capture](https://dl.dropboxusercontent.com/s/y9sm8cf885k3q3b/randpkt_all.pcap) contains a fuzzed packet of every available type (2019).

### stdout

If you write to stdout, it will write raw pcap-formatted packet bytes (i.e. looks like �M�0Ϻ�ZR�d%sX�˯B). If you are using stdout, you are sending this onto another utility like tshark.

```bash
# Send 4 ARP frames to tshark
$ randpkt -t arp -c 4 - | tshark -r -
    1   0.000000 00:00:32:25:0f:ff → Broadcast    ARP 3873 Unknown ARP opcode 0x25dc
    2   1.000000 00:00:32:25:0f:ff → Broadcast    ARP 3690 Unknown ARP opcode 0xbb97
    3   2.000000 00:00:32:25:0f:ff → Broadcast    ARP 4618 Unknown ARP opcode 0x8f78
    4   3.000000 00:00:32:25:0f:ff → Broadcast    ARP 1204 Unknown ARP opcode 0x6c41
```

## Similar Tools

### Fuzz an existing capture

* [fuzz-test](https://wiki.wireshark.org/FuzzTesting): Mutates provided captures and then calls Wireshark to try to crash it
* [Fuzz with editcap](/edit/editcap#fuzzing): Mutate a percent of your pcap's bytes

### Generate traffic

* [boofuzz](https://boofuzz.readthedocs.io/en/latest/): "Network Protocol Fuzzing for Humans"
* [trafgen](https://github.com/netsniff-ng/netsniff-ng): Part of a suite of Linux network tools

## Further Reading

* [Awesome-Fuzzing](https://github.com/secfigo/Awesome-Fuzzing): A comprehensive list of fuzzing resources, including books, courses, videos, and tools.
* [Fuzzing Proprietary Protocols](https://wildfire.blazeinfosec.com/fuzzing-proprietary-protocols-with-scapy-radamsa-and-a-handful-of-pcaps/): Author was tasked with security testing the client's in-house protocol after being given traffic samples. He was able to induce 4 crashes by fuzzing with Scapy and Radamsa.
* [Basic AFL Usage](https://volatileminds.net/2015/06/29/basic-afl-usage.html): Using AFL to check tcpdump test cases.
