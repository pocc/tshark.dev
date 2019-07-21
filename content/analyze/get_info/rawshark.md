---
title: "Rawshark"
description: "Get info from a packet capture"
date: 2019-05-20
author: Ross Jacobs

summary: 'rawshark: Rawshark: [manpage](https://www.wireshark.org/docs/man-pages/rawshark.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsrawshark.html) | [code](https://github.com/wireshark/wireshark/blob/master/rawshark.c)'
weight: 99
draft: true
---

## rawshark

rawshark is a utility that takes an input stream and parses it. It is low-level
and provides options you would expect to see if you were working
with the source code. This is my take on using rawshark:

<img src="https://media2.giphy.com/media/d31vYmpaCrKs9Z6w/giphy.gif" alt="Not Recommended">

### Reasons not to use rawshark

- You MUST specify the [tcpdump link-layer header
  type](https://www.tcpdump.org/linktypes.html) or protocol name before any
  others (and sometimes it isn't clear [which
  one](https://stackoverflow.com/questions/14092321/rawshark-output-format-for-802-11-and-radiotap-headers)
  you should use)
- You MUST send in an input stream because it cannot parse files
- You MUST send in raw packets without the header. rawshark only knows how to
  remove a pcap-type header before processing and errors out on any other
  capture file. 
- If piping to text-processing tools like awk, needless text cruft is added
  pertaining to the c-style struct of the packets. 

### You should use tshark instead

But the reason you should avoid using it because tshark can do everything it can
do, and better. To transition, rawshark's options `-nNrR` are the same as
tshark's, and all of the others can be discarded.

### Rawshark example

This example goes over how to display UDP ports from this 
[dhcp.pcap](https://wiki.wireshark.org/SampleCaptures?action=AttachFile&do=get&target=dhcp.pcap) using rawshark.
Included is the magical journey in getting there.

1. So rawshark will not take tshark raw output...

	```bash
    $ tshark -r dhcp.pcap -w - | rawshark -s -r - -d proto:udp -F udp.port
	
    0 FT_UINT16 BASE_PT_UDP - 
	rawshark: The standard input appears to be damaged or corrupt.
	(Bad packet length: 673213298
	)
	```
	
2. You would think that specifying `proto` of udp for DHCP would work, but it
  shows incorrect output. DHCP uses UDP ports 67 and 68:

    ```bash
	$ cat dhcp.pcap | rawshark -s -r - -d proto:udp -F udp.port
	
	0 FT_UINT16 BASE_PT_UDP - 1 FT_UINT16 BASE_PT_UDP - 
	1 1="65535" 0="65535" -
	2 1="11" 0="33281" -
	3 1="65535" 0="65535" -
	4 1="11" 0="33281" -
	```

3. Finally, by specifying encap type instead of proto, we get useful output.

	```bash
	$ cat dhcp.pcap | rawshark -s -r - -d encap:1 -F udp.port
	
	FT_UINT16 BASE_PT_UDP - 1 FT_UINT16 BASE_PT_UDP - 
	1 1="68" 0="67" -
	2 1="67" 0="68" -
	3 1="68" 0="67" -
	4 1="67" 0="68" -
	```

4. `tshark` is more useful with less work though, even if we pass in as a stream
	(the supposed purpose of `rawshark`:
	
	```bash
	$ cat dhcp.pcap | tshark -r -
	
	1   0.000000      0.0.0.0 → 255.255.255.255 DHCP 314 DHCP Discover - Transaction ID 0x3d1d
    2   0.000295  192.168.0.1 → 192.168.0.10 DHCP 342 DHCP Offer    - Transaction ID 0x3d1d
    3   0.070031      0.0.0.0 → 255.255.255.255 DHCP 314 DHCP Request  - Transaction ID 0x3d1e
    4   0.070345  192.168.0.1 → 192.168.0.10 DHCP 342 DHCP ACK      - Transaction ID 0x3d1e
	```
	
	tshark has the advantage of being able to read files too: `tshark -r dhcp.pcap`.
