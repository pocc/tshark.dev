---
title: "Building Your Tshark Capture Command"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs
desc: "Like building a regex but more fun!"
tags:
  - networking
  - tshark
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

<!-- Draft Until
* [ ] Bug 2874
* [ ] Filtering ASCIINEMA
* [ ] tshark vs dumpcap
-->

> _Everything comes to us that belongs to us if we create the capacity to receive it._ 
>
> _-Rabindranath Tagore_

Question: In what significant ways do dumpcap and tshark differ?

# 1. Determine your interface

If you run `ping 8.8.8.8 >/dev/null & tshark`, you should start seeing
numbered packets. If you don't, you should find out what interfaces you have
available, as the one you are currently using is not working. `tshark -D`
will show you a list of available interfaces. If you are unsure of which
interface is the default one, you can use `ifconfig` on \*nix and
`ipconfig /all` on Windows. These will print the exact name:

```sh
# Using powershell on Windows
Get-NetAdapter | where {$_.Status -eq "Up"} | Select -ExpandProperty Name
# BSD & Macos
route get default | awk '/interface:/{print $NF}'
# Linux
route | awk '/^default|^0.0.0.0/{print $NF}'
```

## Caveat

You shouldn't need to specify link layer type as that is automatically
detected. `tshark -i ${interface} -L` will show yo uthe available DLTs for
the interface. If you need to change the DLT, use
`tshark -i ${interface} -y ${DLT}`. For wireless adapters, changing the DLT
to PPI is the equivalent of `-I` (turning on monitor-mode).

You can specify monitor-mode and promiscuous mode with `-I` and `-p`
respectively. Monitor-mode applies to 802.11 interfaces only and allows for
the sniffing of traffic on all BSSIDs in range. THis is important for 802.11
troubleshooting where control frames direct and describe wireless
conversations. Promiscuous mode is the default and allows for snooping _ALL_
traffic, not just the packets destination of your MAC (normally these are
discarded). Turning it off gives you a view of what th eCPU sees instead of
the network adapter.

# 2. Reading from a source

You can read from stdin like so: `tshark -w - | tshark -r -`. Note that if you
are reading from stdin, then the dat astream MUST confrom to a capture type that
tshark knows how to parse. This means, for example, that a pcap file needs to
send the pcap header first or the packets that come after won't be parsed. 

`-r ${input}` can be a file. 

(See bug 2874)

You can also read from a pipe like so:

```bash
mkfifo myfifo
tshark -Q -w myfifo & tshark -i myfifo
```

Confusingly, reading a pipe is through `-i` even though a pipe is not a
configured interface.

# 3. Filter Traffic

There are two types of filters: Capture filters and display filters. Capture
filters are more limited and are based on [eBPF syntax](). Capture filters are
used to decrease the size of captures by filtering out packets before they are
added. By comparison, display filters are more versatile, and can be used to
select for expert infos that can be determined with a multipass analysis. For
example, if you want to see all pings that didn't get a response,
`'tshark -r file.pcap -Y "icmp.resp_not_found"` will do the job.

To specify a capture filter, use -f <filter>. To specify a display filter,
use -Y <filter>. If you would like to optimize display filtering over 2
passes, you can spceify the first with `-R <filter> -2 -Y <2nd filter>`.

# 4. Advanced: Capture Parameters

If you are taking a long continuous capture, then space will eventually become a
concern. There a couple ways to parameterize your capture.

When should it stop?  `-a` provides several methods for stopping the capture:

- duration: NUM - stop after NUM seconds
- filesize: NUM - stop after NUM KB
- files: NUM - stop after NUM files
- packets: NUM - Number of packets

Ring buffers: `-b` are like `-a` but you can also specify interval: NUM in
seconds.

<Include ASCIINEMA>

-B  : Size of the Kernel Buffer => Default is 2MB. (How can you verify this?)
-s <num> : limit each packet to NUM bytes to save on space.

# 5. Add context

## 5A. Name resolution

There are ways to polish a packet capture. What you add should depend on what
you are troubleshooting.

-N :
  m => mac
  t => port
  v => vlan
  N => dns

-n : Does this actually do anything (check bug)
??? What is the scope of these? Is it added to stdout but not to files ???
-Wn implies this.

-Wn saves info to a file
-H Use hosts file as source, implies -Wn.

??? How do you strip DNS info from a file ???

## 5B. Decoding protocols

Sometimes you might be using network protocools in ways that Wireshark isn't
expecting (or aren't standard). In these cases, it is important to decode the
protocols so that wireshark's dissectors can be leveraged. 

Using `-d`, ... <ASCIICAST>

en/disable protocols/heuristics can do the same thing.

??? What is a heuristic vis-a-vis wireshark vs protocol ???

## Usage for already-captured files

- Use Tshark to [Decrypt Kerberos, TLS, or 802.11](/post/tshark-decryption)

## 6. tshark vs dumpcap

At first glance, tshark looks like it has most of dumpcap's functionality, and that's mostly true.

Here are a couple differences:
- 
