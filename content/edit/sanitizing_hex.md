---
title: "Sanitizing Hex"
description: "Put a hex on your hex"
date: 2019-07-04
author: Ross Jacobs

summary: '[tracewrangler](https://www.tracewrangler.com/)'
weight: 99
draft: false
---

Packet captures can contain sensitive data.
When you are describing a network problem, you may need to collect them.
How do you send a capture to a 3rd party when it contains PII or business secrets?

## About

{{% notice warning %}}
When in doubt about a legal matter, consult a lawyer.
{{% /notice %}}

With the advent of GDPR, data security has become more important.
Laws differ between countries (and US states), but generally speaking, network traffic becomes personal data
when it can "uniquely identify an individual". For example, if you own website that uses the client's public IP address as a data point to identify them, then the IP address becomes personal data. Above all, when it comes to sensitive pcaps you should aim to:

* Restrict access
* Filter out irrelevant traffic
* Anonymize them and remove data from packets
* Delete them when done with troubleshooting

## Sanitizing PDU Header Fields

Scenario: You want to scrub IP and MAC addresses. While in the normal course of scrubbing, you would probably want to sanitize more fields, we're keeping it simple for this comparison.

It is possible to manually [edit the hex](/edit/editing_hex/); however, there are a couple reasons you may want to use a program instead:

* If you want to change a field's value from A->B across a file, manual hex editing quickly becomes cumbersome. This is possible with regex and sed, but
* A program is better if you want a flag to change all instances of a field (like MAC address) to another value, consistently
* Field boundaries are not delineated in hex. It's easy to make mistakes when editing hex manually
* Adding/subtracting data in captures requires packet and capture headers to be updated with the correct byte length.
  Depending on how you change your capture, this may render it unreadable or unreadable up until the place you changed it.

### TraceWrangler

[TraceWrangler](https://www.tracewrangler.com/) is a utility written for Windows that can anonymize various fields. It can also
be installed under Macos and Linux using wine.

![](https://www.tracewrangler.com/images/TeaserMain.png)

### tcprewrite

#### Installation

{{% notice warning %}}
tcpreplay is old and only supports pcap files.
{{% /notice %}}

This is part of the [tcpreplay](https://tcpreplay.appneta.com/) suite of tools.
Use your package manager to install it.

```sh
# Ubuntu / Ubuntu WSL on Windows
apt install tcpreplay
# Macos
brew install tcpreplay
```

#### Example

Given a pcap-type capture, this will rewrite IPs and MACs randomly and recompute checksums.
There is a consistent mapping to between old IP and MAC addresses and new random ones.

```sh
tcprewrite -i example.pcap -o example.pcap --seed=42 --enet-mac-seed=42 --fixcsum
```

* `--seed=42`: Randomly change all IP addresses with seed 42
* `--enet-mac-seed=42`: Randomly change all MAC addresses with seed 42
* `--fixcsum`: Fix any checksums

{{% notice warning %}}
In my testing, adding a VLAN creates a file that Wireshark can only read up to layer 3.
<!-- Adding a vlan requires 4 options: tcprewrite <...> --enet-vlan=add --enet-vlan-tag=42 --enet-vlan-pri=0 --enet-vlan-cfi=0 -->
{{% /notice %}}

### Honorable Mentions

* [BitTwiste](http://bittwist.sourceforge.net/): A packet generator and editor limited to pcap-type files. It shares features with both editcap and tcpreplay. Unlike other solutions, it can lop off everything higher than a layer (2-4) for non-IPv6 packets.
* [pcap-sanitizer](https://www.npmjs.com/package/pcap-sanitizer): An NPM module that remaps L2-4 addresses and ports and has both CLI and Javascript interfaces. This solution does not have as much customization available as others do.
* [SafePcap](https://omnipacket.com/safepcap): This is a webpage to which you can upload a pcap and then download the anonymized file. I couldn't test it because I got into a UI loop on their website. They also host WireEdit.

### Summary

Tracewrangler is more fully featured while tcprewrite is faster to get and use. Bittwiste is good for data removal if you have the *exact* type of capture it works with.

## Filtering Out Traffic

Sometimes the simplest solution is best. [Filter the capture](/share/pcap_preparation/#filter-only-for-relevant-traffic) for only the traffic that the 3rd party needs to see. If this removes the sensitive data at the same time, you just hit two birds with one stone.

## Further Reading

* 2018-03, cPacket Networks, [What Impact will GDPR have on your organization?](https://www.cpacket.com/blog/gdpr/)
* 2014-03, Dan Shanahan, [Trace File Sanitization Pt. 1 – TraceWrangler](http://web.archive.org/web/20210122214927/http://www.thevisiblenetwork.com/2014/03/22/trace-file-sanitization-pt-1-tracewrangler/)
* 2010-12, Chris Sanders, [Sanitizing Pcap Files with tcprewrite](https://chrissanders.org/2010/12/sanitizing-pcap-files-for-public-distrubution/)
