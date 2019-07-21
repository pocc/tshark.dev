---
title: "Name Resoultion"
description: "Resolve to Analyze"
date: 2019-07-19
author: Ross Jacobs

summary: '[docs](https://www.wireshark.org/docs/wsug_html_chunked/ChAdvNameResolutionSection.html)'
weight: 50
draft: false
---

Name resolution allows you to see more information about various PDU fields.
Wireshark is intelligent and uses ARP and DNS lookups in the capture to clarify details.

{{% notice info %}}
The `-n` option of both tcpdump and tshark disable lookups to add info to text output.
Using `-n` will not change the resulting pcap file.
{{% /notice %}}

## MAC

-N  m => mac

## VLAN

  v => vlan

## Port

-N  t => port

## DNS

  N => dns

-Wn implies this.

-Wn saves info to a file
-H Use hosts file as source, implies -Wn.

### Name resolution

## Further Reading

* [Generating VLANs file](https://osqa-ask.wireshark.org/questions/63009/generate-vlans-file)
* Ask Wireshark: [Can I save manual address resolutions?](https://osqa-ask.wireshark.org/questions/9173/can-i-save-manual-address-resolutions)
