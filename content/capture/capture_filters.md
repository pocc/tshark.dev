---
title: "Capture Filters"
description: "Drop uninteresting traffic like a hot potato"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: 'Wireshark [Wiki](https://wiki.wireshark.org/CaptureFilters) | [User Guide](https://www.wireshark.org/docs/wsug_html_chunked/ChCapCaptureFilterSection.html) | [pcap-filter manpage](https://www.tcpdump.org/manpages/pcap-filter.7.html)'
weight: 40
draft: false
---

## Capture Filters

Capture filters are used to decrease the size of captures by filtering out packets before they are added. Capture filters are based on [BPF syntax](http://biot.com/capstats/bpf.html), which [tcpdump](https://www.wireshark.org/docs/wsug_html_chunked/AppToolstcpdump.html) also uses. As libpcap parses this syntax, many networking programs can take this syntax.

To specify a capture filter, use `tshark -f "{filter}"`. For example, to capture pings or tcp traffic on port 80, use `icmp or tcp port 80`.

<img src="https://dl.dropboxusercontent.com/s/fkki87x7rkuazr0/tshark_capture_filter.cmp.png" alt="Example Capture Filter" style="width:90%;">

To see how your capture filter is parsed, use [dumpcap](/capture/dumpcap). Below is how `ip` is parsed.

<a href="/capture/dumpcap/#example-dumpcap-d"><img src="https://dl.dropboxusercontent.com/s/hgdf29eq9kd9uvl/dumpcap_d_example.cmp.png" alt="Dumpcap adventure" style="width:40%"></a>

## Capture vs Display Filters

Wireshark uses two types of filters: Capture Filters and [Display Filters](/analyze/packet_hunting/packet_hunting). By comparison, display filters are more versatile, and can be used to
select for expert infos that can be determined with a multipass analysis. For
example, if you want to see all pings that didn't get a response,
`'tshark -r file.pcap -Y "icmp.resp_not_found"` will do the job.
Capture filters cannot be this intelligent because their keep/drop decision is based on a single pass.

Capture filters operate on raw packet bytes with no [capture format](/formats) bytes getting in the way.
You cannot use them on an existing file or when reading from stdin for this reason.

## Further Reading

* [Packetlife Cheatsheet](https://packetlife.net/blog/2008/oct/18/cheat-sheets-tcpdump-and-wireshark/)
* [Display/Capture Filters for 50.X.X.152](https://ask.wireshark.org/question/5647/how-to-filter-for-partial-ip-such-as-50xxxxxx152/)
* [Perhaps a top 15 Wireshark Capture Filter List](https://www.cellstream.com/reference-reading/tipsandtricks/379-top-10-wireshark-filters-2)
