---
title: "Pcap Formats"
description: How the packets are encoded
date: 2019-07-06
author: Ross Jacobs

summary: 'captype [manpage](https://www.wireshark.org/docs/man-pages/captype.html) | [code](https://github.com/wireshark/wireshark/blob/master/captype.c)'
weight: 60
draft: false
---

## Capture Formats

### Background

The internet is a testament to our ability to put aside our differences and agree to standards like Ethernet and TCP/IP. In that spirit of cooperation and interoperability, most network vendors have their own [proprietary capture formats](https://imgs.xkcd.com/comics/standards.png).

### Format Prevalence Today

The majority of captures that you will deal with today are `pcap` or `pcapng`. With the prevalence of linux, libpcap, tcpdump, and Wireshark in network devices, most vendors now support the pcap-type natively or produce a hexdump that [can be converted](/edit/text2pcap).

![](https://dl.dropboxusercontent.com/s/pcdkf6f2vi0xwx9/pcap_formats.canvasjs.png)

_This pie chart is based on 6,734 captures from [PacketLife](http://packetlife.net/captures), [Wireshark Samples](https://wiki.wireshark.org/SampleCaptures), and [Wireshark Bugzilla](https://bugs.wireshark.org/bugzilla/) (2019). Gzipped versions of capture types are considered that capture type. Each other capture type constituted < 1%._

### pcap

Pcap as a format was born at the same time as tcpdump/libpcap which used it. Technically, this would place place it at 1988 when tcpdump was created. However, I think it's fairer to place it at 1999 when tcpdump.org was launched and became more well-known.

Pcap is the most common capture type because libpcap has had support and been around for more than 20 years.
As an older format, it allocates fewer fields for packet and capture metadata.

### pcapng

Pcapng is an evolution from the pcap format, created to address some of its deficiencies. Namely, the lack of extensibility and inability to store additional information. Any file that uses comments MUST be a pcapng file because this is one of the features pcapng format enables.

For deconstructing pcapng structure, I would consult Sam's Browne's [wonderful article](https://samsclass.info/seminars/wireshark/pcapng.htm) on the subject.

### Listing Available Formats

The full list of formats that your system supports can be found with `tshark -F`. A sample listing is available if [you're curious](/capture/sources/sample_interfaces#sample-capture-file-types).

## Captype

Capytpe reads a file and prints the file type. It has no flags and takes one or more files as argument.

### Captype Example

```bash
$ captype testdir/*
literally_an_empty_file: erf
aliens.png: mime
largeiftrue.pcapng: pcapng
ch36_monitor.pcap: pcapng
webscraper.py: unknown
captype: "topsecret" is a directory (folder), not a file.
```

It's easy to parse this format with awk. `awk -F ': '`, where `$1` is the filename and `$2` is the filetype.
Any errors will put `captype:` in place of the filename.

## When Your Pcap Extension != Filetype

You may have a file that has a `.pcap` extension but is actually a `.pcapng` file.
This can easily happen if you save to a file like `tshark -w example.pcap` without specifying an encoding.
tshark will default to pcapng, so you'll have pcapng data with a pcap extension.
While tshark and friends will read the encoding and not the extension, other programs may not be as forgiving.

### Correcting Script

It's easy to make this mistake as defaulting to pcap/pcapng [varies by Wireshark utility](/capture/sources/pipe/#piping-with-shark). For example, if we save packets without explicitly setting the capture type using tshark's `-F`, we'll have a pcapng file with a pcap extension.

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

---

## Links

### Pcap Links

#### Pcap Docs

* 2015-08, Guy Harris, Wireshark's [Libpcap File Format](https://wiki.wireshark.org/Development/LibpcapFileFormat)
* Tcpdump, [Link-Layer Header Types](https://www.tcpdump.org/linktypes.html)

#### Pcap Dissection

* 2017-09, Richie Slocum, [PCAP Format](https://github.com/hokiespurs/velodyne-copter/wiki/PCAP-format): Tables of various PDU headers and byte offsets
* 2015-09, Elvidence (AU company), [Understanding time stamps in pcap files](https://www.elvidence.com.au/understanding-time-stamps-in-packet-capture-data-pcap-files/)
* 2012-10, Hani, [Pcap File Format](http://www.kroosec.com/2012/10/a-look-at-pcap-file-format.html): Discussion and dissection of the bytes in a pcap

#### Libpcap Programming

* 2002, Tim Carstens, [Programming with pcap](https://www.tcpdump.org/pcap.html)
* 2001, Martin Casado, [Packet Analysis](http://yuba.stanford.edu/~casado/pcap/section4.html)

---

### Pcapng Links

#### Pcapng Docs

* 2004-03, WinPcap, [Pcapng Standard](https://www.winpcap.org/ntar/draft/PCAP-DumpFileFormat.html)

#### Pcapng Dissection

* 2013-07, Sam Browne, [Pcapng File Format](https://samsclass.info/seminars/wireshark/pcapng.htm)

#### Pcapng Articles

* 2019, Scott Fether, [PCAP Next Generation: Is Your Sniffer Up to Snuff?](https://www.sans.org/reading-room/whitepapers/detection/pcap-generation-sniffer-snuff-38335) (28 pages): Great all around discussion of the Wireshark ecosystem and file formats within it.
* 2015, Cloudshark, [Five Reasons to Move to the Pcapng Capture Format](https://cloudshark.io/articles/5-reasons-to-move-to-pcapng/)
* 2014-08, Jasper Bongertz, [The PCAPng file format](https://blog.packet-foo.com/2014/08/the-trouble-with-multiple-capture-interfaces/): The trouble with multiple capture interfaces

---

### General Links

* Wikipedia: [List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures): How to know from the first few bytes "file magic" of a file what its type is.
* 2016-01, Algis Salys, [Pcap and Pcapng](http://www.algissalys.com/network-security/pcap-vs-pcapng-file-information-and-conversion): pcap, pcapng, and converting between the two
