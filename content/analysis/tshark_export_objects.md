---
title: "Tshark Export Objects"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Exporting files from packet captures"
tags:
  - networking
  - tshark
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

<!-- draft until
* [ ] Type existing written version 
* [ ] Come back after Apr 5 and review
* [ ] Discuss 3 or 4 files
-->

# --export-object

## Available protocols

- **dicom**: medical image
- **http**: web document
- **imf**: email contents
- **smb**: Windows network share file
- **tftp**: Unsecured file

When you have a capture containing a transferred file, sometimes you only care
about extracting the file. To do this in tshark, use `tshark -r ${file} --export-object ${protocol},${path}`

The supported protocols are shown above. As an example, let's take a packet
capture on an http website. Looking at the top 50 in the US, espn.com is the
only website that does not use http (and thus is great for extracting files
transferred as part of website load). We will also be using firefox because
Chrome encapsulates traffic in GQUIC, so no http export. If you would like to
extract files from a TLS-encrypted capture, make sure to [decrypt it]() so
that tshark can export the http objects.

```bash
# Define these for yourself
dest_dir="/tmp/exports"
pcap_name="`pwd`/espn.pcapng"
protocol="http"

# Export files from generated espn http traffic.
mkdir -p $dest_dir
tshark -Q -w $pcap_name & tspid=$!
firefox --headless espn.com & ffpid=$!
sleep 10 && kill -9 $ffpid $tspid
tshark -r $pcap_name --export-object $protocol,$dest_dir
```

Here we create a destination folder if it doesn't exist. Here, `-Q` is used
so that tshark doesn't print to stdout, interfering with further typing.
Headless firefox can grab the files we care about (using wget/curl will not
get all of the same files). Ten seconds should be sufficient to download all
files before killing the processes.

<discuss 3 or 4 files here. Include screenshot of firefox loading the same files using developer tools. While its cool to look at he trasnferred files in the abstract, we can also watch all of them download them in realtime with developer tools. This will also show us ALL of the files downloaded, including ones we may have missed with firefox headless. As we can see, <X>, <Y>, and <Z> files are the same, but we're missing files A, B, & C.>
