---
title: Configuration
author: Ross Jacobs
description: "A configuration can never be perfect"
weight: 20
---

## Utilities

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
moved](https://www.wireshark.org/lists/wireshark-dev/201608/msg00161.html) from Wireshark\\extcap => Wireshark
to be useable. If you have not added your %Program Files% to your $PATH, you can
do that with an Admin user:

`[Environment]::SetEnvironmentVariable(`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`"PATH", "$PATH;$ENV:ProgramFiles", "Machine")`

## Color

To always enable color, add a line to your .profile or .bashrc:

```bash
echo "alias tshark='tshark --color'" >> ~/.profile
```

For more information, check out [Tshark Colorized](/packetcraft/tshark_colorized).
