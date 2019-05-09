---
title: Tshark Setup
author: Ross Jacobs
pre: <b><i class="fas fa-fighter-jet"></i>　</b>
tags:
  - setup
  - linux
  - macos
  - windows
weight: 1
---
```mermaid
graph LR;
	%% Elements
	subgraph GET STARTED
	SETUP(fa:fa-fighter-jet Setup tshark)
	end
	
	subgraph GET PCAP
	CAPTURE(<a href={{< ref "/capture" >}}>fa:fa-network-wired Capture Pcap</a>)
	GEN(<a href={{< ref "/generation" >}}>fa:fa-industry Generate Pcap</a>)
	DL(<a href={{< ref "/download" >}}>fa:fa-download Download Pcap</a>)
	end

	subgraph ANALYZE PCAP
	PCAP((<a href={{< ref "/" >}}>fa:fa-file Pcap File</a>))
	EDIT(<a href={{< ref "/edit" >}}>fa:fa-edit Edit Pcap</a>)
	EXPORT(<a href={{< ref "/export" >}}>fa:fa-file-export Export Files</a>)
	INFO(<a href={{< ref "/getinfo" >}}>fa:fa-info-circle Get Info</a>)
	end
	
	subgraph ADVANCED TOPICS
	ADV(<a href={{< ref "/advanced" >}}>fa:fa-hat-wizard Packetcraft</a>)
	COMM(<a href={{< ref "/communicate" >}}>fa:fa-envelope Communicate<br/> Results</a>)
	HELP(<a href={{< ref "/contribute" >}}>fa:fa-code-branch Contribute</a>)
	end
	
	%% CSS
	%% Using blues from https://htmlcolorcodes.com/ 
	linkStyle default interpolate monotoneX
	classDef others fill:#D6EAF8,stroke:#1B4F72;
	classDef thisnode fill:#5DADE2,stroke:#1B4F72;
	class CAPTURE,DL,GEN,PCAP,EDIT,EXPORT,INFO,COMM,ADV,HELP others
	class SETUP thisnode
	style SETUP stroke-width:3px;

	%% Relationships
	SETUP --> CAPTURE
	SETUP --> GEN
	CAPTURE --> PCAP
	DL --> PCAP
	GEN --> PCAP
	
	PCAP --> EDIT
	EDIT --> PCAP
	PCAP --> EXPORT
    PCAP --> INFO
    PCAP --> COMM
    EXPORT --> COMM
    INFO --> COMM
```

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
