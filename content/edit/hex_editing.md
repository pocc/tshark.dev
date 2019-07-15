---
title: "Editing Hex"
description: "Put a hex on your hex"
date: 2019-07-04
author: Ross Jacobs

summary: '[xxd](https://linux.die.net/man/1/xxd) | [hexdump](http://man7.org/linux/man-pages/man1/hexdump.1.html)'
weight: 80
draft: false
---

## Overview

There are many ways to edit the hex of a packet capture. Whether you want to script it
or edit it by hand depends on how many occurrences need to be changed. If you are trying
to figure out which hex to edit, you might find it with a [regex with tshark](/analyze/packet_hunting#matches).

For this scenario,
let's say we want to change all instances of broadcast address 255.255.255.255
in our dhcp.pcap to something else, using CLI tools. Let's choose 255.0.255.0 because it's a
funny-looking broadcast address. In hex, this is `0xffffffff` => `0xff00ff00`.
Visually, this looks like:

### Before Hex Edit

![](https://dl.dropboxusercontent.com/s/zpmk8vl3cer0o7x/hexedit_before.png)

### After Hex Edit (All Solutions)

![](https://dl.dropboxusercontent.com/s/wticze3apr1l5ln/hexedit_after.png)

## Scripted Solutions

The solutions below in [sed](#sed), [perl](#perl), and [python](#python) change a file in-place without manually looking at a hex file.

### sed

`sed` gives you the ability to munge filehex.

```bash
sed -Ei 's/([^\xff])\xff{4}([^\xff])/\1\xff\x00\xff\x00\2/g' dhcp.pcap
```

{{% notice warning %}}
The Macos version of sed is based on BSD and uses different flags. To get GNU sed, install it with `brew install gnu-sed` or [get all GNU utils](https://apple.stackexchange.com/questions/69223/how-to-replace-mac-os-x-utilities-with-gnu-core-utilities).
{{% /notice %}}

This looks like someone mashed a keyboard, but there is both rhyme and reason here.

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

```bash
perl -pi -e 's/(?<!\xff)\xff{4}(?!\xff)/\xff\x00\xff\x00/g' dhcp.pcap
```

### python

This can also be a one-liner with `python -c`, but is much cleaner as a script called with `python replace_bytes.py`.
In this example, we read the bytes from a file, change them, and then write them
back to the original file. The regex logic is the same as the sed example.
Note that capture groups 1 and 2 need to be escaped 4 times: Twice for being a
capture group and twice for being a part of a bytes object.

``` python
# replace_bytes.py
import re

f = open('dhcp.pcap', 'rb')
pkt_bytes = f.read()
f.close()

pkt_bytes = re.sub(b'([^\xff])(\xff){4}([^\xff])',
                   b'\\\\1\xff\x00\xff\x00\\\\2',
                   pkt_bytes)

f = open('dhcp.pcap', 'wb')
f.write(pkt_bytes)
f.close()
```

## Manual Solutions

Manually changing the bytes in a hex file and saving is more appropriate where there are only 1 or 2 changes that need to.

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

### hexed.it

[Hexed.it](https://hexed.it) is a website that enables you to edit the hex of any file for free.
In this example, search for 00ffffffff00, change bytes 2 and 4 at both locations,
and then save the file.

{{% notice note %}}
regex is not available in hex search.
{{% /notice %}}

![](https://dl.dropboxusercontent.com/s/nnkbsbvyhdzhhp1/hexed.it_sample.png)

### Honorable Mentions

- [hexcurse](https://github.com/arm0th/hexcurse ): curses-based hex editing utility.
- [wxhexeditor](http://www.wxhexeditor.org/): The only cross-platform GUI hex
  editor with native binaries.

## Links

- [pcapfix](https://f00l.de/pcapfix/): A utility to fix problems with pcap files.
