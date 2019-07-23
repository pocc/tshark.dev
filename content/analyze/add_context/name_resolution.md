---
title: "Name Resoultion"
description: "Resolve to Analyze"
date: 2019-07-19
author: Ross Jacobs

summary: '[docs](https://www.wireshark.org/docs/wsug_html_chunked/ChAdvNameResolutionSection.html)'
weight: 50
draft: false
---

{{% notice note %}}
Draft in progress. More content will be added here.
{{% /notice %}}

Name resolution allows you to see more information about various PDU fields.
Wireshark is intelligent and uses ARP and DNS lookups in the capture to clarify details.

{{% notice info %}}
The `-n` option of both tcpdump and tshark disable lookups to add info to text output.
Using `-n` will not change the resulting pcap file.
{{% /notice %}}

## MAC

-N  m => mac

## VLAN

## Port

-N  t => port

## DNS

  N => dns

-Wn implies this.

-Wn saves info to a file
-H Use hosts file as source, implies -Wn.

### Using a hosts file

You can use any file formatted like a [hosts file](http://man7.org/linux/man-pages/man5/hosts.5.html), which looks like this:

```sh
# IPv4
# IP            Name1               Name2  ...
127.0.0.1       localhost
192.168.1.10    foo.mydomain.org    foo
8.8.8.8         dns.google.com      gdns

# IPv6
::1             localhost
ff02::1         ip6-allnodes
ff02::2         ip6-allrouters
```

Essentially it's an IP address followed by whitespace-delimited names.

{{% notice warning %}}
You should take care when manually editing your hosts file.
It is easy to make a change, forget about it, and then have a "mystery" network problem 6 months later.
{{% /notice %}}

#### hosts example

Let's say that you manage IT for a small business and you want to see
__who__ sent what traffic instead of IP address.
If we use this hosts fil:

```hosts
10.0.0.2    Michael_Scott   _ms
10.0.0.3    Dwight_Schrute  _ds
10.0.0.4    Jim_Halpert     _jh
10.0.0.5    Pam_Beesly      _pb

tshark -Y

rj@vmbuntu:/tmp$ sudo tshark -Y icmp -H hosts -Nn
Running as user "root" and group "root". This could be dangerous.
Capturing on 'enp0s3'
    1 0.000000000 🥖VIVE_LA_FRANCE🥖 → LONG_LIVE_THE_QUEEN ICMP 98 Echo (ping) request  id=0x5633, seq=17/4352, ttl=64
    2 0.060887024 ☕___LONG_LIVE_THE_QUEEN___☕ → 🥖_____VIVE_LA_FRANCE______🥖 ICMP 98 Echo (ping) reply    id=0x5633, seq=17/4352, ttl=63 (request in 1)
    3 1.001505971 🥖_____VIVE_LA_FRANCE______🥖 → ☕___LONG_LIVE_THE_QUEEN___☕ ICMP 98 Echo (ping) request  id=0x5633, seq=18/4608, ttl=64
    4 1.101244720 ☕___LONG_LIVE_THE_QUEEN___☕ → 🥖_____VIVE_LA_FRANCE______🥖 ICMP 98 Echo (ping) reply    id=0x5633, seq=18/4608, ttl=63 (request in 3)
    5 2.003151857 🥖_____VIVE_LA_FRANCE______🥖 → ☕___LONG_LIVE_THE_QUEEN___☕ ICMP 98 Echo (ping) request  id=0x5633, seq=19/4864, ttl=64
    6 2.144879341 ☕___LONG_LIVE_THE_QUEEN___☕ → 🥖_____VIVE_LA_FRANCE______🥖 ICMP 98 Echo (ping) reply    id=0x5633, seq=19/4864, ttl=63 (request in 5)
    7 3.005431545 🥖_____VIVE_LA_FRANCE______🥖 → ☕___LONG_LIVE_THE_QUEEN___☕ ICMP 98 Echo (ping) request  id=0x5633, seq=20/5120, ttl=64
    8 3.081396194 ☕___LONG_LIVE_THE_QUEEN___☕ → 🥖_____VIVE_LA_FRANCE______🥖 ICMP 98 Echo (ping) reply    id=0x5633, seq=20/5120, ttl=63 (request in 7)
```

### Name resolution

## Further Reading

* [Generating VLANs file](https://osqa-ask.wireshark.org/questions/63009/generate-vlans-file)
* Ask Wireshark: [Can I save manual address resolutions?](https://osqa-ask.wireshark.org/questions/9173/can-i-save-manual-address-resolutions)
