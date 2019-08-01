---
title: "Magic Numbers"
description: The first 4-16 bytes of a capture
date: 2019-07-06
author: Ross Jacobs

summary: ''
weight: 70
draft: true
---

## Magic Numbers (2019)

The magic numbers in the hex shown here is in _network order_ (i.e. [big-endian](https://en.wikipedia.org/wiki/Endianness)).
This table aims to contain the magic numbers for formats that hold packets.

{{% notice warning %}}
The values shown here are best effort, and are based upon available information.
If you see a problem with these file encodings, please [file an issue](https://github.com/pocc/tshark.dev/issues), along with relevant files.
{{% /notice %}}

| name<sup>1</sup>                        | bytes  | hex                                          | string                                             | extension           |
| ----------------------------            | ------ | -------------------------------------------- | -------------------------------------------------- | ------------------- |
| Etherwatch                              | 11     | 4554 4845 5257 4154 4348 20                  | `ETHERWATCH`                                       |                     |
| netmon1                                 | 4      | 5254 5353                                    | `RTSS`                                             |                     |
| netmon2                                 | 4      | 474d 4255                                    | `GMBU`                                             |                     |
| netscreen                               | 8      | 286f 2920 6c65 6e3d                          | `(o) len=` <sup>2</sup>                            |                     |
| radcom                                  | 8      | 42D2 0034 1266 2288                          | `B\xd2\x004\x12f\"\x88`                            |                     |
| Wireshark/tcpdump/... - pcap            | 4      | d4c3 b2a1                                    | `ÔÃ²¡`                                             | pcap;cap;dmp        |
| Wireshark/... - pcapng                  | 4      | 0a0d 0d0a                                    | `\n\r\r\n`                                         | pcapng;ntar         |
| modpcap                                 | 4      | 34cd b2a1                                    | `4\xcd\xb2\xa1`                                    | (same as pcap)      |
| EyeSDN USB S0/E1 ISDN trace format      | 6      | 4579 6553 444e                               | `EyeSDN`                                           | trc                 |
| Sniffer (DOS)                           | 16     | 5452 534e 4946 4620 6461 7461 2020 2020      | `TRSNIFF data    `                                 | cap;enc;trc;fdc;syc |
| InfoVista 5View capture                 | 4      | aaaa aaaa                                    | `ªªªª`                                             | 5vw                 |
| Snoop (RFC 1761)                        | 8      | 736e 6f6f 7000 0000                          | `snoop\x00\x00\x00`                                | snoop               |
| Catapult DCT2000 trace (.out format)    | 18     | 5365 7373 696f 6e20 5472 616e 7363 7269 7074 | `Session Transcript`                               | out                 |
| Aethra .aps file                        | 5      | 5630 3230 38                                 | `V0208`                                            | aps                 |
| HP-UX nettl trace [1](https://github.com/wireshark/wireshark/blob/master/wiretap/nettl.c) | 12     | 0000 0001 0000 0000 0007 D000                | `\x00\x00\x00\x01\x00\x00\x00\x00\x00\x07\xD0\x00` | trc0;trc1           |
| Colasoft Capsa                          | 4      | 6370 7365                                    | `cpse`                                             | cscpkt              |
| Tektronix K12xx 32-bit .rf5 format      | 8      | 0000 0200 1205 0010                          | `\x00\x00\x02\x00\x12\x05\x00\x10`                 | rf5                 |
| Symbian OS btsnoop                      | 8      | 6274 736e 6f6f 7000                          | `btsnoop\x00`                                      | log                 |
| Network Instruments Observer [1](https://github.com/wireshark/wireshark/blob/master/wiretap/network_instruments.c) | 25 | 4f62 7365 7276 6572 506b 7442 7566 6665 7256 6572 7369 6f6e 3d | `ObserverPktBufferVersion=` | bfr                 |
| Novell LANalyzer [1](https://github.com/wireshark/wireshark/blob/master/wiretap/lanalyzer.c) | 30 | 0110 4c00 0105 5472 6163 6520 4469 7370 6c61 7920 5472 6163 6520 4669 6c65 | `\x01\x10L\x00\x01\x05Trace Display Trace File`                                                 | tr1                 |
| Savvius *Peek [1](https://github.com/wireshark/wireshark/blob/20800366ddbbb2945491120afe7265796c26bf11/wiretap/peektagged.c)       |        |                                              |                                                    | pkt;tpc;apc;wpz     |
| Micropross mplog                        |        |                                              |                                                    | mplog               |
| TamoSoft CommView                       |        |                                              |                                                    | ncf                 |
| Network Monitor, Surveyor, NetScaler    |        |                                              |                                                    | cap                 |
| Cinco NetXRay, Sniffer (Windows)        |        |                                              |                                                    | cap;caz             |
| XML files (including Gammu DCT3 traces) |        |                                              |                                                    | xml                 |
| macOS PacketLogger                      |        |                                              |                                                    | pklg                |
| Daintree SNA                            |        |                                              |                                                    | dcf                 |
| IPFIX File Format                       |        |                                              |                                                    | pfx;ipfix           |
| MPEG2 transport stream                  |        |                                              |                                                    | mp2t;ts;mpg         |
| Ixia IxVeriWave .vwr Raw 802.11 Capture |        |                                              |                                                    | vwr                 |
| CAM Inspector file                      |        |                                              |                                                    | camins              |
| MPEG files                              |        |                                              |                                                    | mpg;mp3             |
| Transport-Neutral Encapsulation Format  |        |                                              |                                                    | tnef                |
| JPEG/JFIF files                         |        |                                              |                                                    | jpg;jpeg;jfif       |
| JavaScript Object Notation file         |        |                                              |                                                    | json                |

1. For rows that have an extension, this is the same string that [captype](/formats/captype) will give you. 
2. Can also be `2869 2920 6c65 6e3d` / `(i) len=` 

----------------

	{ "AIX iptrace",                            OPEN_INFO_MAGIC,     iptrace_open,             NULL,       NULL, NULL },
	{ "Microsoft Network Monitor",              OPEN_INFO_MAGIC,     netmon_open,              NULL,       NULL, NULL },
	{ "Cinco NetXray/Sniffer (Windows)",        OPEN_INFO_MAGIC,     netxray_open,             NULL,       NULL, NULL },
	{ "RADCOM WAN/LAN analyzer",                OPEN_INFO_MAGIC,     radcom_open,              NULL,       NULL, NULL },
	{ "HP-UX nettl trace",                      OPEN_INFO_MAGIC,     nettl_open,               NULL,       NULL, NULL },
	{ "Visual Networks traffic capture",        OPEN_INFO_MAGIC,     visual_open,              NULL,       NULL, NULL },
	{ "InfoVista 5View capture",                OPEN_INFO_MAGIC,     _5views_open,             NULL,       NULL, NULL },
	{ "Network Instruments Observer",           OPEN_INFO_MAGIC,     network_instruments_open, NULL,       NULL, NULL },
	{ "Savvius tagged",                         OPEN_INFO_MAGIC,     peektagged_open,          NULL,       NULL, NULL },
	{ "Colasoft Capsa",                         OPEN_INFO_MAGIC,     capsa_open,               NULL,       NULL, NULL },
	{ "DBS Etherwatch (VMS)",                   OPEN_INFO_MAGIC,     dbs_etherwatch_open,      NULL,       NULL, NULL },
	{ "Tektronix K12xx 32-bit .rf5 format",     OPEN_INFO_MAGIC,     k12_open,                 NULL,       NULL, NULL },
	{ "Catapult DCT2000 trace (.out format)",   OPEN_INFO_MAGIC,     catapult_dct2000_open,    NULL,       NULL, NULL },
	{ "Aethra .aps file",                       OPEN_INFO_MAGIC,     aethra_open,              NULL,       NULL, NULL },
	{ "Symbian OS btsnoop",                     OPEN_INFO_MAGIC,     btsnoop_open,             "log",      NULL, NULL },
	{ "EyeSDN USB S0/E1 ISDN trace format",     OPEN_INFO_MAGIC,     eyesdn_open,              NULL,       NULL, NULL },
	{ "Transport-Neutral Encapsulation Format", OPEN_INFO_MAGIC,     tnef_open,                NULL,       NULL, NULL },
	/* 3GPP TS 32.423 Trace must come before MIME Files as it's XML based*/
	{ "3GPP TS 32.423 Trace format",            OPEN_INFO_MAGIC,     nettrace_3gpp_32_423_file_open, NULL, NULL, NULL },
	/* Gammu DCT3 trace must come before MIME files as it's XML based*/
	{ "Gammu DCT3 trace",                       OPEN_INFO_MAGIC,     dct3trace_open,           NULL,       NULL, NULL },
	{ "MIME Files Format",                      OPEN_INFO_MAGIC,     mime_file_open,           NULL,       NULL, NULL },
	{ "Micropross mplog",                       OPEN_INFO_MAGIC,     mplog_open,               "mplog",    NULL, NULL },
	{ "Unigraf DPA-400 capture",                OPEN_INFO_MAGIC,     dpa400_open,              "bin",      NULL, NULL },
	{ "RFC 7468 files",                         OPEN_INFO_MAGIC,     rfc7468_open,                 "pem;crt",  NULL, NULL },
	{ "Novell LANalyzer",                       OPEN_INFO_HEURISTIC, lanalyzer_open,           "tr1",      NULL, NULL },
	/*
	 * PacketLogger must come before MPEG, because its files
	 * are sometimes grabbed by mpeg_open.
	 */
	{ "macOS PacketLogger",                     OPEN_INFO_HEURISTIC, packetlogger_open,        "pklg",     NULL, NULL },
	/* Some MPEG files have magic numbers, others just have heuristics. */
	{ "MPEG",                                   OPEN_INFO_HEURISTIC, mpeg_open,                "mpg;mp3",  NULL, NULL },
	{ "Daintree SNA",                           OPEN_INFO_HEURISTIC, daintree_sna_open,        "dcf",      NULL, NULL },
	{ "STANAG 4607 Format",                     OPEN_INFO_HEURISTIC, stanag4607_open,          NULL,       NULL, NULL },
	{ "ASN.1 Basic Encoding Rules",             OPEN_INFO_HEURISTIC, ber_open,                 NULL,       NULL, NULL },
	/*
	 * I put NetScreen *before* erf, because there were some
	 * false positives with my test-files (Sake Blok, July 2007)
	 *
	 * I put VWR *after* ERF, because there were some cases where
	 * ERF files were misidentified as vwr files (Stephen
	 * Donnelly, August 2013; see bug 9054)
	 *
	 * I put VWR *after* Peek Classic, CommView, iSeries text,
	 * Toshiba text, K12 text, VMS tcpiptrace text, and NetScaler,
	 * because there were some cases where files of those types were
	 * misidentified as vwr files (Guy Harris, December 2013)
	 */
	{ "NetScreen snoop text file",              OPEN_INFO_HEURISTIC, netscreen_open,           "txt",      NULL, NULL },
	{ "Endace ERF capture",                     OPEN_INFO_HEURISTIC, erf_open,                 "erf",      NULL, NULL },
	{ "IPFIX File Format",                      OPEN_INFO_HEURISTIC, ipfix_open,               "pfx;ipfix",NULL, NULL },
	{ "K12 text file",                          OPEN_INFO_HEURISTIC, k12text_open,             "txt",      NULL, NULL },
	{ "Savvius classic",                        OPEN_INFO_HEURISTIC, peekclassic_open,         "pkt;tpc;apc;wpz", NULL, NULL },
	{ "pppd log (pppdump format)",              OPEN_INFO_HEURISTIC, pppdump_open,             NULL,       NULL, NULL },
	{ "IBM iSeries comm. trace",                OPEN_INFO_HEURISTIC, iseries_open,             "txt",      NULL, NULL },
	{ "I4B ISDN trace",                         OPEN_INFO_HEURISTIC, i4btrace_open,            NULL,       NULL, NULL },
	{ "MPEG2 transport stream",                 OPEN_INFO_HEURISTIC, mp2t_open,                "ts;mpg",   NULL, NULL },
	{ "CSIDS IPLog",                            OPEN_INFO_HEURISTIC, csids_open,               NULL,       NULL, NULL },
	{ "TCPIPtrace (VMS)",                       OPEN_INFO_HEURISTIC, vms_open,                 "txt",      NULL, NULL },
	{ "CoSine IPSX L2 capture",                 OPEN_INFO_HEURISTIC, cosine_open,              "txt",      NULL, NULL },
	{ "Bluetooth HCI dump",                     OPEN_INFO_HEURISTIC, hcidump_open,             NULL,       NULL, NULL },
	{ "TamoSoft CommView",                      OPEN_INFO_HEURISTIC, commview_open,            "ncf",      NULL, NULL },
	{ "NetScaler",                              OPEN_INFO_HEURISTIC, nstrace_open,             "cap",      NULL, NULL },
	{ "Android Logcat Binary format",           OPEN_INFO_HEURISTIC, logcat_open,              "logcat",   NULL, NULL },
	{ "Android Logcat Text formats",            OPEN_INFO_HEURISTIC, logcat_text_open,         "txt",      NULL, NULL },
	{ "Candump log",                            OPEN_INFO_HEURISTIC, candump_open,             NULL,       NULL, NULL },
	/* ASCII trace files from Telnet sessions. */
	{ "Lucent/Ascend access server trace",      OPEN_INFO_HEURISTIC, ascend_open,              "txt",      NULL, NULL },
	{ "Toshiba Compact ISDN Router snoop",      OPEN_INFO_HEURISTIC, toshiba_open,             "txt",      NULL, NULL },
	/* Extremely weak heuristics - put them at the end. */
	{ "Ixia IxVeriWave .vwr Raw Capture",       OPEN_INFO_HEURISTIC, vwr_open,                 "vwr",      NULL, NULL },
	{ "CAM Inspector file",                     OPEN_INFO_HEURISTIC, camins_open,              "camins",   NULL, NULL },
	{ "JavaScript Object Notation",             OPEN_INFO_HEURISTIC, json_open,                "json",     NULL, NULL },
	{ "Ruby Marshal Object",                    OPEN_INFO_HEURISTIC, ruby_marshal_open,        "",         NULL, NULL },
	{ "Systemd Journal",                        OPEN_INFO_HEURISTIC, systemd_journal_open,     "log;jnl;journal",      NULL, NULL },
	{ "3gpp phone log",                         OPEN_INFO_MAGIC,     log3gpp_open,             "log",      NULL, NULL },


A vast majority of this info comes directly from Wireshark's [wiretap
folder](https://github.com/wireshark/wireshark/tree/master/wiretap), and
specifically, [file_access.c](https://github.com/wireshark/wireshark/blob/master/wiretap/file_access.c).

## Further Reading

* [GCK's file signatures table](https://www.garykessler.net/library/file_sigs.html)
* [List of File Signatures (wikipedia)](https://en.wikipedia.org/wiki/List_of_file_signatures) 
