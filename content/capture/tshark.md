---
title: "tshark"
description: "\"The Big Kahuna\""
date: 2019-08-03
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/tshark.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolstshark.html) | [code](https://github.com/wireshark/wireshark/blob/master/tshark.c)'
weight: 5
draft: false
---

Tshark is the namesake of this website. This is tshark's help page, with links to relevant pages.

<pre class="language-text" data-lang="sh">bash$ tshark --help
TShark (<a href="https://www.wireshark.org">Wireshark</a>) 3.0.3 (v3.0.3-0-g6130b92b0ec6)
Dump and analyze network traffic.
See https://www.wireshark.org for more information.

Usage: tshark [options] ...

Capture interface:
  <a href="/capture/sources">-i &lt;interface&gt;</a>           name or idx of interface (def: first non-loopback)
  <a href="/capture/capture_filters">-f &lt;capture filter&gt;</a>      packet filter in libpcap filter syntax
  <a href="/capture/limit_size">-s &lt;snaplen&gt;</a>             packet snapshot length (def: appropriate maximum)
  -p                       don't capture in promiscuous mode
  -I                       capture in monitor mode, if available
  -B &lt;buffer size&gt;         size of kernel buffer (def: 2MB)
  <a href="/capture/sources/#advanced-choosing-link-layer-type">-y &lt;link type&gt;</a>           link layer type (def: first appropriate)
  --time-stamp-type &lt;type&gt; timestamp method for interface
  <a href="/capture/sources/sample_interfaces/#sample-interface-listings">-D</a>                       print list of interfaces and exit
  <a href="/capture/sources/sample_interfaces/#sample-link-layer-types">-L</a>                       print list of link-layer types of iface and exit
  --list-time-stamp-types  print list of timestamp types for iface and exit

Capture stop conditions:
  <a href="/capture/limit_size">-c &lt;packet count&gt;</a>        stop after n packets (def: infinite)
  <a href="/capture/limit_size">-a &lt;autostop cond.&gt;</a> ...  duration:NUM - stop after NUM seconds
                           filesize:NUM - stop this file after NUM KB
                              files:NUM - stop after NUM files
Capture output:
  <a href="/capture/limit_size">-b &lt;ringbuffer opt.&gt;</a> ... duration:NUM - switch to next file after NUM secs
                           interval:NUM - create time intervals of NUM secs
                           filesize:NUM - switch to next file after NUM KB
                              files:NUM - ringbuffer: replace after NUM files
Input file:
  <a href="/capture/sources">-r &lt;infile|-&gt;</a>            set the filename to read from (or '-' for stdin)

Processing:
  -2                       perform a two-pass analysis
  -M &lt;packet count&gt;        perform session auto reset
  -R &lt;read filter&gt;         packet Read filter in Wireshark display filter syntax
                           (requires -2)
  <a href="/analyze/packet_hunting/packet_hunting">-Y &lt;display filter&gt;</a>      packet displaY filter in Wireshark display filter
                           syntax
  <a href="/packetcraft/add_context/name_resolution">-n</a>                       disable all name resolutions (def: all enabled)
  <a href="/packetcraft/add_context/name_resolution">-N &lt;name resolve flags&gt;</a>  enable specific name resolution(s): "mnNtdv"
  -d &lt;layer_type&gt;==&lt;selector&gt;,&lt;decode_as_protocol&gt; ...
                           "Decode As", see the man page for details
                           Example: tcp.port==8888,http
  <a href="/packetcraft/add_context/name_resolution">-H &lt;hosts file&gt;</a>          read a list of entries from a hosts file, which will
                           then be written to a capture file. (Implies -W n)
  --enable-protocol &lt;proto_name&gt;
                           enable dissection of proto_name
  --disable-protocol &lt;proto_name&gt;
                           disable dissection of proto_name
  --enable-heuristic &lt;short_name&gt;
                           enable dissection of heuristic protocol
  --disable-heuristic &lt;short_name&gt;
                           disable dissection of heuristic protocol
Output:
  <a href="/formats">-w &lt;outfile|-</a>&gt;           write packets to a pcapng-format file named "outfile"
                           (or '-' for stdout)
  <a href="/packetcraft/profiles/#tshark-config-flags">-C &lt;config profile&gt;</a>      start with specified configuration profile
  <a href="/formats">-F &lt;output file type&gt;</a>    set the output file type, default is pcapng
                           an <a href="/capture/sources/sample_interfaces/#sample-capture-file-types">empty "-F" option</a> will list the file types
  -V                       add output of packet tree        (Packet Details)
  -O &lt;protocols&gt;           Only show packet details of these protocols, comma
                           separated
  -P                       print packet summary even when writing to a file
  -S &lt;separator&gt;           the line separator to print between packets
  <a href="/edit/text2pcap">-x</a>                       add output of hex and ASCII dump (Packet Bytes)
  -T pdml|ps|psml|json|jsonraw|ek|tabs|text|fields|?
                           format of text output (def: text)
  -j &lt;protocolfilter&gt;      protocols layers filter if -T ek|pdml|json selected
                           (e.g. "ip ip.flags text", filter does not expand child
                           nodes, unless child is specified also in the filter)
  -J &lt;protocolfilter&gt;      top level protocol filter if -T ek|pdml|json selected
                           (e.g. "http tcp", filter which expands all child nodes)
  -e &lt;field&gt;               field to print if -Tfields selected (e.g. tcp.port,
                           _ws.col.Info)
                           this option can be repeated to print multiple fields
  -E&lt;fieldsoption&gt;=&lt;value&gt; set options for output when -Tfields selected:
     bom=y|n               print a UTF-8 BOM
     header=y|n            switch headers on and off
     separator=/t|/s|&lt;char&gt; select tab, space, printable character as separator
     occurrence=f|l|a      print first, last or all occurrences of each field
     aggregator=,|/s|&lt;char&gt; select comma, space, printable character as
                           aggregator
     quote=d|s|n           select double, single, no quotes for values
  -t a|ad|d|dd|e|r|u|ud|?  output format of time stamps (def: r: rel. to first)
  -u s|hms                 output format of seconds (def: s: seconds)
  -l                       flush standard output after each packet
  -q                       be more quiet on stdout (e.g. when using statistics)
  -Q                       only log true errors to stderr (quieter than -q)
  -g                       enable group read access on the output file(s)
  <a href="/packetcraft/add_context/name_resolution">-W n</a>                     Save extra information in the file, if supported.
                           n = write network address resolution information
  <a href="/packetcraft/lua_scripts">-X &lt;key&gt;:&lt;value&gt;</a>         eXtension options, see the man page for details
  -U tap_name              PDUs export mode, see the man page for details
  -z &lt;statistics&gt;          various statistics, see the man page for details
  --capture-comment &lt;comment&gt;
                           add a capture comment to the newly created
                           output file (only for pcapng)
  <a href="/export">--export-objects &lt;protocol&gt;,&lt;destdir&gt;</a> save exported objects for a protocol to
                           a directory named "destdir"
  <a href="/packetcraft/tshark_colorized">--color</a>                  color output text similarly to the Wireshark GUI,
                           requires a terminal with 24-bit color support
                           Also supplies color attributes to pdml and psml formats
                           (Note that attributes are nonstandard)
  --no-duplicate-keys      If -T json is specified, merge duplicate keys in an object
                           into a single key with as value a json array containing all
                           values
  --elastic-mapping-filter &lt;protocols&gt; If -G elastic-mapping is specified, put only the
                           specified protocols within the mapping file

Miscellaneous:
  <a href="/capture/tshark">-h</a>                       display this help and exit
  -v                       display version info and exit
  <a href="/packetcraft/profiles/#tshark-config-flags">-o &lt;name&gt;:&lt;value&gt;</a> ...    override preference setting
  <a href="/packetcraft/add_context/tshark_decryption/#kerberos">-K &lt;keytab&gt;</a>              keytab file to use for kerberos decryption
  -G [report]              dump one of several available reports and exit
                           default report="fields"</pre>
