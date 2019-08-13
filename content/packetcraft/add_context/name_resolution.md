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

With tshark, you can specify preferences manually with `-o key:value` as shown in "Other Notes" or by adding these to the preferences file directly. To change `preferences`, `ethers`, `vlans`, `services`, `hosts`, and others, check out [Editing Config Files](/packetcraft/arcana/profiles).

## On Editing the System's Hosts File

It is best practices not to manually edit your system's hosts file unless you keep immaculate documentation and can read your colleagues' minds.
It is easy to make a change, forget about it, and then have a "mystery" network problem 6 months later.

<a href="https://simpleprogrammer.com/if-you-like-living-dangerously-modify-your-hosts-file/"><img src="https://i.imgur.com/WmRbmf5.png" alt="It was DNS" style="width:61%;"></a>

## Example: Using All Resolution Types

{{% notice note %}}
You cannot override the default names for well-known mac addresses (wka). For example, `ff:ff:ff:ff:ff:ff` will be "Broadcast" and `01:00:0c:cc:cc:cd` will be PVST+ regardless of your settings.
A full list is available at Wireshark's [wka file](https://raw.githubusercontent.com/wireshark/wireshark/master/wka).
{{% /notice %}}

Thanks to Wireshark's [Sample Captures](https://wiki.wireshark.org/SampleCaptures), we have a [file](/files/vlan.cap) from last millennium with VLANs, IPX, AppleTalk, IPv4, TCP, X11, STP, and RIP. _Clearly_, the best party going on in late 1999 was in a network.

{{% notice note %}}
`manuf`, `ethers`, `vlans`, `ipxnets`, and `services` files don't seem to resolve anything. It looks like this might be fixed in v3.1.0 (develop), but requires more testing.
{{% /notice %}}

~~* `manuf` resolves OUIs~~  
~~* `ethers` resolves mac addresses to hostnames~~  
~~* `vlans` resolves vlan ids to vlan names~~  
* `subnets` resolves ipv4 subnets to names  
~~* `ipxnets` resolves ipx networks to names~~  
~~* `services` resolves tcp ports to services~~  
* `hosts` resolves ipv4 addresses to names

You can ([download](/files/vlan_profile.tgz)) this profile into your personal profile folder and untar or run this two liner that does the same thing.

```bash
# Get your personal profile directory with grep and awk
personal_dir="$(tshark -G folders | grep "nal c" | awk -F':\t*' '{print $2"/profiles"}')"
# Untar and save VLAN profile to your personal profile directory
curl https://tshark.dev/files/vlan_profile.tgz | tar xvz -C $personal_dir
```

To demonstrate the hosts and subnets file, we are going to use tshark's columnar %uns (unresolved net source addr), %und (resolved net dest addr), %rns (resolved net source addr), and %rnd (resolved net source addr).
To see all of the available column fields to tshark for columnar output, check the output of `tshark -G column-formats`.

In this example, we are looking at all unique IP conversations and not using name resolution or our profile.

```bash
# Read the file, filter out IPX, and output unique conversations between IP addresses.
bash$ tshark -r /tmp/vlan.cap -o 'gui.column.format:"Source Net Addr","%uns","Dest Net Addr", "%und"' -Y "ip" | sort | uniq
131.151.10.254 → 255.255.255.255
131.151.104.96 → 131.151.107.255
131.151.107.254 → 255.255.255.255
131.151.111.254 → 255.255.255.255
131.151.115.254 → 255.255.255.255
131.151.1.254 → 255.255.255.255
131.151.20.254 → 255.255.255.255
131.151.32.129 → 131.151.32.21
131.151.32.129 → 131.151.6.171
131.151.32.21 → 131.151.32.129
131.151.32.254 → 255.255.255.255
131.151.32.71 → 131.151.32.255
131.151.32.79 → 131.151.32.255
131.151.5.254 → 255.255.255.255
131.151.5.55 → 131.151.5.255
131.151.6.171 → 131.151.32.129
131.151.6.254 → 255.255.255.255
```

In this example, we are looking at conversations between resolved network addresses. Information from both the `hosts` file and `subnets` file is used.
I've aliased the broadcast address 255.255.255.255 to "AVENGERS_ASSEMBLE!!!" as it might be something they would _broadcast_.

```bash
# Read the file, filter out IPX, and output unique conversations between resolved IP addresses and subnets using data from a profile.
bash$ tshark -r /tmp/vlan.cap -C vlan_profile -o 'gui.column.format:"Source Net Addr","%rns","Dest Net Addr", "%rnd"' -Y "ip" | sort | uniq
     Ant.Man → AVENGERS_ASSEMBLE!!!
 Black.Widow → LAN_OF_MILK_AND_HONEY.3.255
Captain.America → AVENGERS_ASSEMBLE!!!
Captain.Marvel → AVENGERS_ASSEMBLE!!!
Doctor.Strange → Rocket.Raccoon
      Falcon → AVENGERS_ASSEMBLE!!!
       Groot → AVENGERS_ASSEMBLE!!!
     Hawkeye → AVENGERS_ASSEMBLE!!!
        Hulk → Rocket.Raccoon
    Iron.Man → AVENGERS_ASSEMBLE!!!
      Nebula → VLADIMIR_COMPUTIN.255
   Nick.Fury → AVENGERS_ASSEMBLE!!!
 Quicksilver → AVENGERS_ASSEMBLE!!!
Rocket.Raccoon → Doctor.Strange
Rocket.Raccoon → Hulk        
        Thor → Black.Panther
        Wasp → VLADIMIR_COMPUTIN.255
```

There are a couple things to note here. First, I made sure to add this capture's IP addresses (with names) to the profile's hosts file. There are no unresolved addresses.
Secondly, there is a "VLADIMIR_COMPUTIN.255" and "LAN_OF_MILK_AND_HONEY.3.255". These are both subnet names from the `subnets` file. I did not put any IPs ending in `.255` into the hosts file, so
tshark defaults to the subnet name for these addresses.

```hosts
# Relevant subnet file entries
...
131.151.32.0/24     VLADIMIR_COMPUTIN
131.151.104.0/22    LAN_OF_MILK_AND_HONEY
```

The reason that the LAN_OF_MILK_AND_HONEY ends in 3.255 is because that is the unresolved component (and broadcast address) of a /22.

## Further Reading

* [Generating VLANs file](https://osqa-ask.wireshark.org/questions/63009/generate-vlans-file)
* Ask Wireshark: [Can I save manual address resolutions?](https://osqa-ask.wireshark.org/questions/9173/can-i-save-manual-address-resolutions)
