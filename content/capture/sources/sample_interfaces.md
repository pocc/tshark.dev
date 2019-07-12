---
title: "Sample Interfaces"
date: 2019-04-08T12:44:45Z
description: "Default interfaces on Windows, Macos, Linux, and FreeBSD"
author: Ross Jacobs

summary: ""
weight: 99
draft: false
---

## Sample Interface Listings

Taken on 2019-07-03. These are provided as examples of what interface listings look like on different platforms.
It is **highly** likely that your listing will look different.

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
