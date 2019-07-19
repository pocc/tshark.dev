---
title: "Capture Filters"
description: "Drop uninteresting traffic before you save it"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: '' 
weight: 40
draft: true
---

## Capture vs Display Filters

There are two types of filters: Capture filters and display filters. Capture
filters are more limited and are based on [BPF syntax](https://wiki.wireshark.org/CaptureFilters). Capture filters are
used to decrease the size of captures by filtering out packets before they are
added. By comparison, display filters are more versatile, and can be used to
select for expert infos that can be determined with a multipass analysis. For
example, if you want to see all pings that didn't get a response,
`'tshark -r file.pcap -Y "icmp.resp_not_found"` will do the job.

## Capture Filters

To specify a capture filter, use `tshark -f <filter>`. To specify a display filter,
use -Y <filter>. If you would like to optimize display filtering over 2
passes, you can specify the first with `-R <filter> -2 -Y <2nd filter>`.

There are few circumstances where this relevant, but I can make a contrived
example: Let's say that you want the 5th arp packet in a capture. You could
do this with two passes or by calling tshark twice. Using two passes is faster:

```
bash-5.0$ time tshark -r large.pcapng -R "arp" -2 -Y "frame.number == 5"
    5   5.872787 18:68:cb:ad:97:60 → Broadcast    ARP 60 Who has 192.168.1.64? Tell 192.168.1.141

real  0m2.945s
user  0m2.702s
sys   0m0.447s
bash-5.0$ time tshark -r large.pcapng -Y "arp" -w - | tshark -r - -Y "frame.number == 5"
    5   5.836911 18:68:cb:ad:97:60 → Broadcast    ARP 60 Who has 192.168.1.64? Tell 192.168.1.141

real  0m4.660s
user  0m4.633s
sys   0m0.781s
```
