---
title: "Pipes"
description: "Packet Headwaters"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: '[Wireshark Docs](https://wiki.wireshark.org/CaptureSetup/Pipes)'
weight: 30
draft: true
---

## Pipe Types

An anonymous pipe sends the output of one command to another.
A named pipe (aka FIFO) is a file created by `mkfifo` from which data can be read and to which data can be sent, by different processes.
More information about each can be found in this [stackoverflow post](https://unix.stackexchange.com/questions/436864/how-does-a-fifo-named-pipe-differs-from-a-regular-pipe-unnamed-pipe)

### Anonymous Pipe

In this example, tshark reads packets and sends the packet bytes to stdout. The stdout is written to the pipe which is sent to the stdin of a second tshark process.

```bash
# You may need to use sudo to capture
tshark -w - | tshark -r -
```

This is equivalent to `tshark -r $file`, only using a pipe and an extra tshark process to demonstrate send/recv on `|`.

{{% notice warning %}}
If you are reading from stdin, then the data stream MUST confrom to a capture type that
tshark knows how to parse. This means, for example, that a pcap file needs to
send the pcap header first or the packets that come after won't be parsed.
{{% /notice %}}

### Named Pipe

You can also read from a pipe like so:

```bash
mkfifo myfifo
# You may need to use sudo to capture
tshark -w myfifo & tshark -i myfifo
```

Confusingly, reading a pipe is through `-i` even though a named pipe is a file descriptor.
