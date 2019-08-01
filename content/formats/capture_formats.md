---
title: "Capture Formats"
description: Background on how capture formats are used
date: 2019-07-30
author: Ross Jacobs

summary: ''
weight: 1
draft: false
---

## Capture Formats

The difference between pcap and pcapng is much like the difference between Python 2 and Python 3: The latter is the future, but a lot of existing infrastrucutre is built upon the former.

### Background

The internet is a testament to our ability to put aside our differences and agree to standards like Ethernet and TCP/IP. In that spirit of cooperation and interoperability, most network vendors have their own [proprietary capture formats](https://imgs.xkcd.com/comics/standards.png).

### Format Prevalence Today

The majority of captures that you will deal with today are `pcap` or `pcapng`. With the prevalence of linux, libpcap, tcpdump, and Wireshark in network devices, most vendors now support the pcap-type natively or produce a hexdump that [can be converted](/edit/text2pcap).

<div id="piechart" style="width: 900px; height: 500px;"></div>

_This pie chart is based on 6,734 captures from [PacketLife](http://packetlife.net/captures), [Wireshark Samples](https://wiki.wireshark.org/SampleCaptures), and [Wireshark Bugzilla](https://bugs.wireshark.org/bugzilla/) (2019). Gzipped versions of capture types are considered that capture type. Each other capture type constituted < 1%._

### Output Formats of Tshark & Friends

| Utilities                                                                                                    | Output formats                                 | Default |
| ----------------------------------                                                                           | ---------------------------------------------  | ------- |
| [tshark](/capture/tshark), [dumpcap](/capture/dumpcap), [editcap](/edit/editcap), [mergecap](/edit/mergecap) | `$cmd -F`<a href="#utils1"><sup>1</sup></a>    | pcapng  |
| [text2pcap](/edit/text2pcap), [randpkt](/generation/randpkt/)                                                | pcap, pcapng<a href="#utils2"><sup>2</sup></a> | pcap    |
| [reordercap](/edit/reordercap)                                                                               | same as input                                  | -       |

<sup id="utils1">1</sup> Specify a format with `$cmd -F <fmt>` and use `$cmd -F`
to see formats available to tshark and friends. 

<sup id="utils2">2</sup> pcapng only available with text2pcap when using the `-n` option

{{% notice note %}}
This is a summary of a [larger table](/capture/sources/pipe/#piping-with-shark).
{{% /notice %}}

## Available Save Formats

The available formats will depend on your installation of Wireshark. The full list of formats that your system supports can be found with `tshark -F`. A [sample listing](/capture/sources/sample_interfaces#sample-capture-file-types) is available if you're curious.

### Cannot Save to Some Formats

It is not possible to save to every one of the file formats specified by `tshark -F`.

For example, on my system, I get this error when I try to save to `btsnoop`:

```bash
bash$ tshark -r capture.pcapng -F btsnoop -w capture.btsnoop
  tshark: The capture file being read can't be written as a "btsnoop" file.
```

### Determining Available Save Formats

We can figure out which formats are supported by checking whether we get an error when saving to them.

```bash
#!/usr/bin/env bash
# find_save_fmts.sh
# Create a bash array of available formats
formats="$(tshark -F 2>&1 | awk '{print $1}' | grep -vE "tshark:")"
# Create a 100 packet pcapng file for testing
echo "INFO: Saving 100 packet capture"
tshark -w capture.pcapng -c 100 2>/dev/null
# Loop through formats and if we can convert to $format, then print it
echo -en "\n### Formats that can be saved ###\n"
for format in $formats; do
    tshark -r capture.pcap -F "$format" -w temp.file 2>/dev/null
    if [[ "$?" == "0" ]]; then
        echo -en "  $format\n"
    fi
done
# Remove temp files we created
rm capture.pcapng temp.file
```

On my Macbook, I get the following output:

```bash
bash$ bash find_save_fmts.sh
INFO: Saving 100 packet capture

### Formats that can be saved ###
  5views
  commview
  erf
  k12text
  lanalyzer
  modpcap
  netmon1
  netmon2
  nettl
  ngsniffer
  ngwsniffer_1_1
  ngwsniffer_2_0
  niobserver
  nokiapcap
  nsecpcap
  pcap
  pcapng
  rh6_1pcap
  snoop
  suse6_3pcap
  visual
```
