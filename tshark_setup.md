---
title: "Wireshark Setup"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Install Wireshark"
tags:
  - networking
  - wireshark
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

_Setup Wireshark 3.0.0 on your $System_

_All package managers have versions 2.6.6 and prior. If you want this version,
you can install it with `$PackageManager install wireshark`._

## Install 3.0.0

### Windows

Currently, Chocolatey is stuck on Wireshark 2.6.6. It is likely that 3.0.0 will
be added soon, in which case you can install with `choco install wireshark`.

You can automate the install with Powershell:

```powershell
$VER_300 = https://1.eu.dl.wireshark.org/win64/Wireshark-win64-3.0.0.exe
cd $ENV:Localappdata
Invoke-Webrequest -Uri $VER_300  -Outfile wireshark.exe
Start-Process .\wireshark.exe /S
```

### Macos

`brew cask install wireshark`

### Linux

You need to install from source at this point. This will get a clean system on Ubuntu
18.04 to an install:

```
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

## Configuration

Additional work is usually necessary to make sure all utilities are on the path.

### bash

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

### Powershell on Windows

Currently, extcap utils [need to be
moved](https://www.wireshark.org/lists/wireshark-dev/201608/msg00161.html) to from Wireshark/extcap => Wireshark
to be useable. If you have not added your %Program Files% to your $PATH, you can
do that with an Admin user: 

`[Environment]::SetEnvironmentVariable(`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"PATH", "$PATH;$ENV:ProgramFiles", "Machine")`
