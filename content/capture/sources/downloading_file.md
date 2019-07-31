---
title: "Downloading File"
description: "Read the file while it's downloading"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: ''
weight: 30
draft: false
---

## Appending Files (i.e. tail -f)

An "appending file" is one that is being continuously written to (like a log file) and traditionally read from with `tail -f` on unix systems.

### Windows Considerations

The concept of unix pipes and text streams are not understood by Windows.
Powershell uses pipes for *objects*, not text.
If you are using Windows, you will want to use [Windows Subsystem for
Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) as Windows
[sends objects](https://docs.microsoft.com/en-us/powershell/scripting/learn/understanding-the-powershell-pipeline?view=powershell-6) and not text through pipes. Note that tshark may play better with WSL
than Wireshark for live-capturing on unusual interfaces.

If powershell is available, Get-Content *should* serve the same function.

```powershell
# ≈ tail $file -f -n+1 (print file contents and follow)
Get-Content $file -Wait
# ≈ tail $file -f -n0 (skip file contents and follow)
Get-Content $file -Wait -Tail 0
```

## Browser Download

Some services provide live packet captures through a browser. This may offer
convenience, but you need to wait for the file to completely download to use it.
Alternatively, if you open the partially downloaded file in wireshark, you
interrupt the download.

To dynamically load a downloading file as a live capture, the download partial
needs to be found first. Download partial names differ based on your browser
with $file.part (firefox), $file.[base64 string].partial (IE/Edge),
$file.crdownload (Chrome), and $file.download (Safari). Once you've found it,
you can run the following to load downloading packets in wireshark:

  tail -f -n +1 {download partial} | wireshark -k -i -

If you would like wireshark to automatically start reading the downloading
partial capture, I created a [bash
script](https://gist.github.com/pocc/cdf578a757be3a5b13b5e3bfc0fc2f82) that will do
just that. If you want this script to autostart, add the script locally and then add
`/path/to/script &` to your `~/.bashrc`.

## Scapy

Scapy is a versatile Python library for Packet Crafting. Scapy is easy to use,
and I'll demonstrate with ICMP:
<script id="asciicast-237464" src="https://asciinema.org/a/237464.js" async></script>

Scapy can also be imported as part of scripts instead of being used
interactively. Here, we'll generate traffic with it and send it live to
wireshark. The important components are Scapy's `PcapWriter` class to send
packet hex without buffering and `tail -f -n +1 $file` to read all data from the
pcap (including headers) to send to wireshark.  
<script id="asciicast-237460" src="https://asciinema.org/a/237460.js" async></script>
