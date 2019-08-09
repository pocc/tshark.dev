---
title: "Name Resolution"
description: "Resolve to Analyze"
date: 2019-07-19
author: Ross Jacobs

summary: '[docs](https://www.wireshark.org/docs/wsug_html_chunked/ChAdvNameResolutionSection.html)'
weight: 50
draft: false
---

Name resolution allows you to see more information about various PDU fields.
Wireshark is intelligent and uses ARP and DNS lookups in the capture to add context when they are available.

{{% notice info %}}
The `-n` option of tshark disables all name resolutions. The big one it blocks is DNS queries to external resolvers.
Using `-n` will not change the resulting pcap file, but will decrease tcpdump/tshark resource usage.
{{% /notice %}}

## Using Tshark Flags

The highlighted "data sources" listed here are files in the [profiles folder](/packetcraft/profiles).

| Flag          | Resolves        | Data Source                         | Other Notes |
|---------------|-----------------|-------------------------------------|-------------|
| `-Nm`         | mac             | `ethers`                            |             |
| `-Nv`         | vlan            | `vlans`                             |             |
| `-Nt`         | port            | `services`                          |             |
| `-Nn`         | dns             | system `hosts`                      | To use only Wireshark's hosts file, use `-o nameres.hosts_file_handling:TRUE` |
| `-NN`         | dns             | Use external resolvers              | ≈ `-o 'nameres.dns_pkt_addr_resolution:TRUE'`                                 |
| `-Nd`         | dns             | Use capture file's<br>DNS responses | ≈ `-o 'nameres.use_external_name_resolver:TRUE'`                              |
| `-H $file`    | dns             | `$file` you specify                 | ≈ `-Wn`; Adds DNS info from a file for this session; Requires -Nn             |

Here, `ethers`, `vlans`, `services`, `hosts` are loaded by *shark from the global/personal config directory (See [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/ChAppFilesConfigurationSection.html#ChAppFilesConfigurationSection)).

With tshark, you can specify preferences manually with `-o key:value` as shown in "Other Notes" or by adding these to the preferences file directly. To change `preferences`, `ethers`, `vlans`, `services`, `hosts`, and others, check out [Editing Config Files](/packetcraft/profiles).

## On Editing the System's Hosts file

It is best practices not to manually edit your system's hosts file unless you keep immaculate documentation and can read your colleagues' minds.
It is easy to make a change, forget about it, and then have a "mystery" network problem 6 months later.

<a href="https://simpleprogrammer.com/if-you-like-living-dangerously-modify-your-hosts-file/"><img src="https://i.imgur.com/WmRbmf5.png" alt="It was DNS" style="width:61%;"></a>

## Example: Using All Resolution Types

Thanks to Wireshark's [Sample Captures](https://wiki.wireshark.org/SampleCaptures), we have a [file](/files/vlan.cap) from last millenium with VLANs, IPX, IPv4, TCP, X11, STP, and RIP. _Clearly_, the best party going on in late 1999 was in a network.

Given the variety of protocols here, we can use 7 config files to resolve ([Download Tarfile](/files/vlan_profile.tgz)):

* `manuf` resolves OUIs
* `ethers` resolves mac addresses to hostnames
* `vlans` resolves vlan ids to vlan names
* `subnets` resolves ipv4 subnets to names
* `ipxnets` resolves ipx networks to names
* `services` resolves tcp ports to services
* `hosts` resolves ipv4 addresses to names

Move this profile into your personal profile folder (You can check what this is with `tshark -G folders`, and add /profiles).

```bash
personal_profiles_dir="$(tshark -G folders | grep "nal c" | awk -F':\t*' '{print $2"/profiles"}')"
cd $personal_profiles_dir
wget https://tshark.dev/files/vlan_profile.tgz
```

## Config File Preferences

TRUE or FALSE (case-insensitive)

```bash
tshark -all -of -the -other -flags \
    -o nameres.mac_name:TRUE \
    -o nameres.transport_name: TRUE \
    -o nameres.network_name: TRUE \
    -o nameres.vlan_name: TRUE \
    -o nameres.ss7_pc_name: TRUE
```

### DNS settings

These settings control DNS and Wireshark. You can see what yours are with `tshark -G currentprefs | grep -E "^#?nameres.*(dns|hosts|name_resolve)"`.

These are the settings :

```sh
# Same as -Nd. Use capture file's dns queries for name resolution
nameres.dns_pkt_addr_resolution: TRUE
# Same as -NN. Manually lookup all names with an external resolver
nameres.use_external_name_resolver: TRUE
# Max DNS requests/sec (must be positive integer). Requires above to be true
nameres.name_resolve_concurrency: 500
# Use the config-file-folder hosts and not system or others
nameres.hosts_file_handling: TRUE
```

## Further Reading

* [Generating VLANs file](https://osqa-ask.wireshark.org/questions/63009/generate-vlans-file)
* Ask Wireshark: [Can I save manual address resolutions?](https://osqa-ask.wireshark.org/questions/9173/can-i-save-manual-address-resolutions)
