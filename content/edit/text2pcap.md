---
title: "text2pcap"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
description: "Convert hexdumps to packet captures"
summary: '<i class="fas fa-external-link-square-alt"></i> [manpage](https://www.wireshark.org/docs/man-pages/text2pcap.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolstext2pcap.html) | [code](https://github.com/wireshark/wireshark/blob/master/text2pcap.c)'
weight: 40
---

## Quick Tips

When in doubt, use text2pcap's `-dd` option and analysis of the preamble and of every byte will be provided.

* [<i class="fab fa-stack-overflow"></i>Got a hexdump from tcpdump but want a pcap instead?](https://stackoverflow.com/questions/3900431/python-convert-tcpdump-into-text2pcap-readable-format) Use `tcpdump -w`.
* [<i class="fab fa-stack-overflow"></i>Does your hexdump have groups of 4 hex digits instead of 2?](https://stackoverflow.com/questions/47991651/how-to-convert-hex-dump-from-4-hex-digit-groups-to-2-hex-digit-groups) This is the default for fortigate hexdumps.
* Want to convert a stream of just hex? Use `echo $hexstring | xxd -r -p | od -Ax -tx1 > file.pcap`.

## Examples

### Example 1: Create packets from scratch with text2pcap dummy headers

Let's create two messages to put into two packets: `I am a 27 byte TCP payload!` and `I am a longer 34 byte TCP payload!`.
For this to be valid text2pcap input, it needs to be converted to space-delimited hex that looks like this:

```bash
$ printf "I am a 27 byte TCP payload!" | xxd -g 1
00000000: 49 20 61 6d 20 61 20 32 37 20 62 79 74 65 20 54  I am a 27 byte T
00000010: 43 50 20 70 61 79 6c 6f 61 64 21                 CP payload!
```

`xxd -g 1`, `hexdump -C`, and `od -Ax -tx1 -v` produce valid this kind of input. There are two are other variables besides
packet bytes that we can add: Packet direction and timestamp. Direction is specified at the beginning of a packet by I (input) or O (output).
Timestamp is specified by strftime. While later on, we could specify any timestamp type (like %s for unixtime in seconds).

```bash
# -g adds a space every 1 byte, which text2pcap requires
$ printf "I2019-01-01 00:00:00\n" > payload.txt
$ printf "I am a 27 byte TCP payload!" | xxd -g 1 >> payload.txt
$ printf "O2019-01-02 10:17:36\n" >> payload.txt
$ printf "I am a longer 34 byte TCP payload!" | xxd -g 1 >> payload.txt
$ cat payload.txt
I2019-01-01 00:00:00.000000
00000000: 49 20 61 6d 20 61 20 32 37 20 62 79 74 65 20 54  I am a 27 byte T
00000010: 43 50 20 70 61 79 6c 6f 61 64 21                 CP payload!
O2019-01-01 00:02:03.456789
00000000: 49 20 61 6d 20 61 20 6c 6f 6e 67 65 72 20 33 34  I am a longer 34
00000010: 20 62 79 74 65 20 54 43 50 20 70 61 79 6c 6f 61   byte TCP payloa
00000020: 64 21
```

We can then take this and add specify dummy data.
-4 is for IP addresses, -T for TCP ports.
%F and %T are from the [date](https://ss64.com/bash/date.html) command. %F => YYYY-MM-DD, %T => HH:MM:SS
Note the '.' after %T. This tells text2pcap to read fractional seconds.

```bash
$ text2pcap -4 10.0.0.1,9.9.9.9 -T 12345,80 -t "%F %T." payload.txt hello.pcap
Input from: hello.txt
Output to: hello.pcap
Output format: pcap
Generate dummy Ethernet header: Protocol: 0x800
Generate dummy IP header: Protocol: 6
Generate dummy TCP header: Source port: 12345. Dest port: 80
Wrote packet of 66 bytes.
Read 1 potential packet, wrote 1 packet (106 bytes).
```

We can then double check that it wrote correctly:
While this could be a one liner, it's extended into a for loop so that each line of output is on its own line

```bash
tshark -r hello.pcap
    1 0.000000000     10.0.0.1 → 9.9.9.9      TCP 81 12345 → 80 [ACK] Seq=1 Ack=1 Win=8192 Len=27 [TCP segment of a reassembled PDU]
    2 123.456789000      9.9.9.9 → 10.0.0.1     TCP 88 80 → 12345 [ACK] Seq=1 Ack=28 Win=8192 Len=34 [TCP segment of a reassembled PDU]
$ for i in $(tshark -r hello.pcap -T fields -e tcp.payload); do
>   printf $i | xxd -r -p
>   printf "\n"
> done
I am a 27 byte TCP payload!
I am a longer 34 byte TCP payload!
```

### Example 2: Using -o with a base 10 offset

The packets of the Example 1 with base10 offset looks like this:

```bash
I2019-01-01 00:00:00.000000
00000000: 49 20 61 6d 20 61 20 32 37 20 62 79 74 65 20 54  I am a 27 byte T
00000016: 43 50 20 70 61 79 6c 6f 61 64 21                 CP payload!
O2019-01-01 00:02:03.456789
00000000: 49 20 61 6d 20 61 20 6c 6f 6e 67 65 72 20 33 34  I am a longer 34
00000016: 20 62 79 74 65 20 54 43 50 20 70 61 79 6c 6f 61   byte TCP payloa
00000032: 64 21
```

Add `-o dec` to the text2pcap command and the output pcap will be the same.

In this example, we'll be changing the radix with -o to see what that looks like.

### Example 3: Use text2pcap to read in any data type

Wireshark has a [good article](https://wiki.wireshark.org/HowToDissectAnything) on creating a user-defined DLT for an HTTP response.
Related [<i class="fab fa-stack-overflow"></i> question](https://stackoverflow.com/questions/4502226/how-do-i-get-wireshark-to-read-header-less-pcap-files-without-a-udp-ip-ethernet/4506300#4506300).

## Resources

### Similar Articles

There are a couple articles out there that describe how to use text2pcap. It is worth mentioning that text2pcap is very picky about
the input formatting, so you should try to format your hexdump using linuxfu to match expected input. The Huawai article below has
a list of required formatting.

| Date | Article | Author |
| ---- | ------- | ------ |
|2018-04-30 | [Hexdump -> pcap guide](https://support.huawei.com/enterprise/en/knowledge/EKB1001542804) | Huawei|
|2012-07-24 | [Create pcap from Juniper hexdump](https://kb.juniper.net/InfoCenter/index?page=content&id=KB23952&pmv=print) | Juniper|
|2009-06-02 | [Deciphering packets challenge](https://ismellpackets.com/category/text2pcap/) | Chris Christianson|

### Similar Tools

* [packet dump decode](https://github.com/pstavirs/pdd): C++/Qt4 utility to decode hexdumps. Note that it was last updated 10 years ago and Qt4 is somewhat deprecated.
