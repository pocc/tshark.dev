---
title: "captype"
description: Get the capture's file type
date: 2019-07-06
author: Ross Jacobs

summary: 'captype [manpage](https://www.wireshark.org/docs/man-pages/captype.html) | [code](https://github.com/wireshark/wireshark/blob/master/captype.c)'
weight: 10
draft: false
---

## Captype

Capytpe reads a file and prints the file type. It has no flags and takes one or more files as argument.

### Captype Example

```bash
$ captype testdir/*
literally_an_empty_file: erf
aliens.png: mime
largeiftrue.pcapng: pcapng
ch36_monitor.pcap: pcapng
webscraper.py: unknown
captype: "topsecret" is a directory (folder), not a file.
```

It's easy to parse this format with awk. `awk -F ': '`, where `$1` is the filename and `$2` is the filetype.
Any errors will put `captype:` in place of the filename.

## When Your Pcap Extension != Filetype

You may have a file that has a `.pcap` extension but is actually a `.pcapng` file.
This can easily happen if you save to a file like `tshark -w example.pcap` without specifying an encoding.
tshark will default to pcapng, so you'll have pcapng data with a pcap extension.
While tshark and friends will read the encoding and not the extension, other programs may not be as forgiving.

### Example: Use Captype to Correct Filetype

It's easy to make this mistake as defaulting to pcap/pcapng [varies by Wireshark utility](/capture/sources/pipe/#piping-with-shark). For example, if we save packets without explicitly setting the capture type using tshark's `-F`, we'll have a pcapng file with a pcap extension.

```bash
$ tshark -c 100 -w example.pcap
Capturing on 'Wi-Fi: en0'
100
$ captype example.pcap
example.pcap: pcapng
```

To automatically fix this problem, you can use this one-liner. If the filetype is different from the extension, the file is moved to the correct extension.

```bash
# If captype doesn't know which filetype a file is, it will classify it as "unknown"
# For any captype or awk error condition, mv's 2nd arg collapses to '' and mv will error.
mv -n $file "$(captype $file | awk -F ': ' '{ if ($2 != "unknown") print "'${file%.*}.'"$2}')"
```

## Further Reading

* Wikipedia: [List of file signatures](https://en.wikipedia.org/wiki/List_of_file_signatures): How to know from the first few bytes "file magic" of a file what its type is.
