---
title: "Extcap"
description: "Build your own interface"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: '[Wireshark Docs](https://www.wireshark.org/docs/wsdg_html_chunked/ChCaptureExtcap.html) | [Code](https://github.com/wireshark/wireshark/tree/master/extcap) | [Example by ntop](https://www.ntop.org/pf_ring/capture-filter-extract-traffic-using-wireshark-and-pf_ring/)'
weight: 40
draft: false
---

The typical way to see packets live in Wireshark is to use some form of piping:

```bash
packet-source | wireshark -k -i -

# -OR-

mkfifo myfifo
packet-source > myfifo &
wireshark -k -i myfifo
```

By comparison, the [extcap interface](https://www.wireshark.org/docs/man-pages/extcap.html) gives you the
ability to present your source of packets as an interface that you can capture
on in *shark. Run `tshark -D` and note that you can capture to any interface
listed (including ones you create).

If you are successful, *shark will add your interface to its list like so:

```bash
bash $ tshark -D
1) eth0 (Your default interface)
.
.
9) MyCap0 (Antiquated Device Remote Capture) 
```

## builtin extcaps

There are several extcap utilities that are bundled with Wireshark.
You may have access to more or fewer depending on your system:

- androiddump
- ciscodump
- randpktdump
- sshdump
- udpdump

In Wireshark, extcap interfaces should be presented as interfaces with a picture
of a gear. In the interface capture list, they will be at the bottom, so you may
need to scroll down. In tshark, you can list which ones are available with
`tshark -D`. Note that `dumpcap -D` will show you the interfaces you have sans
the extcap ones.

## The four randpkts

Sometimes using extcap utilities from the CLI can be unintuitive.
Taking randpktdump as an example, let's figure out how to use it.
`randpktdump --help` provides usage information.

```bash
randpktdump --extcap-interfaces
extcap {version=0.1.0}{help=file:///usr/local/share/wireshark/randpktdump.html}
interface {value=randpkt}{display=Random packet generator}
```

1. `randpkt`
1. `tshark -i randpkt`
1. `randpktdump`
1. `randpkt` + Wireshark GUI

If `randpkt` is an option when you use `tshark -D`, then you can use it as an
extcap interface like so:

    tshark -i randpkt -w extcap_example.pcap

__Or__, click on the "Random packet generator: randpkt" option when you first open
Wireshark. In both cases, you will get a 1000-packet pcap for a random protocol
with a 5000-byte limit (randpkt defaults).

For point of comparison, `randpktdump` has the same functionality as the
Wireshark-builtin `randpkt` command, except with the advantage of leveraging an
extcap interface.

```bash
# These commands both produce 10 dns packets up to 1000 bytes long.
randpkt -b 1000 -c 10 -t dns /tmp/randpkt.pcap
randpktdump --extcap-interface=randpkt --maxbytes=1000 --count=10 --type=dns \
  --fifo=/tmp/randpkt2.pcap --capture
```

## Building your own extcap utility

The major impetus for extcap is to make YOUR nontraditional packet source
easier to work with. Note that many Wireshark core developers work for
Device Manufacturers or ISPs where automating captures from nontraditional
interfaces is important.

Documentation on
[extcap](https://www.wireshark.org/docs/wsdg_html_chunked/ChCaptureExtcap.html),
utilities is a good resource for interface creation. If you want to build your
own, these options are required for the capture to function:

- --capture
- --extcap-capture-filter
- --fifo

If you are trying to figure out where to start with your extcap project,
Wireshark provides an
[`extcap_example.py`](https://github.com/wireshark/wireshark/blob/master/doc/extcap_example.py),
written by Robert Knall, which is worth looking at. Below is a demonstration of
how to use this example utility.
<script id="asciicast-nt1WaIPrYEyrO1uxmnlnBbpvX" src="https://asciinema.org/a/nt1WaIPrYEyrO1uxmnlnBbpvX.js" async></script>

## Extcap preferences

You can specify these in tshark inline with `-o $key:$value` or change them manually in the [preferences file](/packetcraft/arcana/profiles/).
You can get a list of you current extcap interfaces like so:

```bash
bash$ tshark -G currentprefs | grep "[_#]extcap"
#extcap.gui_save_on_start: TRUE
#extcap.ciscodump.remotehost: 
#extcap.ciscodump.remoteport: 22
#extcap.ciscodump.remoteusername: rj
#extcap.ciscodump.sshkey: 
#extcap.ciscodump.remoteinterface: 
#extcap.ciscodump.remotefilter: deny tcp any eq 22 host fe80::25a3:e7a0:5ec4:50d7, deny tcp any eq 22 host 10.0.2.15, permit ip any any
#extcap.ciscodump.remotecount: 
#extcap.ciscodump.debug: false
#extcap.ciscodump.debugfile: 
#extcap.randpkt.maxbytes: 5000
#extcap.randpkt.count: 1000
#extcap.randpkt.randomtype: false
#extcap.randpkt.allrandom: false
#extcap.randpkt.type: 
#extcap.randpkt.debug: false
#extcap.randpkt.debugfile: 
#extcap.sshdump.remotehost: 
#extcap.sshdump.remoteport: 22
#extcap.sshdump.remoteusername: rj
#extcap.sshdump.sshkey: 
#extcap.sshdump.remoteinterface: eth0
#extcap.sshdump.remotecapturecommand: 
#extcap.sshdump.remotesudo: 
#extcap.sshdump.remotenoprom: 
#extcap.sshdump.remotefilter: not ((host fe80::25a3:e7a0:5ec4:50d7 or host 10.0.2.15) and port 22)
#extcap.sshdump.remotecount: 0
#extcap.sshdump.debug: false
#extcap.sshdump.debugfile: 
#extcap.udpdump.port: 5555
#extcap.udpdump.payload: data
#extcap.udpdump.debug: false
#extcap.udpdump.debugfile: 
```

## Further Reading

- 2017-04-04, ntop, [Creating the ntopdump extcap](https://www.ntop.org/pf_ring/capture-filter-extract-traffic-using-wireshark-and-pf_ring/)
