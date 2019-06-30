---
title: Installation
author: Ross Jacobs
description: "Installation is a gateway drug"
weight: 10
---

{{% notice warn %}}
Where wireshark is available at what version will frequently change.
Check the package managers themselves for the most up-to-date information.
{{% /notice %}}

| System  | Install Command                 | Version         |
|---------|---------------------------------|-----------------|
| Linux   | `$PkgManager install wireshark` | 2.6.8 and below |
| Macos   | `brew cask install wireshark`   | 3.0.2           |
| Windows | `choco install wireshark`       | 3.0.2           |

To get the most up-to-date packages, visit Wireshark's [Download Page](https://www.wireshark.org/download.html).

## Linux, v3.0.0 from source

You need to install from source to get v3 on Linux. This will get a clean system on Ubuntu
18.04 to an install:

```bash
wget https://www.wireshark.org/download/src/wireshark-3.0.0.tar.xz -O /tmp/wireshark-3.0.0.tar.xz
tar -xvf /tmp/wireshark-3.0.0.tar.xz
cd /tmp/wireshark-3.0.0

sudo apt update && sudo apt dist-upgrade
sudo apt install cmake libglib2.0-dev libgcrypt20-dev flex yacc bison byacc \
  libpcap-dev qtbase5-dev libssh-dev libsystemd-dev qtmultimedia5-dev \
  libqt5svg5-dev qttools5-dev
cmake .
make
sudo make install
```

If you are on a different system, only the last 3 steps apply (making sure that
you've satisfied the other dependencies. `cmake` will kindly let you know if you
haven't).

## Verify installation

Enter `tshark --version`, and you should see something like this:

```bash
TShark (Wireshark) 3.0.2 (v3.0.2-0-g621ed351d5c9)

Copyright 1998-2019 Gerald Combs <gerald@wireshark.org> and contributors.
License GPLv2+: GNU GPL version 2 or later <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
This is free software; see the source for copying conditions. There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Compiled (64-bit) with libpcap, without POSIX capabilities, with GLib 2.37.6,
with zlib 1.2.11, with SMI 0.4.8, with c-ares 1.15.0, with Lua 5.2.4, with
GnuTLS 3.4.17, with Gcrypt 1.7.7, with MIT Kerberos, with MaxMind DB resolver,
with nghttp2 1.21.0, with LZ4, with Snappy, with libxml2 2.9.9.

Running on Mac OS X 10.14.5, build 18F132 (Darwin 18.6.0), with Intel(R)
Core(TM) i7-4770HQ CPU @ 2.20GHz (with SSE4.2), with 16384 MB of physical
memory, with locale en_US.UTF-8, with libpcap version 1.8.1 -- Apple version
79.250.1, with GnuTLS 3.4.17, with Gcrypt 1.7.7, with zlib 1.2.11, binary
plugins supported (0 loaded).

Built using clang 4.2.1 Compatible Apple LLVM 10.0.1 (clang-1001.0.46.4).
```
