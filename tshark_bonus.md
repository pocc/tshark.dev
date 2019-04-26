---
title: "Wireshark Bonus Topics"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Wireshark Bonus Topics"
tags:
  - networking
  - wireshark
  - draft1
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

_Wireshark Bonus Topics_

## <a name=editing-hex></a>Editing Hex

There are a couple ways to edit the hex of a packet capture.  For this scenario,
let's say we want to change all instances of broadcast address 255.255.255.255
in our dhcp.pcap to something else. Let's choose 255.0.255.0 because it's a
funny-looking broadcast address. In hex, this is `0xffffffff` => `0xff00ff00`.

### sed

`sed` gives you the ability to munge filehex. 

`sed -Ei 's/([^\xff])\xff{4}([^\xff])/\1\xff\x00\xff\x00\2/g' dhcp.pcap`

#### Explanation

- `sed -i` : Change in place.
- `sed -E` : Use extended regular expressions
- `\x??` : Hex byte. E.g. `echo -e '\x41'` => `A`, just like an [ASCII
  table](http://www.asciitable.com/) would suggest. Note that a hex byte is 8
  bits and that in `\xff`, each f is 4 bits.  
- `1st [^\xff]` : We know that the 32 bits before this regex will be the
  client's IP address, 0.0.0.0 (0x00000000), and the last byte, 0x00, will match. 
- `2nd [^\xff]` : We know that the 32 bits after this regex are the UDP ports 
  for DHCP, 67 and 68. `[^\xff]` will math the source udp port 68 (00 in 0x0068).
- `\xff{4}`: Given that this packet capture is DHCP, the client
  sends traffic to a MAC address of ffffffffffff. Thus, a
  [regex](https://regexone.com/) of `\xff{4}` will match the dest MAC as well.
  Putting it all together, we get `[^\xff]\xff{4}[^\xff]`. 
- `([^\xff])` Add parentheses (capturing group) to both preceding and trailing
  byte, so they are included in the result
- `\1`, `\2` : We cannot use lookaheand/lookbehind with sed, so use capture
  groups (corresponding to previous) for preceding and trailing bytes

### perl

Exactly like `sed`, except we can use negative lookaheads and lookbehinds:

`perl -pi -e 's/(?<!\xff)\xff{4}(?!\xff)/\xff\x00\xff\x00/g' dhcp.pcap`

### vim & xxd 

If you are using a *nix system (or WSL), [vim](https://www.openvim.com/) and
[xxd](https://linux.die.net/man/1/xxd) are built in and can be used in
conjunction to visually change file bytes. You will need to convert the file
bytes to something readable using `xxd`. `xxd` without options will provide offsets
and spaces between bytes while `xxd -p` will show you just the bytes, both in 16
byte lines. `xxd -r` converts ASCII hex back to the hex literals of your file.
<script id="asciicast-234965" src="https://asciinema.org/a/234965.js" async></script>

### emacs

The joke goes that
"[emacs](https://www.gnu.org/software/emacs/manual/html_node/emacs/Editing-Binary-Files.html)
is a great OS, if only it had a good text editor". Where vim integrates better
with unixy tools like xxd, emacs tries to be your everything.
Case in point: hexl is a builtin that allows for hex literal editing. Open
with `M-x hexl-find-file` and use `C-M-x` to insert hex:
<script id="asciicast-234962" src="https://asciinema.org/a/234962.js" async></script>

### Honorable Mentions

* [hexcurse](https://github.com/arm0th/hexcurse ): curses-based hex editing utility.
* [wxhexeditor](http://www.wxhexeditor.org/): The only cross-platform GUI hex
  editor with native binaries.

## <a name=piping></a>Piping 

Piping is important to using many of these utilities. For example, it is not
really possible to use rawshark without piping as it expects a FIFO or stream. 

| Utility        | stdin formats        | input formats      | stdout formats            | output formats |
|----------------|----------------------|--------------------|---------------------------|----------------|
| **capinfos**   | -                    | *pcaps<sup>1</sup> | report<sup>2</sup>        | -              |
| **dumpcap**    | -                    | -                  | -                         | *pcaps         |
| **editcap**    | -                    | *pcaps             | -                         | *pcaps         |
| **mergecap**   | -                    | *pcaps             | -                         | *pcaps         |
| **randpkt**    | -                    | -                  | -                         | pcap           |
| **rawshark**   | raw pcap<sup>3</sup> | -                  | report                    | -              |
| **reordercap** | -                    | *pcaps             | -                         | pcapng         |
| **text2pcap**  | hexdump<sup>4</sup>  | -                  | -                         | pcap, pcapng   |
| **tshark**     | raw pcap             | *pcaps             | report, raw pcap, hexdump | *pcaps         |

1. __*pcaps__ 
  All pcap types available on the system (use `tshark -F` to list).
2. __report__   
  Tabular or "machine-readable" data about a file.
3. __rawpcap__  
  The raw bytes of the pcap header and packets. Can be generated
  with `cat $file | ...`, read by piping to `... | tshark -r -`, and saved with
  `... > $file`.
4. __hexdump__  
  A formatted hexdump can be canonically generated by `od -Ax -tx1 -v`. As of
  Wireshark v3.0.0, `tshark -r <my.pcap> -x` will
  [usually](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=14639) generate
  this as well. If hexdump is stream, send to text2pcap as
  `<commands>... | text2pcap - <outfile>`.  Otherwise if it's a file, use
  `text2pcap <infile> <outfile>`.

### Using temp files

On bash, it's possible to create temporary files to mimic passing in stdin. In
this example, editcap can only read files, so create a temp file, send filtered
tshark output to it, and then read it from editcap to make further alterations.

```bash
tempfile=$(mktemp)
tshark -r dhcp.pcap -Y "dhcp.type == 1" -w $tempfile 
editcap $tempfile dhcp2.pcap -a 1:"Cool story bro!"
```

