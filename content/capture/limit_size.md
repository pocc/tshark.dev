---
title: "Limit Size"
description: "Limit the capture size before starting it"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: 'Packetlife: [Long Captures](https://packetlife.net/blog/2011/mar/9/long-term-traffic-capture-wireshark/)'
weight: 90
draft: false
---

Saving space is as simple as learning your `-abcs`!

## Running Out of Space

{{% notice tip %}}
You should use these options only after optimizing your [capture filter](/capture/capture_filters) to drop unimportant packets.
{{% /notice %}}

When capturing, \*shark will save packets to a file. If you specify a file to save to with `-w`, then it will be that one. Otherwise, a temporary file is created and [located somewhere](#finding-the-generated-temporary-file).

If you are taking a long continuous capture, then space will eventually become a
concern for this capture file. There are four ways to limit the size of your capture.

Each option is linked to the appropriate section on tshark's manpage:

* [-a condition:NUM](https://www.wireshark.org/docs/man-pages/tshark.html#a-capture-autostop-condition): Stop capture after `duration:NUM` (seconds), `files:NUM`, `filesize:NUM` (kB), or `packets:NUM`. `files` condition requires `-w`.
* [-b condition:NUM](https://www.wireshark.org/docs/man-pages/tshark.html#b-capture-ring-buffer-option): Rotate to a new file after `duration:NUM` (seconds), `interval:NUM` (seconds), `files:NUM`, `filesize:NUM` (kB), or `packets:NUM`. Requires `-w`.
* [-c NUM](https://www.wireshark.org/docs/man-pages/tshark.html#c-capture-packet-count): Stop of after N packets. `-c NUM` <=> `-a duration:NUM`.
* [-s NUM](https://www.wireshark.org/docs/man-pages/tshark.html#s-capture-snaplen): Chop each packet at NUM bytes (SnapLen). 0 is read as the max, 262144. If used before `-i`, can be per interface.

For `-a` and `-b`, the colon is required as part of the condition. Multiple `-a` and `-b` options can be present.

### Example: Using a Ringbuffer and Autostop Condition

Go big or go home! In this example, we're using all of the `-a` and `-b` options that don't intrefere with each other.
Parsing this long statement, this capture will stop after 100s OR after 10 files are created with a `-b` option OR after the total capture size is > 10MB OR after capturing 10000 packets. This capture rotates after 100s, overwrites 1st after writing to 1000th file, 1024KB, or after writing 20 packets.

In this example, I used a speedtest website to generate a bunch of fake traffic.

We're using the unix utility `time` in order to see whether the duration stop condition was hit.

```
bash-5.0$ time dumpcap -a duration:100 \
                       -a files:10 \
                       -a filesize:10000 \
                       -a packets:10000 \
                       -b duration:100 \
                       -b files:1000 \
                       -b filesize:1024 \
                       -b packets:20 \
                       -w file.pcap \
Capturing on 'Wi-Fi: en0'
File: file_00001_20190806045012.pcap
Packets: 19 File: file_00002_20190806045015.pcap
Packets: 36 File: file_00003_20190806045016.pcap
Packets: 48 File: file_00004_20190806045019.pcap
Packets: 48 File: file_00005_20190806045019.pcap
Packets: 91 File: file_00006_20190806045020.pcap
Packets: 117 File: file_00007_20190806045022.pcap
Packets: 139 File: file_00008_20190806045025.pcap
Packets: 151 File: file_00009_20190806045026.pcap
Packets: 168 File: file_00010_20190806045027.pcap
Packets captured: 200
Packets received/dropped on interface 'Wi-Fi: en0':
 ↪ 200/3 (pcap:0/dumpcap:0/flushed:3/ps_ifdrop:0) (98.5%)

real	0m15.384s
user	0m0.030s
sys	0m0.057s
```

As we can see, the autostop condition we hit was not time, but number of files.
We can verify this by listing the 10 files in this directory.

```bash
bash-5.0$ ls
file_00001_20190806045012.pcap	file_00006_20190806045020.pcap
file_00002_20190806045015.pcap	file_00007_20190806045022.pcap
file_00003_20190806045016.pcap	file_00008_20190806045025.pcap
file_00004_20190806045019.pcap	file_00009_20190806045026.pcap
file_00005_20190806045019.pcap	file_00010_20190806045027.pcap
```

The last file should have completely filled up to max 20 packets, triggering capture stop.
And we see exactly that.

```bash
bash-5.0$ tshark -r file_00010_20190806045027.pcap | wc -l
20
```

### Example: Using a Snaplen

Also known as Packet Slicing, taking a snaplen saves space by chopping off excess bytes. Let's say that we want to capture only up to the end of the UDP header in IPv6 packets in an ethernet network with no vlans. Because we can use a capture filter for ipv6 and udp, we will (-f "ip6 and udp").

* Ether header: 14B
* IPv6 header: 40B
* UDP header: 8B

14B + 40B + 8B = 62B

Snaplen of 62B -> `-s 62`. To verify that we're chopping at the right length, let's print all values in the UDP header (ports, length, and checksum) as well.
Our final command would look something like this:

```bash
bash$  tshark -f 'ip6 and udp' -s 62 -c 1 -w ipv6_udp.pcapng -x -T fields \
              -e udp.port -e udp.length -e udp.checksum
Capturing on 'Wi-Fi: en0'
47579,10001	156	0x0000e5cb
1 packet captured
```

The ports, length, and checksum were all printed so we got all of the UDP fields we care about.

Eyeballing it, this looks like a very respectable 62 bytes.

```bash
bash-5.0$ tshark -r ipv6_udp.pcapng -x
0000  33 33 00 00 00 01 f0 9f c2 33 28 e3 86 dd 60 00   33.......3(...`.
0010  00 00 00 9c 11 01 fe 80 00 00 00 00 00 00 f2 9f   ................
0020  c2 ff fe 33 28 e3 ff 02 00 00 00 00 00 00 00 00   ...3(...........
0030  00 00 00 00 00 01 b9 db 27 11 00 9c e5 cb         ........'.....
```

Given that we have the UDP length, we can also verify that we captured exactly 8 bytes of UDP header. The UDP length includes 8B for header, so UDP payload is 156-8=148. The total packet length should thus with snaplen 62+148 = 210. The filter for the length at capture is "frame.len" whereas "frame.cap_len" should document the captured length.

```bash
tshark -r ipv6_udp.pcapng -T fields -e frame.len -e frame.cap_len
210	62
```

Sure enough, we see the expected values. Note that if a snaplen is not used in a capture, `frame.len` will equal `frame.cap_len`. [Packet](https://dl.dropboxusercontent.com/s/8d2dfcbgxtozlq9/ipv6_udp_snaplen.pcapng) used in example.

## Running Out of Memory

There are a couple of dumpcap (not tshark) flags that can be used to limit resource usage.

* <u>**-N NUM**</u>: Max number of packets buffered within dumpcap
* <u>**-C NUM**</u>: Max number of bytes used for buffering packets within dumpcap
* <u>**-t**</u>: use a separate thread per interface

For both tshark, dumpcap, and tcpdump, you can limit DNS lookups that are automatically performed to add context to text output.

* <u>**-n**</u>: Disable all name resolutions

## Running Out of Time

<a href="https://xkcd.com/716/"><img src="https://dl.dropboxusercontent.com/s/q2m2y80cf3pdtp5/time_for_tshark.jpg" alt="Time for tshark"></a>

Tshark can limit the capture's size before it started. `--time-travel` will start working whenever it will have been implemented.
In the meantime, start your capture with the correct flags.

## Further Reading

* Packetlife, [Long Captures](https://packetlife.net/blog/2011/mar/9/long-term-traffic-capture-wireshark/)
* GE, [How to use Wireshark for long duration captures](https://digitalsupport.ge.com/communities/en_US/Article/How-to-use-Wireshark-for-long-duration-captures)
* Noah Davids, [How can I capture the packet headers but not the data?](http://noahdavids.org/self_published/Tracing_packets_without_collecting_data.html): Finding snaplen numbers for capturing IPv4 and IPv6 headers.
