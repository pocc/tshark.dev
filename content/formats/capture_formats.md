---
title: "Capture Formats"
description: Background on how capture format usage
date: 2019-07-30
author: Ross Jacobs

summary: ''
weight: 1
draft: false
---

## Capture Formats

The difference between pcap and pcapng is much like the difference between Python 2 and Python 3: The latter is the future, but a lot of infrastrucutre is built upon the former.

### Background

The internet is a testament to our ability to put aside our differences and agree to standards like Ethernet and TCP/IP. In that spirit of cooperation and interoperability, most network vendors have their own [proprietary capture formats](https://imgs.xkcd.com/comics/standards.png).

### Format Prevalence Today

The majority of captures that you will deal with today are `pcap` or `pcapng`. With the prevalence of linux, libpcap, tcpdump, and Wireshark in network devices, most vendors now support the pcap-type natively or produce a hexdump that [can be converted](/edit/text2pcap).

![](https://dl.dropboxusercontent.com/s/pcdkf6f2vi0xwx9/pcap_formats.canvasjs.png)

_This pie chart is based on 6,734 captures from [PacketLife](http://packetlife.net/captures), [Wireshark Samples](https://wiki.wireshark.org/SampleCaptures), and [Wireshark Bugzilla](https://bugs.wireshark.org/bugzilla/) (2019). Gzipped versions of capture types are considered that capture type. Each other capture type constituted < 1%._

### Listing Available Formats

The full list of formats that your system supports can be found with `tshark -F`. A sample listing is available if [you're curious](/capture/sources/sample_interfaces#sample-capture-file-types).
