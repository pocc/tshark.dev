---
title: "Wireshark Info"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Get info about a packet capture"
tags:
  - networking
  - wireshark
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

# <a name="info"></a>Info

_Read a packet capture and print data about it._

## <a name="capinfos"></a>capinfos

capinfos gets metadata about a packet capture. You can be very granular about
what pieces of data you want displayed and the output format. 
<script id="asciicast-235423" src="https://asciinema.org/a/235423.js" async></script>

### General Usage
To see infos a list, use `capinfos <file>`, as list is the default.
To see infos as a table, use `capinfos -T <file>`. Note that the tabular format
skips presentation of interface info. These tabular options can
help with parsing in a scripting language:

### Recommendations

`capinfos` offers 22 options `-acdDeEFHiIkKlnosStuxyz` to print specific
elements. My perspective is that it is better to use a scripting language to
convert all of the infos (no options) into a reusable format.  It's fairly straightforward to
parse `capinfos <file>` into a hashtable in your $language. For an example in
Python, check out get_capinfos() in my [wsutils
gist](https://gist.github.com/pocc/2c89dd92d6a64abca3db2a29a11f1404).

## <a name=rawshark></a>rawshark

rawshark is a utility that takes an input stream and parses it. It is low-level
and provides options you would expect to see if you were working
with the source code. 

<div>
<img src="https://media2.giphy.com/media/d31vYmpaCrKs9Z6w/giphy.gif" alt="Not Recommended"><i>&nbsp;&nbsp;What using rawshark feels like</i></img>
<p></p></div>

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

### If you must... (skip to [next section](#edit))

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
	
	[Next](/post/wireshark-generation.md)
	
