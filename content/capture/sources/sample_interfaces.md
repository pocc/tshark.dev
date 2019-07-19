---
title: "Sample Interfaces"
date: 2019-04-08T12:44:45Z
description: "Default interfaces on Windows, Macos, Linux, and FreeBSD"
author: Ross Jacobs

summary: ""
weight: 99
draft: false
---

These sample listings are provided to give an idea of output on various systems.
You should run the command on your system to get actual results.

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

You may run into an issue where you only see [extcap interfaces](/capture/sources/extcap_interfaces) without
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

## Sample Capture File Types

_tshark 3.0.2, Macos 10.14, 2019_

```bash
$ tshark -F
tshark -F
tshark: option requires an argument -- F
tshark: The available capture file types for the "-F" flag are:
    5views - InfoVista 5View capture
    btsnoop - Symbian OS btsnoop
    commview - TamoSoft CommView
    dct2000 - Catapult DCT2000 trace (.out format)
    erf - Endace ERF capture
    eyesdn - EyeSDN USB S0/E1 ISDN trace format
    k12text - K12 text file
    lanalyzer - Novell LANalyzer
    logcat - Android Logcat Binary format
    logcat-brief - Android Logcat Brief text format
    logcat-long - Android Logcat Long text format
    logcat-process - Android Logcat Process text format
    logcat-tag - Android Logcat Tag text format
    logcat-thread - Android Logcat Thread text format
    logcat-threadtime - Android Logcat Threadtime text format
    logcat-time - Android Logcat Time text format
    modpcap - Modified tcpdump - pcap
    netmon1 - Microsoft NetMon 1.x
    netmon2 - Microsoft NetMon 2.x
    nettl - HP-UX nettl trace
    ngsniffer - Sniffer (DOS)
    ngwsniffer_1_1 - NetXray, Sniffer (Windows) 1.1
    ngwsniffer_2_0 - Sniffer (Windows) 2.00x
    niobserver - Network Instruments Observer
    nokiapcap - Nokia tcpdump - pcap
    nsecpcap - Wireshark/tcpdump/... - nanosecond pcap
    nstrace10 - NetScaler Trace (Version 1.0)
    nstrace20 - NetScaler Trace (Version 2.0)
    nstrace30 - NetScaler Trace (Version 3.0)
    nstrace35 - NetScaler Trace (Version 3.5)
    pcap - Wireshark/tcpdump/... - pcap
    pcapng - Wireshark/... - pcapng
    rf5 - Tektronix K12xx 32-bit .rf5 format
    rh6_1pcap - RedHat 6.1 tcpdump - pcap
    snoop - Sun snoop
    suse6_3pcap - SuSE 6.3 tcpdump - pcap
    visual - Visual Networks traffic capture
```
