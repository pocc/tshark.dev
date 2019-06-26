---
title: "Scripted Packet Generation"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
description: "Generate packets with your programming language."
---

When talking about packet generation, it is important to distinguish between
low and high-level networking libraries. Every serious language has a library
to interact with sockets directly. Shown here are libraries that provide an
interface for scripting with protocol primitives like
`IP`, `TCP`, and `HTTP`.

_Each example will send a ping, the packet crafting equivalent of "Hello World!"._

## Crafting libraries

Interpreted languagess like Python and Ruby can be convenient because packet generation can be interactive.

### Bash: various

If an easy shell solution exists, KISS.
Generate traffic with netcat, ping, hping, etc and save with tshark.

```bash
function save_ping() {
    tshark -w ping.pcap -f "host 8.8.8.8" & tspid=$!
    sleep 0.5 # Wait for tshark to warm up
    ping 8.8.8.8 -c 1 && kill $tspid
}
save_ping
```

### Python: scapy

To install, `pip install scapy`.

```python
# send_ping.py
from scapy.all import *
ans, unans = sr(IP(dst="8.8.8.8")/ICMP()/"Scapy is easy!")
# Write the ping and its reply to a file
wrpcap("ping.pcap",ans+unans)
```

Run with `python send_ping.py`. Sending traffic with scapy is extremely easy!

{{% notice note %}}
If you do not send data with a ping, Scapy won't compute checksums and Wireshark will complain.
{{% /notice %}}

#### Scapy Resources

* [Art of Packet Crafting with Scapy](https://0xbharath.github.io/art-of-packet-crafting-with-scapy/)

### Ruby: PacketFu

{{% notice warning %}}
PacketFu does not have mindshare and you have to build the documentation.
If ruby is not a hard requirement, life will be easier with a different library.
{{% /notice %}}

Install [PacketFu](https://github.com/packetfu/packetfu) with `gem install packetfu`.

This script will send the ping to the wire.

```ruby
# send_ping.rb
require 'packetfu'

# Using :config prepoulates eth_src, eth_dst, and ip_src with system values.
icmp_pkt = PacketFu::ICMPPacket.new(:config => PacketFu::Utils.whoami?)
icmp_pkt.icmp_type = 8
icmp_pkt.icmp_code = 0
icmp_pkt.payload = "PacketFu is easy!"
icmp_pkt.ip_daddr="8.8.8.8"
icmp_pkt.recalc

icmp_pkt.to_w
# Write the generated ping to a file
icmp_pkt.to_f("ping.pcap")
```

Run with `sudo ruby send_ping.rb`. Sudo is required here to capture.

### go: gopacket

[gopacket](https://github.com/google/gopacket) is the golang library to send packets onto the wire, maintained by Google.

TODO: Create ping example

#### Further Reading

* [Packet Inject and Analysis](https://www.devdungeon.com/content/packet-capture-injection-and-analysis-gopacket) by DevDungeon

### c/c++

TODO: All the libraries!
TODO: Examples

### java: pcap4j

[pcap4j](https://github.com/kaitoy/pcap4j) is the library for choice for packet crafting in Java.
To get started, I would start with [DevDungeon article](https://www.devdungeon.com/content/packet-capturing-java-pcap4j)
and also look at
[Official examples](https://github.com/kaitoy/pcap4j/tree/v1/pcap4j-sample/src/main/java/org/pcap4j/sample).

TODO: Create todo example.
