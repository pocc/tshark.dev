---
title: "Deconstructing Pcap"
description: How the packets are encoded
date: 2019-07-06
author: Ross Jacobs

summary: 'captype [manpage](https://www.wireshark.org/docs/man-pages/captype.html) | [code](https://github.com/wireshark/wireshark/blob/master/captype.c)'
weight: 80
draft: true
---

{{% notice note %}}
You may be familiar with RFC-like protocol diagrams with 32-bit/4 byte lengths.
These diagrams have a 128-bit/16 byte length to match typcial hexdump output.
{{% /notice %}}

<!-- ━┃┏┓┗┛┣┫┳┻╋ ╚╝╔╗║═╠╣╩╦╬ -->
<pre>
                           PCAP HEADER

  0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
┣━━━━━━━━━━━━━━━╋━━━━━━━┳━━━━━━━╋━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━┫
┃  Magic Number ┃ MajVer┃ MinVer┃    ThisZone   ┃    Sigfigs    ┃
┣━━━━━━━━━━━━━━━╋━━━━━━━┻━━━━━━━╋━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛
┃    Snaplen    ┃ Data Link Type┃
┗━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛



                         PACKET HEADER

  0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
┣━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━╋━━━━━━━━━━━━━━━┫
┃ Timestamp Sec ┃ Timestamp μSec┃ Saved Pkt Len ┃ Real Pkt Len  ┃
┗━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛


                      EXAMPLE PACKET (ARP)

  0   1   2   3   4   5   6   7   8   9   A   B   C   D   E   F
┏━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━┳━━━━   ╔═══════╗
     Destination MAC            Source MAC        Type  ║  ARP  ║
╔═══════════════════════╦═══════════════════════╦═══════╩- - - -╣
║  ARP Control fields          Sender MAC          Sender IP    ║
╠ - - - - - - - - - - - ╬ - - - - - - -╦════════╩═══════════════╝
║      Target MAC           Target IP  ║     PADDING            ╻
╚═══════════════════════╩══════════════╝        ┏━━━━━━━━━━━━━━━┫
╻                                               ┃ FCS (Stripped)┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━┛
</pre>
<pre>
                     HOW A PCAP IS STRUCTURED


╔════════╗        PACKET 1             PACKET 2
║  PCAP  ║  ╔════════╦════════╗  ╔════════╦════════╗
║ HEADER ║  ║ Header ║ Packet ║  ║ Header ║ Packet ║  ● ● ●
╚════════╝  ╚════════╩════════╝  ╚════════╩════════╝
</pre>

For example given a single ARP packet, we can use the information above to decode it.

```sh
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
```

1. Take 24 bytes as pcap header.

    ```sh
    00000000: d4c3b2a1 02000400 00000000 00000000
    00000010: ffff0000 01000000
    ```

2. Take 16 bytes as packet header

    ```sh
                                21a96241 90330400
    00000020: 3c000000 3c000000
    ```

3. Real packet length (last 4 bytes) = 0x3c => 60.
So take 60 bytes for the ARP packet.

    ```sh
                                ffffffff ffff0007
    00000030: 0daff454 08060001 08000604 00010007
    00000040: 0daff454 18a6ac01 00000000 000018a6
    00000050: ad9f0601 04000000 00020100 03020000
    00000060: 05010301
    ```

4. Take 16 bytes as packet header.

    ```sh
                       21a96241 b2b40500 3c000000
    00000070: 3c000000
    ```

5. Real packet length (last 4 bytes) = 0x3c => 60.
So take 60 bytes for the ARP packet.

    ```sh
                       ffffffff ffff0007 0daff454
    00000080: 08060001 08000604 00010007 0daff454
    00000090: 18a6ac01 00000000 000018a6 ac8d0100
    000000a0: 00100001 00000000 00002043 4b414141
    ```

6. We've reachead the end of the file, so pcap reading is over.
