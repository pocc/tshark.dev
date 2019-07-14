---
title: "Pcap Formats"
description: How the packets are encoded
date: 2019-07-06
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/captype.html) | [code](https://github.com/wireshark/wireshark/blob/master/captype.c)'
weight: 70
draft: true
---

## Capture Formats

### Background

The internet is a testament to our ability to put aside our differences and agree to standards like Ethernet and TCP/IP. In that spirit of cooperation and interoperability, most network vendors have their own [proprietary capture formats](https://imgs.xkcd.com/comics/standards.png).

### Format Prevalence Today

The majority of captures that you will deal with today are `pcap` or `pcapng`. With the prevalence of linux, libpcap, tcpdump, and Wireshark in network devices, most vendors now support the pcap-type natively or produce a hexdump that [can be converted](/edit/text2pcap).

![](https://dl.dropboxusercontent.com/s/pcdkf6f2vi0xwx9/pcap_formats.canvasjs.png?dl=0)

_This pie chart is based on 6,734 captures from [PacketLife](http://packetlife.net/captures), [Wireshark Samples](https://wiki.wireshark.org/SampleCaptures), and [Wireshark Bugzilla](https://bugs.wireshark.org/bugzilla/) (2019). Gzipped versions of capture types are considered that capture type. Each other capture type constituted < 1%._

## What is the difference between .pcap and .pcapng?

The Wireshark Wiki has [pcap](https://wiki.wireshark.org/Development/LibpcapFileFormat) and [pcapng](https://wiki.wireshark.org/Development/PcapNg) articles that provide background on what they are and why they are used.

## List of file formats

*The full list of formats that your system supports can be found with `tshark -F`. A [sample listing](/capture/sources/sample_interfaces/#sample-capture-file-types) also exists.*

* [pcap](https://wiki.wireshark.org/Development/LibpcapFileFormat)
* [pcapng]

## Captype

Capytpe reads a file and prints the file type. It has no flags and takes one or more files as argument. You can use a wildcard and other bash expansions to match a pattern.

```bash
$ captype testdir/*
literally_an_empty_file: erf
aliens.png: mime
largeiftrue.pcapng: pcapng
ch36_monitor.pcap: pcapng
webscraper.py: unknown
captype: "topsecret" is a directory (folder), not a file.
```

Note that if a file is detected without error, that filename is to the left and it's file type is to the right of a delimiting colon. Any errors will be prefaced with `captype:`.

### Parsing Output

Awk is your friend here. You'll want to use `-F :

{{% notice warning %}}
You may have a file that has a `.pcap` extension but is actually a `.pcapng` file.
While tshark and friends will read the encoding and not the extension,
other programs may not be as forgiving.
{{% /notice %}}

It's easy to make this mistake as many (check which ones XXX ) wireshark utilities default to pcap. For example, if we save packets without explicitly setting the capture type using tshark's `-F`, we'll have a pcapng file with a pcap extension.

```bash
$ tshark -c 100 -w example.pcap
Capturing on 'Wi-Fi: en0'
100
$ captype example.pcap
example.pcap: pcapng
```

To automatically fix this problem, you can use this one-liner. If the filetype is different from the extension, the file is moved to the correct extension. 

```bash
# If captype doesn't know which filetype a file is, it will classify it as "unknown"
# For any captype or awk error condition, mv's 2nd arg collapses to '' and mv will error.
mv -n $file "$(captype $file | awk -F ': ' '{ if ($2 != "unknown") print "'${file%.*}.'"$2}')"
```

## Links

* [ ] https://www.tcpdump.org/pcap/pcap.html