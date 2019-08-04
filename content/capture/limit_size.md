---
title: "Limit Size"
description: "Limit the capture size before starting it"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: 'Packetlife: [Long Captures](https://packetlife.net/blog/2011/mar/9/long-term-traffic-capture-wireshark/)'
weight: 90
draft: true
---

If you are capturing with tshark/Wireshark, you will create a temp file. In Wireshark, this file is available in Capture properties.

Regardless of whether you explicitly set the file to write to with `-w <file>`

specify a file to save  to a temporary file or a .

## Limiting Size

If you are taking a long continuous capture, then space will eventually become a
concern. There a couple ways to limit the size of your capture.

When should it stop?  `-a` provides several methods for stopping the capture:

- duration: NUM - stop after NUM seconds
- filesize: NUM - stop after NUM KB
- files: NUM - stop after NUM files
- packets: NUM - Number of packets

Ring buffers: `-b` are like `-a` but you can also specify interval: NUM in
seconds.

(Include ASCIINEMA)

-B  : Size of the Kernel Buffer => Default is 2MB. (How can you verify this?)
-s (num) : limit each packet to NUM bytes to save on space.
