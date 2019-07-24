---
title: "Capinfos"
description: "Get info from a packet capture"
date: 2019-05-20
author: Ross Jacobs

summary: 'Capinfos: [manpage](https://www.wireshark.org/docs/man-pages/capinfos.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolscapinfos.html) | [code](https://github.com/wireshark/wireshark/blob/master/capinfos.c)'
weight: 99
draft: false
---

## capinfos

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
parse `capinfos <file>` into a hashtable in your $language.

Feel free to use parsers I have in 2 languages:

* [Python](https://gist.github.com/pocc/2c89dd92d6a64abca3db2a29a11f1404): See `get_capinfos()`
* [Go](https://github.com/pocc/hubcap/blob/master/pcap/if_capinfos.go): See `GetCapinfos()`
