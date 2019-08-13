---
title: "Format Usage"
description: Background on how capture formats are used
date: 2019-07-30
author: Ross Jacobs

summary: ''
weight: 1
draft: false
---

## Capture Formats

The difference between pcap and pcapng is much like the difference between Python 2 and Python 3: The latter is the future, but a lot of existing infrastructure is built upon the former.

### Background

The internet is a testament to our ability to put aside our differences and agree to standards like Ethernet and TCP/IP. In that spirit of cooperation and interoperability, most network vendors have their own [proprietary capture formats](https://xkcd.com/927/).

### Format Prevalence Today

The majority of captures that you will deal with today are `pcap` or `pcapng`. With the prevalence of linux, libpcap, tcpdump, and Wireshark in network devices, most vendors now support the pcap-type natively or produce a hexdump that [can be converted](/edit/text2pcap).

<div id="piechart" style="width: 900px; height: 500px;"></div>

_This pie chart is based on 6,734 captures from [PacketLife](http://packetlife.net/captures), [Wireshark Samples](https://wiki.wireshark.org/SampleCaptures), and [Wireshark Bugzilla](https://bugs.wireshark.org/bugzilla/) (2019). Gzipped versions of capture types are considered that capture type. Each other capture type constituted < 1%._

### Output Formats of Tshark & Friends

| Utilities                                                                                                    | Output formats                                 | Default |
| ----------------------------------                                                                           | ---------------------------------------------  | ------- |
| [tshark](/capture/tshark), [dumpcap](/capture/dumpcap), [editcap](/edit/editcap), [mergecap](/edit/mergecap) | `$cmd -F`<a href="#utils1"><sup>1</sup></a>    | pcapng  |
| [text2pcap](/edit/text2pcap), [randpkt](/generation/randpkt/)                                                | pcap, pcapng<a href="#utils2"><sup>2</sup></a> | pcap    |
| [reordercap](/edit/reordercap)                                                                               | same as input                                  | -       |

<sup id="utils1">1</sup> Specify a format with `$cmd -F <fmt>` and use `$cmd -F`
to see formats available to tshark and friends.

<sup id="utils2">2</sup> pcapng only available with text2pcap when using the `-n` option

{{% notice note %}}
This is a summary of a [larger table](/capture/sources/pipe/#piping-with-shark).
{{% /notice %}}
