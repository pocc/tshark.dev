---
title: "text2pcap"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
description: "Write programs to handle text streams, because that is a universal interface – Doug McIlroy"
weight: 40
---

## text2pcap

Convert a hexstring into a packet capture

-a
Enables ASCII text dump identification. It allows one to identify the start of the ASCII text dump and not include it in the packet even if it looks like HEX.

NOTE: Do not enable it if the input file does not contain the ASCII text dump.

-d
Displays debugging information during the process. Can be used multiple times to generate more debugging information.

-D
The text before the packet starts either with an I or O indicating that the packet is inbound or outbound. This is used when generating dummy headers. The indication is only stored if the output format is pcapng.

-e <l3pid>
Include a dummy Ethernet header before each packet. Specify the L3PID for the Ethernet header in hex. Use this option if your dump has Layer 3 header and payload (e.g. IP header), but no Layer 2 encapsulation. Example: -e 0x806 to specify an ARP packet.

For IP packets, instead of generating a fake Ethernet header you can also use -l 101 to indicate a raw IP packet to Wireshark. Note that -l 101 does not work for any non-IP Layer 3 packet (e.g. ARP), whereas generating a dummy Ethernet header with -e works for any sort of L3 packet.

-h
Displays a help message.

-i <proto>
Include dummy IP headers before each packet. Specify the IP protocol for the packet in decimal. Use this option if your dump is the payload of an IP packet (i.e. has complete L4 information) but does not have an IP header with each packet. Note that an appropriate Ethernet header is automatically included with each packet as well. Example: -i 46 to specify an RSVP packet (IP protocol 46). See http://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml for the complete list of assigned internet protocol numbers.

-l
Specify the link-layer header type of this packet. Default is Ethernet (1). See http://www.tcpdump.org/linktypes.html for the complete list of possible encapsulations. Note that this option should be used if your dump is a complete hex dump of an encapsulated packet and you wish to specify the exact type of encapsulation. Example: -l 7 for ARCNet packets encapsulated BSD-style.

-m <max-packet>
Set the maximum packet length, default is 262144. Useful for testing various packet boundaries when only an application level datastream is available. Example:

od -Ax -tx1 -v stream | text2pcap -m1460 -T1234,1234 - stream.pcap

will convert from plain datastream format to a sequence of Ethernet TCP packets.

-n
Write the file in pcapng format rather than pcap format.

-N <intf-name>
Specify a name for the interface included when writing a pcapng format file. By default no name is defined.

-o hex|oct|dec
Specify the radix for the offsets (hex, octal or decimal). Defaults to hex. This corresponds to the -A option for od.

-q
Be completely quiet during the process.

-s <srcport>,<destport>,<tag>
Include dummy SCTP headers before each packet. Specify, in decimal, the source and destination SCTP ports, and verification tag, for the packet. Use this option if your dump is the SCTP payload of a packet but does not include any SCTP, IP or Ethernet headers. Note that appropriate Ethernet and IP headers are automatically also included with each packet. A CRC32C checksum will be put into the SCTP header.

-S <srcport>,<destport>,<ppi>
Include dummy SCTP headers before each packet. Specify, in decimal, the source and destination SCTP ports, and a verification tag of 0, for the packet, and prepend a dummy SCTP DATA chunk header with a payload protocol identifier if ppi. Use this option if your dump is the SCTP payload of a packet but does not include any SCTP, IP or Ethernet headers. Note that appropriate Ethernet and IP headers are automatically included with each packet. A CRC32C checksum will be put into the SCTP header.

-t <timefmt>
Treats the text before the packet as a date/time code; timefmt is a format string of the sort supported by strptime(3). Example: The time "10:15:14.5476" has the format code "%H:%M:%S."

NOTE: The subsecond component delimiter must be specified (.) but no pattern is required; the remaining number is assumed to be fractions of a second.

NOTE: Date/time fields from the current date/time are used as the default for unspecified fields.

-T <srcport>,<destport>
Include dummy TCP headers before each packet. Specify the source and destination TCP ports for the packet in decimal. Use this option if your dump is the TCP payload of a packet but does not include any TCP, IP or Ethernet headers. Note that appropriate Ethernet and IP headers are automatically also included with each packet. Sequence numbers will start at 0.

-u <srcport>,<destport>
Include dummy UDP headers before each packet. Specify the source and destination UDP ports for the packet in decimal. Use this option if your dump is the UDP payload of a packet but does not include any UDP, IP or Ethernet headers. Note that appropriate Ethernet and IP headers are automatically also included with each packet. Example: -u1000,69 to make the packets look like TFTP/UDP packets.

-v
Print the version and exit.

-4 <srcip>,<destip>
Prepend dummy IP header with specified IPv4 dest and source address. This option should be accompanied by one of the following options: -i, -s, -S, -T, -u Use this option to apply "custom" IP addresses. Example: -4 10.0.0.1,10.0.0.2 to use 10.0.0.1 and 10.0.0.2 for all IP packets.

-6 <srcip>,<destip>
Prepend dummy IP header with specified IPv6 dest and source address. This option should be accompanied by one of the following options: -i, -s, -S, -T, -u Use this option to apply "custom" IP addresses. Example: -6 fe80::202:b3ff:fe1e:8329,2001:0db8:85a3::8a2e:0370:7334 to use fe80::202:b3ff:fe1e:8329 and 2001:0db8:85a3::8a2e:0370:7334 for all IP packets.
