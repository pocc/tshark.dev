---
title: Install
description: "Installation is a gateway drug"
date: 2019-07-04
author: Ross Jacobs

summary: 'Wireshark: [Installation Chapter](https://www.wireshark.org/docs/wsug_html_chunked/ChapterBuildInstall.html)'
weight: 10
draft: false
---

## Install Wireshark with a Package Manager

Where available, prefer your [package manager](https://en.wikipedia.org/wiki/Package_manager). Note that Wireshark v3 is not currently available on many Linux package managers (this will change soon).

| System  | Install Command                 | Latest Version  |
|---------|---------------------------------|-----------------|
| Linux   | `$PkgManager install wireshark` | 2.6.8 and below |
| Macos   | `brew install --cask wireshark` | 3.0.2           |
| Windows | `choco install wireshark`       | 3.0.2           |

### Installing tshark Only

**Note**: If you have not used tshark before, you should install the `wireshark`
package as above before limiting yourself to the CLI.

If you want to install just tshark and no Qt/GUI components, this is possible on
various linux distributions. The package is called `tshark` or `wireshark-cli`
depending on the platform.

Install the package `tshark`:

* Alpine >= 3.9
* Debian >= 9
* FreeBSD >= 11
* OpenMandriva >= 3.0
* PCLinuxOS
* Ubuntu >= 14.04

Install the package `wireshark-cli`.
* Arch Linux
* CentOS >= 8
* Fedora >= 30
* RedHat

For up-to-date package information, check the package registry for
[tshark](https://pkgs.org/search/?q=tshark) and
[wireshark-cli](https://pkgs.org/search/?q=wireshark-cli) 

## Install with a package

To get the most up-to-date official packages, visit Wireshark's [Download Page](https://www.wireshark.org/download.html).

{{% notice warning %}}
There are multiple packages available from Wireshark's [download page](https://www.wireshark.org/download.html). The installation is simple, but make sure to check the components that. 
{{% /notice %}}

## Install from Source

Linux currently does not have packages in official repositories, so if you want the latest, you have to build it (this will likely change soon).

### Linux, v3.0.0

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

If you are on a different system, only the last 3 steps apply. Make sure that
you've satisfied the other dependencies. `cmake` will kindly let you know if you
haven't.

## Check Installation

### 1. Check Version

```bash
$ tshark --version
TShark (Wireshark) 3.0.2 (v3.0.2-0-g621ed351d5c9)
<output clipped ...>
```

If the version doesn't match the expected one, you may want to
[install from source](#install-from-source) or use [Wireshark's download page](https://www.wireshark.org/download.html).

### 2. Check Interfaces

`tshark -D` will list all interfaces that it sees.

{{% notice note %}}
dumpcap does not see and cannot capture on virtual interfaces. This means that `dumpcap -D` will show fewer interfaces than `tshark -D`.
{{% /notice %}}

Different systems will report different interfaces. tshark will treat the first interface as the default interface and capture from it by default.
In other words, `tshark` aliases to `tshark -i 1`. You may need to use `sudo` depending on your installation.
Default interfaces on installs of macos, windows, linux, and freebsd are shown below.

### 3. Test Live Capture

Entering the `tshark` command should immediately start capturing packets on the default interface. If you do
not see packets, check out [Choosing an Interface](/capture/sources).

### 4. Make Sure Utilities are on $PATH

Setting up your environment should be done once and done well. There are a couple
Additional work is usually necessary to make sure all utilities are on the path.

#### bash

You can verify whether all are installed with the following:

```bash
# Loop through wireshark utils to find the ones that the system cannot
utils=(androiddump capinfos captype ciscodump dftest dumpcap editcap idl2wrs
  mergecap mmdbresolve randpkt randpktdump reordercap sshdump text2pcap tshark
  udpdump wireshark pcap-filter wireshark-filter)

for util in ${utils[*]}; do
  if [[ -z $(which $util) ]]; then
    echo $util
  fi
done
```

If a util is installed but not on your $PATH, you can use `find / -name $util 2>/dev/null`
to find out where it may be. For example, on Linux for 3.0.0, extcap tools are
at /usr/lib/x86_64-linux-gnu/wireshark/extcap. To add them to your path, use
`echo 'export PATH=$PATH:$folder' >> ~/.profile`.

#### Powershell on Windows

Currently, extcap utils [need to be
moved](https://www.wireshark.org/lists/wireshark-dev/201608/msg00161.html) from Wireshark\\extcap => Wireshark
to be useable. If you have not added your %Program Files% to your $PATH, you can
do that with an Admin user:

`[Environment]::SetEnvironmentVariable(`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"PATH", "$PATH;$ENV:ProgramFiles\Wireshark", "Machine")`

You will need to reopen Powershell for the $PATH to be updated.
