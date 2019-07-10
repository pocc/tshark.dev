---
title: "reordercap"
description: "I am still making order out of chaos by reinvention. — John le Carre"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs

summary: '[manpage](https://www.wireshark.org/docs/man-pages/reordercap.html) | [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsreordercap.html) | [code](https://github.com/wireshark/wireshark/blob/master/reordercap.c)'
weight: 20
draft: false
---

## Why reorder packets by timestamp

* You are passing captures into utils like mergecap [which require it](/edit/mergecap#input-captures-should-be-correctly-ordered)
* The lack of packet order is making it hard for you to analyze a pcap.

### Caveats

#### Cannot use same input & output file

reordercap will not error with `reordercap $file $file`, but when you read the file, the packets will be in order but now malformed.

#### Cannot read from a pipe

```bash
bash-5.0$ mkfifo myfifo
bash-5.0$ tshark -r out-of-order.pcap -w myfifo & reordercap myfifo out-of-order.pcap
[1] 3941
reordercap: The file "myfifo" is a pipe or FIFO; reordercap can't read pipe or FIFO files in two-pass mode.
```

### Examples

For these examples, using [this cloudshark file](https://www.cloudshark.org/captures/6ffcd7e10730)

* Reorder an out of order pcap

        $ reordercap http-out-of-order.pcapng inorder.pcapng
        10 frames, 1 out of order

* Try to reorder it again with `-n`

        $ reordercap -n inorder.pcapng inorder2.pcapng
        10 frames, 0 out of order
        Not writing output file because input file is already in order.

* To reorder a file in place, use a temp file

    ```bash
    # Using a temp file
    bash-5.0$ reordercap out-of-order.pcap temp
    bash-5.0$ mv temp out-of-order.pcap
    ```

### Reordercap Resources

* [manpage](https://www.wireshark.org/docs/man-pages/reordercap.html)
* [Wireshark Docs](https://www.wireshark.org/docs/wsug_html_chunked/AppToolsreordercap.html)
* [code](https://github.com/wireshark/wireshark/blob/master/reordercap.c)
