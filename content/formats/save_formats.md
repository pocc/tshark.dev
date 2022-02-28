---
title: "Available Save Formats"
description: Bytes in each capture format that are not packets
date: 2019-08-01
author: Ross Jacobs

summary: ''
weight: 85
draft: false
---

## Available Save Formats

The available formats will depend on your installation of Wireshark. The full list of formats that your system supports can be found with `tshark -F`. A [sample listing](/capture/sources/sample_interfaces#sample-capture-file-types) is available if you're curious. Note that this is different from the list of captures that Wireshark can read, which is much larger.

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

To take a look at what the headers of these filetypes look like, check out [Sample Headers](/formats/sample_capture_headers/).
