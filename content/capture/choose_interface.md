---
title: "Choosing an Interface"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs
description: "Like building a regex but more fun!"
weight: 20

draft: false
---

{{% notice tip %}}
If tshark captures on the correct interface without `-i`, you can skip this section.
{{% /notice %}}

## Similar resources

* https://wiki.wireshark.org/CaptureSetup 

## tshark interfaces

Multiple types of interfaces are available in wireshark:

| Command                        | Captures on                                               |
| ------------------------------ | --------------------------------                          |
| `tshark -i <n>`                | [nth interface]({{< relref "#using-interface-number" >}}) |
| `tshark -i <interface name>`   | [interface]({{< relref "#using-interface-name" >}})       |
| `tshark -i -`                  | [stdin]({{< ref "/" >}})                                  |
| `tshark -i FIFO`               | [FIFO file]({{< ref "/" >}})                              |
| `tshark -i <extcap interface>` | [extcap]({{< ref "/" >}})                                 |

If no `-i` argument is found, `tshark` aliases to `tshark -i 1`.

{{% notice note %}}
<b><i class="fab fa-linux fa-lg"></i></b> <i class="fab fa-freebsd fa-lg"></i> <i class="fab fa-apple fa-lg"></i>
You may need to use **sudo** when capturing depending on how you installed
dumpshark on your system.
{{% /notice %}}

### Using interface number

{{% notice info %}}
tshark -D and dumpshark -D each print the interfaces they are aware of.
dumpshark knows of a subset of tshark's interfaces (dumpshark is not aware 
of extcap interfaces). Prefer tshark -D to dumpshark -D in scripts.
{{% /notice %}}

If we wanted to capture traffic on p2p0, we could call that with `tshark -i 2`.
It is possible for interface number to change if new ones are added or
subtracted. Interface name is less likely to change, so prefer it in scripts.

### Using interface name

tshark expects the exact name of the interface. If the interface name
has spaces or special characters, use 'single quotes'.

#### show interface

If you run `ping 8.8.8.8 & tshark`, you should start seeing numbered packets from tshark:

<script id="asciicast-244206" src="https://asciinema.org/a/244206.js" async></script>

If you don't, you should find out what interfaces you have
available, as the one you are currently using is not working. `tshark -D`
will show you a list of interfaces tshark is aware of. If in doubt, `ifconfig` on
\*nix and `ipconfig /all` on Windows will print all interfaces.

If you do not see any packets captured, try using `tshark -i <interface>` with the listing of `tshark -D` from before.

### Finding the interface name

_These one-liners will print the exact interface name, regardless of OS._

```sh
# Using powershell on Windows
Get-NetAdapter | where {$_.Status -eq "Up"} | Select -ExpandProperty Name
# BSD & Macos
route get default | awk '/interface:/{print $NF}'
# Linux
route | awk '/^default|^0.0.0.0/{print $NF}'
```

## Advanced: Choosing link layer type

You shouldn't need to specify link layer type as that is automatically
detected. `tshark -i ${interface} -L` will show yo uthe available DLTs for
the interface. If you need to change the DLT, use
`tshark -i ${interface} -y ${DLT}`. For wireless adapters, changing the DLT
to PPI is the equivalent of `-I` (turning on monitor-mode).

You can specify monitor-mode and promiscuous mode with `-I` and `-p`
respectively. Monitor-mode applies to 802.11 interfaces only and allows for
the sniffing of traffic on all BSSIDs in range. This is important for 802.11
troubleshooting where control frames direct and describe wireless
conversations. Promiscuous mode is the default and allows for snooping _ALL_
traffic, not just the packets destination of your MAC (normally these are
discarded). Turning it off gives you a view of what the CPU sees instead of
the network adapter.

More information can be found in the [Wireshark
Guide](https://www.wireshark.org/docs/wsug_html_chunked/ChCapLinkLayerHeader.html).

## Sample Interface Listings

Taken on 2019-07-03. These are provided as examples of what interface listings look like on different platforms.

### Sample Windows interfaces

_Windows 10, version 1809_

```
C:\Users\rj>tshark -D
1. \Device\NPF_{556AA61D-DAE9-4A5B-8E7E-1E92123B061E} (Ethernet)
2. \\.\USBPcap1 (USBPcap1)
3. ciscodump (Cisco remote capture)
4. randpkt (Random packet generator)
5. sshdump (SSH remote capture)
6. udpdump (UDP Listener remote capture)
```

### Sample Macos interfaces

_Macos 10.14_

```
~ $ tshark -D
1. en0 (Wi-Fi)
2. p2p0
3. awdl0
4. bridge0 (Thunderbolt Bridge)
5. utun0
6. en1 (Thunderbolt 1)
7. en2 (Thunderbolt 2)
8. lo0 (Loopback)
9. gif0
10. stf0
11. XHC20
12. ciscodump (Cisco remote capture)
13. randpkt (Random packet generator)
14. sshdump (SSH remote capture)
15. udpdump (UDP Listener remote capture)
```

### Sample Linux interfaces 

_Ubuntu 18.04_

You may run into an issue where you only see [extcap interfaces](/capture/extcap_interfaces) without
sudo privileges.

```
rj@vmbuntu:~$ tshark -D
1. ciscodump (Cisco remote capture)
2. randpkt (Random packet generator)
3. sshdump (SSH remote capture)
4. udpdump (UDP Listener remote capture)
```

Using sudo will fix this. Generic reminder to respect sudo privileges.

```
rj@vmbuntu:~$ sudo tshark -D
[sudo] password for rj: 
Running as user "root" and group "root". This could be dangerous.
tshark: Lua: Error during loading:
 /usr/share/wireshark/init.lua:32: dofile has been disabled due to running Wireshark as superuser. See https://wiki.wireshark.org/CaptureSetup/CapturePrivileges for help in running Wireshark as an unprivileged user.
1. enp0s3
2. any
3. lo (Loopback)
4. nflog
5. nfqueue
6. usbmon1
7. ciscodump (Cisco remote capture)
8. randpkt (Random packet generator)
9. sshdump (SSH remote capture)
10. udpdump (UDP Listener remote capture)
```

### Sample BSD interfaces

_FreeBSD 12.0_

```
$ tshark -D
1. em0
2. lo0 (Loopback)
3. usbus0
4. usbus1
5. randpkt (Random packet generator)
6. udpdump (UDP Listener remote capture)
```
