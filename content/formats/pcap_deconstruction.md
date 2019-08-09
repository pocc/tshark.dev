---
title: "Pcap Deconstruction"
description: Which bytes mean what
date: 2019-07-06
author: Ross Jacobs

summary: ''
weight: 35
draft: false
---

{{% notice note %}}
You may be familiar with protocol diagrams with 32-bit/4 byte widths like RFC793's [TCP header](https://tools.ietf.org/html/rfc793#section-3.1).
The diagrams below have a 128-bit/16 byte width to match typical hexdump output.
{{% /notice %}}

<!-- ━┃┏┓┗┛┣┫┳┻╋ ╚╝╔╗║═╠╣╩╦╬ -->

## Pcap Internals

<pre>
                            PCAP HEADER (24B)

      0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
    ┣━━━━━━━━━━━━━━━╋━━━━━━━┳━━━━━━━╋━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━┫
    ┃  <a href="/formats/magic_numbers" style="color:white;"><u>Magic Number</u></a> ┃ MajVer┃ MinVer┃    ThisZone   ┃    Sigfigs    ┃
    ┣━━━━━━━━━━━━━━━╋━━━━━━━┻━━━━━━━╋━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛
    ┃    Snaplen    ┃ <a href="https://www.tcpdump.org/linktypes.html" style="color:white;"><u>Data Link Type</u></a>┃
    ┗━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛



                           PACKET HEADER (16B)

      0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
    ┣━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━┫
    ┃ Timestamp Sec ┃ Timestamp μSec┃ Saved Pkt Len ┃ Real Pkt Len  ┃
    ┗━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛



                         N-PACKET PCAP STRUCTURE

                           ╔═════════════════╗
                           ║       PCAP      ║
                           ║      HEADER     ║
                           ╚═════════════════╝

                           ║ PACKET HEADER 1 ║
                           ╠═════════════════╣
                           ║      PACKET     ║
                           ║        #1       ║
                           ╠═════════════════╣
                           ║ PACKET HEADER 2 ║
                           ╠═════════════════╣
                           ║      PACKET     ║
                           ║        #2       ║
                           ╠═════════════════╣
                           ║                 ║

                                   ● ● ●

                           ║                 ║
                           ╠═════════════════╣
                           ║ PACKET HEADER N ║
                           ╠═════════════════╣
                           ║      PACKET     ║
                           ║        #N       ║
                           ╚═════════════════╝
</pre>

_This is a brief overview of pcap fields, but more [in-depth articles](https://wiki.wireshark.org/Development/LibpcapFileFormat) exist._

## Example: Deconstruction of 2 ARP capture

{{% notice note %}}
In the ARP example packet, padding is required to increase the payload to a minimum of 64 bytes  
(See [RFC 1042](https://www.rfc-editor.org/rfc/rfc1042.html), section "For IEEE 802.3").
{{% /notice %}}

<pre>
                     ARP EXAMPLE PACKET (64B)

  0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
┏━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━┳━━━━   ╔═══════╗
     Destination MAC            Source MAC        Type  ║  4 -> ║
╔═══════════════════════╦═══════════════════════╦═══════╩- - - -╣
║ <- ARP Control fields        Sender MAC          Sender IP    ║
╠ - - - - - - - - - - - ╬ - - - - - - -╦════════╩═══════════════╝
║      Target MAC           Target IP  ║     PADDING            ╻
╚═══════════════════════╩══════════════╝        ┏━━━━━━━━━━━━━━━┫
╻                                               ┃ FCS (Stripped)┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛
</pre>

This example goes over how to parse a pcap into its contituent parts (pcap header, packet headers and packets).
This is what Wireshark and tools like it do to read a pcap.
More in-depth dissections written by others are linked to below.

This example parses this two-packet ARP capture:

    00000000: d4c3b2a1 02000400 00000000 00000000
    00000010: ffff0000 01000000 21a96241 90330400
    00000020: 3c000000 3c000000 ffffffff ffff0007
    00000030: 0daff454 08060001 08000604 00010007
    00000040: 0daff454 18a6ac01 00000000 000018a6
    00000050: ad9f0601 04000000 00020100 03020000
    00000060: 05010301 21a96241 b2b40500 3c000000
    00000070: 3c000000 ffffffff ffff0007 0daff454
    00000080: 08060001 08000604 00010007 0daff454
    00000090: 18a6ac01 00000000 000018a6 ac8d0100
    000000a0: 00100001 00000000 00002043 4b414141

1. Take 24 bytes as pcap header.

        00000000: d4c3b2a1 02000400 00000000 00000000
        00000010: ffff0000 01000000

2. Take 16 bytes as packet header

        00000010:                   21a96241 90330400
        00000020: 3c000000 3c000000

3. Real packet length (last 4 bytes) => `0x3c` => 60.
   So take 60 bytes for the ARP packet.

        00000020:                   ffffffff ffff0007
        00000030: 0daff454 08060001 08000604 00010007
        00000040: 0daff454 18a6ac01 00000000 000018a6
        00000050: ad9f0601 04000000 00020100 03020000
        00000060: 05010301

4. Take 16 bytes as packet header.

        00000060:          21a96241 b2b40500 3c000000
        00000070: 3c000000

5. Real packet length (last 4 bytes) = `0x3c` => 60.
   So take 60 bytes for the ARP packet.

        00000060:          ffffffff ffff0007 0daff454
        00000080: 08060001 08000604 00010007 0daff454
        00000090: 18a6ac01 00000000 000018a6 ac8d0100
        000000a0: 00100001 00000000 00002043 4b414141

6. We've reached the end of the file, and there are no more bytes to parse.

### Discussion: Cut short in the middle of a packet

If we had reached the end of the file before the 60 bytes of packet length had been parsed,
tshark would mark this capture as "damaged".
If you've even seen tshark complain that "the capture file appears to have been cut short in the middle of a packet",
this is what it's talking about.

It's easy to generate a pcap and its damaged twin by dropping the last byte of a capture:

    bash$ tshark -c 1 -w - | tee orig.pcap | head --bytes=-1 > damaged.pcap

In this example, we create an `orig.pcap` that has the original data, and a `damaged.pcap` that lacks one byte.
If we diff the files, we can see that the damaged pcap is indeed missing the last byte.

    bash$ diff <(xxd orig.pcap) <(xxd damaged.pcap)
    32c32
    < 000001f0: 0000 0000 0000 0000 6c00 0000            ........l...
    ---
    > 000001f0: 0000 0000 0000 0000 6c00 00              ........l..

And when reading the damaged.pcap, we will get the expected error:

    bash$ tshark -r damaged.pcap
    1 0.000000000    10.0.2.15 → 8.8.8.8      ICMP 98 Echo (ping) request  id=0x1d5b, seq=33560/6275, ttl=64

    tshark: The file "damaged.pcap" appears to have been cut short in the middle of a packet.

Both of these will equivalently fix in place:

    bash$ tshark -r $capture -w $capture
    bash$ editcap $capture $capture

tshark and editcap will read the file and fix any packet lengths that are incorrect.
For seriously damaged pcaps, [pcapfix](http://f00l.de/pcapfix/) will try to salvage it by looking for packets byte-by-byte.

## Further Reading

This chapter also contains a brief article on the [pcap format](/formats/pcap_format).

* 2017-09, Richie Slocum, [PCAP Format](https://github.com/hokiespurs/velodyne-copter/wiki/PCAP-format): Tables of various PDU headers and byte offsets
* 2015-09, Elvidence (AU company), [Understanding time stamps in pcap files](https://www.elvidence.com.au/understanding-time-stamps-in-packet-capture-data-pcap-files/)
* 2012-10, Hani, [Pcap File Format](http://www.kroosec.com/2012/10/a-look-at-pcap-file-format.html): Discussion and dissection of the bytes in a pcap
