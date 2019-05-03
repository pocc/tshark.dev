---
title: "Filter Traffic"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs
desc: "Like building a regex but more fun!"
tags:
  - networking
  - tshark
weight: 40

draft: true
---

There are two types of filters: Capture filters and display filters. Capture
filters are more limited and are based on [eBPF syntax](). Capture filters are
used to decrease the size of captures by filtering out packets before they are
added. By comparison, display filters are more versatile, and can be used to
select for expert infos that can be determined with a multipass analysis. For
example, if you want to see all pings that didn't get a response,
`'tshark -r file.pcap -Y "icmp.resp_not_found"` will do the job.

To specify a capture filter, use -f <filter>. To specify a display filter,
use -Y <filter>. If you would like to optimize display filtering over 2
passes, you can spceify the first with `-R <filter> -2 -Y <2nd filter>`.

