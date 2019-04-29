---
title: "Live Capturing on Unusual Interfaces"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Wireshark Bonus Topics"
tags:
  - networking
  - wireshark
  - commandfu
  - draft1
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

_WANTED: Suspect is trafficking in packets. Reward paid upon capture._

There are many possible non-traditional interfaces that Wireshark can capture
live on. Wireshark's extcaps are a means to do the same through a plugin system.

If you are using Windows, you will want to use [Windows Subsystem for
Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) as Windows
has problems with pipes and FIFOs. Note that tshark may play better with WSL
than Wireshark for live-capturing on unusual interfaces.

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

	tail -f -n +1 <download partial> | wireshark -k -i -

If you would like wireshark to automatically start reading the downloading
partial capture, I created a [bash
script](https://gist.github.com/pocc/cdf578a757be3a5b13b5e3bfc0fc2f82) that will do
just that. If you want this script to autostart, add the script locally and then add
`/path/to/script &` to your `~/.bashrc`.

## Capturing remotely over an SSH connection

Getting a live capture over an ssh connection is a solved problem on all
platforms. `ssh` works for this purpose on Linux, Macos, and WSL on Windows
while
[`Plink`](https://kaischroed.wordpress.com/2013/01/28/howto-use-wireshark-over-ssh/)
works for Windows PuTTY users. Briefly, I'll go over what
that looks like for `ssh`.

_You can check that your ssh-key is loaded with `ssh-add -L`._

Initially, let's set up variables for cleaner code. Replace each variable in <>
with a value that works for you.

```bash
ssh_opts="<user>@<server> -p <port>"
remote_cmd="sudo /usr/sbin/tcpdump -s0 -n -w - not port <port>"
read_cmd="< 'wireshark -k' -OR- 'tshark' > -i"
```

We then have the option of piping directly:

```bash
ssh $ssh_opts $remote_cmd | $read_cmd - 
```

__Or__ using a named pipe:

```bash
mkfifo /tmp/capfifo
ssh $ssh_options $ssh_command > /tmp/capinfo &
$read_cmd /tmp/capfifo
```

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
