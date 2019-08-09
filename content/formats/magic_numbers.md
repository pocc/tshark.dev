---
title: "Magic Numbers"
description: The first 4-16 bytes of a capture
date: 2019-08-01
author: Ross Jacobs

summary: ''
weight: 70
draft: false
---

The magic number is the first 4 or more bytes in a file that allow an operating system to identify it.
On *nix systems, magic numbers are preferred whereas on Windows, the file extension is used instead.
On *nix systems, this can lead to the curiosity of having a file with data of one type but an extension of another.
For packet captures, it is [easy to fix](/formats/captype/#when-your-pcap-extension-filetype) this.

{{% notice info %}}
This is a work in progress. Only about half of capture file formats that I've collected data on are shown.
{{% /notice %}}

## Magic Numbers Table

The magic numbers in the hex shown here is in _network order_ (i.e. [big-endian](https://en.wikipedia.org/wiki/Endianness)).
Big-endian is the default for xxd, which is used extensively here to gather values. If there are little-endian values here, please file a bug.
This table aims to contain the magic numbers for formats that hold packets.

In the tables below, name and description come from tshark -F and capinfos in the format "name - description".

{{% notice warning %}}
The values shown here are best effort, and are based upon available information.
If you see a problem with these file encodings, please [file an issue](https://github.com/pocc/tshark.dev/issues), along with relevant files.
{{% /notice %}}

### Available via -F flag

| name            | description | hex                                       | string                                             | extension           | Links |
| ----            | ------ | -------------------------------------------- | -------------------------------------------------- | ------------------- | --- |
| 5views          | InfoVista 5View capture | `aa aa aa aa`                                    | `ªªªª`                                             | 5vw                 |
| btsnoop         | Symbian OS btsnoop | `62 74 73 6e 6f 6f 70 00`                          | `btsnoop.`                                      | log                 |
| commview        | TamoSoft CommView  |  -                                           |    -                                                | ncf                 |
| dct2000         | Catapult DCT2000 trace    | `53 65 73 73 69 6f 6e 20`<br>`54 72 61 6e 73 63 72 69`<br>`70 74` | `Session `<br>`Transcri`<br>`pt` | out                 |
| eyesdn          | EyeSDN USB S0/E1 ISDN    | `45 79 65 53 44 4e`                               | `EyeSDN`                                           | trc                 |
| lanalyzer       | Novell LANalyzer | `01 10 4c 00 01 05 54 72`<br>`61 63 65 20 44 69 73 70`<br>`6c 61 79 20 54 72 61 63`<br>`65 20 46 69 6c 65` | `..L...Tr`<br>`ace Disp`<br>`lay Trac`<br>`e File` | tr1 | [WS](https://github.com/wireshark/wireshark/blob/master/wiretap/lanalyzer.c) |
| modpcap         | Modified tcpdump - pcap | `34 cd b2 a1`                                    | `4...`                                    | pcap      |
| netmon1         | Microsoft NetMon 1.x | `52 54 53 53`                                    | `RTSS`                                             |                     |
| netmon2         | Microsoft NetMon 2.x | `47 4d 42 55`                                    | `GMBU`                                             |                     |
| nettl           | HP-UX nettl trace | `00 00 00 01 00 00 00 00`<br>`00 07 D0 00` | `........`<br>`....` | trc0;trc1 | [WS](https://github.com/wireshark/wireshark/blob/master/wiretap/nettl.c) |
| ngsniffer       | Sniffer (DOS) | `54 52 53 4e 49 46 46 20`<br>`64 61 74 61 20 20 20 20`      | `TRSNIFF `<br>`data    `                                 | cap;enc;trc;fdc;syc |
| niobserver      | Network Instruments Observer | `4f 62 73 65 72 76 65 72`<br>`50 6b 74 42 75 66 66 65`<br>`72 56 65 72 73 69 6f 6e` | `Observer`<br>`PktBuffe`<br>`rVersion` | bfr  | [WS](https://github.com/wireshark/wireshark/blob/master/wiretap/network_instruments.c) |
| pcap            | Wireshark/tcpdump/... - pcap | `d4 c3 b2 a1`                                    | `ÔÃ²¡`                                             | pcap;cap;dmp        |
| pcapng          | Wireshark/... - pcapng     | `0a 0d 0d 0a`                                    | `\n\r\r\n`                                         | pcapng;ntar         |
| rf5             | Tektronix K12xx 32-bit | `00 00 02 00 12 05 00 10`                          | `........`                 | rf5                 |
| snoop           | Sun snoop (RFC 1761)      | `73 6e 6f 6f 70 00 00 00` | `snoop...`                                | snoop               |
| suse6_3pcap     | SuSE 6.3 tcpdump - pcap| `34 cd b2 a1` | `4...` | pcap | [EX](https://bugs.wireshark.org/bugzilla/attachment.cgi?id=14604) |
| visual          | Visual Networks traffic capture | `05 56 4e 46` | `.VNF` | eth;pcap;pkt;vn;vntc | [WS](https://github.com/wireshark/wireshark/blob/master/wiretap/visual.c) [EX](https://bugs.wireshark.org/bugzilla/attachment.cgi?id=3210) |

<!-- Need data
| erf             | Endace ERF capture                |                            |                                                                 | |
| k12text         | | | | |
| ngwsniffer_1_1  | NetXray, Sniffer (Windows) 1.1 | | | [EX](https://bugs.wireshark.org/bugzilla/attachment.cgi?id=8281) |
| ngwsniffer_2_0  | Sniffer (Windows) 2.00x | | | |
| nokiapcap       | Nokia tcpdump - pcap | | | |
| nstrace10       | NetScaler Trace (Version 1.0) | | | |
| nstrace20       | NetScaler Trace (Version 2.0) | | | |
| nstrace30       | NetScaler Trace (Version 3.0) | | | |
| nstrace35       | NetScaler Trace (Version 3.5) | | | |
| rh6_1pcap       | RedHat 6.1 tcpdump - pcap | | | |
-->

### Not identified by -F flag

| name            | description | hex                                       | string                                             | extension           | Links |
| --------------- | ------ | -------------------------------------------- | -------------------------------------------------- | ------------------- | --- |
| aethra          | Aethra .aps file                        | `56 30 32 30 38`                             | `V0208`                                            | aps                 | |
| capsa           | Colasoft Capsa                          | `63 70 73 65`                                | `cpse`                                             | cscpkt              | |
|                 | Savvius *Peek                           | `7f 76 65 72` |  `.ver` | pkt;tpc;apc;wpz                | [WS](https://github.com/wireshark/wireshark/blob/master/wiretap/peektagged.c) |
| mplog           | Micropross mplog                        | `4d 50 43 53 49 49` |  `MPCSII`  | mplog                     | [WS](https://github.com/wireshark/wireshark/blob/master/wiretap/mplog.c) [EX](https://bugs.wireshark.org/bugzilla/attachment.cgi?id=14501) |
|                 | Etherwatch                              | `45 54 48 45 52 57 41 54`<br>`43 48 20`      | `ETHERWAT`<br>`CH`                                 |                     | |
|                 | netscreen                               | `28 6f 29 20 6c 65 6e 3d`                    | `(o) len=` <sup>1</sup>                            |                     | |
|                 | radcom                                  | `42 D2 00 34 12 66 22 88`                    | `B..4.f".`                                         |                     | |
<!-- Need data
|                 | Network Monitor, Surveyor, NetScaler    |                                              |                                                    | cap                 | |
|                 | Cinco NetXRay, Sniffer (Windows)        |                                              |                                                    | cap;caz             | |
|                 | XML files (including Gammu DCT3 traces) |                                              |                                                    | xml                 | |
| mplog           | Macos PacketLogger                      |                                              |                                                    | pklg                |  |
| dsna            | Daintree SNA                            |                                              |                                                    | dcf                 | |
| ipfix           | IPFIX File Format                       |                                              |                                                    | pfx;ipfix           | |
|                 | MPEG2 transport stream                  |                                              |                                                    | mp2t;ts;mpg         | |
| vwr80211        | Ixia IxVeriWave .vwr Raw 802.11 Capture |                                              |                                                    | vwr                 | |
|                 | CAM Inspector file                      |                                              |                                                    | camins              | |
|                 | MPEG files                              |                                              |                                                    | mpg;mp3             | |
|                 | Transport-Neutral Encapsulation Format  |                                              |                                                    | tnef                | |
|                 | JPEG/JFIF files                         |                                              |                                                    | jpg;jpeg;jfif       | |
| json            | JavaScript Object Notation file         |                                              |                                                    | json                | |
| ascend          | ? | ? | ? | trace | |
| ber             | ? | ? | ? | pfx | |
| csids           | ? | ? | ? | rsrc | |
| tcpiptrace      | ? | ? | ? | vms_tcpiptrace | |
| usbdump         | ? | ? | ? | usbdump | |
| rfc7468         | ? | ? | ? | pem | |
| peekclassic7    | ? | ? | ? | pkt | |
| dpa400          | ? | ? | ? | bin | |
| stanag4607      | ? | ? | ? | 4607 | |
| peekclassic56   | ? | ? | ? | keytab | |
| iseries_ascii   | ? | ? | ? | cap | [EX](https://bugs.wireshark.org/bugzilla/attachment.cgi?id=9929) |
| toshiba         | ? | ? | ? | cap | [EX](https://bugs.wireshark.org/bugzilla/attachment.cgi?id=755) |
-->

**WS**: Wireshark code, when available

**EX**: File of this type, when available

1. Can also be `2869 2920 6c65 6e3d` / `(i) len=`

A vast majority of this info comes directly from Wireshark's [wiretap
folder](https://github.com/wireshark/wireshark/tree/master/wiretap), and
specifically, [file_access.c](https://github.com/wireshark/wireshark/blob/master/wiretap/file_access.c).

## Further Reading

* [GCK's file signatures table](https://www.garykessler.net/library/file_sigs.html)
* [List of File Signatures (wikipedia)](https://en.wikipedia.org/wiki/List_of_file_signatures) 
