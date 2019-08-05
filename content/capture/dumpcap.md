---
title: "dumpcap"
description: "The part that captures packets"
date: 2019-8-03
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/dumpcap.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsdumpcap.html) | [code](https://github.com/wireshark/wireshark/blob/master/dumpcap.c)'
weight: 97
draft: false
---

## About

Dumpcap is the part of the wireshark suite that captures packets.
Unlike Wireshark and tshark, dumpcap cannot see non-physical interfaces like extcap interfaces.
All of the flags that dumpcap has, tshark also has as tshark has a superset of features of dumpcap.
Not only that, but tshark calls dumpcap for capture functionality.

Under high loads, there is [some evidence](https://www.networkcomputing.com/networking/wireshark-packet-capture-tshark-vs-dumpcap) that tshark drops more packets than dumpcap; however, these results
are taken from a single machine (i.e. n=1).

For normal traffic loads, the choice of using tshark vs dumpcap should be whether you need to use tshark flags.

## Example: dumpcap -d

_print generated BPF code for capture filter._

{{% notice note %}}
When using `-d`, you still need to specify `-f` in `-f "<filter>"`, or else you wil only see the last instruction.
{{% /notice %}}

In this example, let's use "tcp port 443", as http is just a little popular these days.

### BPF Instructions

```bash
dumpcap -d -f "tcp port 443"
Capturing on 'Wi-Fi: en0'
(000) ldh      [12]
(001) jeq      #0x86dd          jt 2    jf 8
(002) ldb      [20]
(003) jeq      #0x6             jt 4    jf 19
(004) ldh      [54]
(005) jeq      #0x1bb           jt 18   jf 6
(006) ldh      [56]
(007) jeq      #0x1bb           jt 18   jf 19
(008) jeq      #0x800           jt 9    jf 19
(009) ldb      [23]
(010) jeq      #0x6             jt 11   jf 19
(011) ldh      [20]
(012) jset     #0x1fff          jt 19   jf 13
(013) ldxb     4*([14]&0xf)
(014) ldh      [x + 14]
(015) jeq      #0x1bb           jt 18   jf 16
(016) ldh      [x + 16]
(017) jeq      #0x1bb           jt 18   jf 19
(018) ret      #524288
(019) ret      #0
```

If this looks like Greek to you, BPF is [documented](http://man7.org/linux/man-pages/man8/bpfc.8.html) and has a section dedicated to explaining instructions.

### BPF Instructions, Explained

Putting this in a table:

| Instruction                                      | Meaning                                                                          |
|--------------------------------------------------|----------------------------------------------------------------------------------|
| `(000) ldh      [12]                           ` | Load 2B at 12 (Ethertype)                                                        |
| `(001) jeq      #0x86dd          jt 2    jf 8  ` | Ethertype: If IPv6, goto #2, else #8                                             |
| `(002) ldb      [20]                           ` | Load 1B at 20 (IPv6 Next Header)                                                 |
| `(003) jeq      #0x6             jt 4    jf 19 ` | IPv6 Next Header: If TCP, goto #4, else #19                                      |
| `(004) ldh      [54]                           ` | Load 2B at 54 (TCP Source Port)                                                  |
| `(005) jeq      #0x1bb           jt 18   jf 6  ` | TCP Source Port: If 443, goto #18, else #6                                       |
| `(006) ldh      [56]                           ` | Load 2B at 56 (TCP Dest Port)                                                    |
| `(007) jeq      #0x1bb           jt 18   jf 19 ` | TCP Source Port: If 443, goto #18, else #19                                      |
| `(008) jeq      #0x800           jt 9    jf 19 ` | Ethertype: If IPv4, goto #9, else #19                                            |
| `(009) ldb      [23]                           ` | Load 1B at 23 (IPv4 Protocol)                                                    |
| `(010) jeq      #0x6             jt 11   jf 19 ` | IPv4 Protocol: If TCP, goto #11, #19                                             |
| `(011) ldh      [20]                           ` | Load 2B at 20 (13b Fragment Offset)                                              |
| `(012) jset     #0x1fff          jt 19   jf 13 ` | Use 0x1fff as a mask for fragment offset; If fragment offset != 0, #19, else #13 |
| `(013) ldxb     4*([14]&0xf)                   ` | x = IP header length                                                             |
| `(014) ldh      [x + 14]                       ` | Load 2B at x+14 (TCP Source Port)                                                |
| `(015) jeq      #0x1bb           jt 18   jf 16 ` | TCP Source Port: If 443, goto #18, else #16                                      |
| `(016) ldh      [x + 16]                       ` | Load 2B at x+19 (TCP Dest Port)                                                  |
| `(017) jeq      #0x1bb           jt 18   jf 19 ` | TCP Dest Port: If 443, goto #18, else #19                                        |
| `(018) ret      #524288                        ` | MATCH                                                                            |
| `(019) ret      #0                             ` | NOMATCH                                                                          |

### BPF Diagram

Visualizing this with a flowchart, it may be more apparent what is happening. Given that IPv4 has a variable-length header, figuring out
how long it is takes a couple extra steps (11-13).

<img src="https://dl.dropboxusercontent.com/s/hoz5mm42zj8faff/bpf_tcp_443.svg" alt="Diagram of BPF instructions" style="width:90%">

{{% notice note %}}
IPv6 steps 4-7 and IPv4 steps 14-17 are combined here as they are identical.
{{% /notice %}}

### BPF Hex Adventure

Another way to look at this is through a hexdump.
We can print the hex of one TCP packet from an existing capture:

```bash
bash$ tshark -r existing.pcapng -Y "tcp" -c 1 -x
0000  34 97 f6 b5 5b 30 6c 96 cf d8 7f e7 08 00 45 00   4...[0l.......E.
0010  00 28 9c 64 00 00 40 06 18 13 c0 a8 01 c1 23 ba   .(.d..@.......#.
0020  e0 35 c7 93 01 bb ff 59 1b 42 1b e9 f5 e6 50 10   .5.....Y.B....P.
0030  20 0c d3 b4 00 00
```

This packet is available for [download](https://dl.dropboxusercontent.com/s/dgpt2qqrgt87ob7/https_packet.pcapng) if you want to play around with it.
Based on the data found in this packet, the order of processing should be 0 -> 1 -> 8 -> 9 -> 10 -> 11 -> 13 -> 14 -> 15 -> 16 -> 17 -> 18. Port 433 is 0x1bb in hex.

We can then use the power of MS Paint to follow the BPF code as it loads and skips to various bytes.

<img src="https://dl.dropboxusercontent.com/s/7imisw5o4zb74mc/dumpcap_bpf_instructions.png" alt="Manually navigating BPF hex">

| Steps |  Explanation |
|-------|--------------|
| <b style="color:#FC2A1C;">0,&nbsp;1,&nbsp;8</b> | Ethertype is 0800 => IP |
| <b style="color:#689B3C;">9,&nbsp;10</b> | Protocol is 0x6 => TCP |
| <b style="color:#103FFB;">11,&nbsp;12</b> | If the [Fragment Offset](https://www.trueneutral.eu/2015/wireshark-frags-1.html) was nonzero, higher protocols would be undissectable series of data bytes. tshark can dissect higher protocols.|
| <b style="color:#FD9226;">13</b> | Check how long the IPv4 header should be. 5 increments of 4 bytes = 20 bytes. Start of IP header is at 14, so add 20 to get TCP start at 34.|
|<b style="color:#C4BB27;">14,&nbsp;15</b> | Check whether the source port is 0x1bb. It's not, so check the dest port.|
|<b style="color:#7A2177;">16,&nbsp;17</b> | Dest port is 0x1bb, so return a match.|

## Further Reading

* 2015-01, Jasper Bongertz, [Determining Network Ethertype](https://blog.packet-foo.com/2015/01/determining-network-protocols/)
