---
title: "Export Files"
description: "Export 5 file types from captures"
date: 2019-07-04
author: Ross Jacobs

pre: <b><i class="fas fa-file-export"></i> </b>
weight: 21
draft: false
---

## Export Functionality

Some packet captures contain files in transit. Wireshark can extract several of these types. As of v3.0.0,
Wireshark can extract these protocols:

- **dicom**: medical image
- **http**: web document
- **imf**: email contents
- **smb**: Windows network share file
- **tftp**: Unsecured file

To do this in tshark, use `tshark -r ${file} --export-object ${protocol},${path}` (WS > File > Export Objects >). If you would like to extract files from a TLS-encrypted capture, you will need to first [decrypt it]().

## Example: Capture HTTP object in transit

To get a pcap containing a file by starting a capture and then opening a webpage.
In this example, we will be using neverssl.com to avoid the need to decrypt.

### 1. Setup environment

These variables are arbitrary and included for readability.

```bash
dest_dir='/tmp'
cd $dest_dir
pcap_file="$dest_dir/neverssl.pcapng"
html_file="$dest_dir/neverssl.html"
website='http://neverssl.com'
protocol='http'
```

### 2. Start capture and curl website

{{% notice note %}}
If you are not able to extract the files on a slow connection, increase the sleep timers so that $download_program has enough time.
{{% /notice %}}

<i class="fas fa-download"></i>**Curl** is used because it sends the site's HTML to stdout natively.
This is used later on to verify the extracted file.

```bash
tshark -Q -w $pcap_file & tspid=$!
sleep 1 # Wait for tshark to warm up
curl $website > $html_file
kill -9 $tspid
```

<i class="fab fa-firefox"></i> **firefox** can be useful instead if you want to see all of the available files. For some websites, this
will include JSON, scripts, media, and other files. For this website, the initial html uses javascript to redirect to the final
destination. Firefox will capture this 2nd html file and it will be called `online`.

{{% notice warning %}}
On macOS, you may need to first kill other firefox instances with `killall firefox` to use headless firefox.
{{% /notice %}}

```bash
tshark -Q -w $pcap_file & tspid=$!
sleep 1 # Wait for tshark to warm up
firefox --headless $website & ffpid=$!
sleep 2 # Wait for firefox to warm up
kill -9 $ffpid $tspid
```

### Extract HTML file

To extract a file, read in a file, use the `--export-objects` flag and specify the protocol and directory to save the files.
Without -Q, tshark will read packets and send to stdout even though it is exporting objects.

```bash
tshark -Q -r $pcap_file --export-objects $protocol,$dest_dir
```

Note tha `--export-objects` can be shortened up to `--ex` (i.e. `--export-object` is also valid).

### Verify results (curl only)

If you used <i class="fas fa-download"></i>**Curl**  to download the file, you will now have at least two files: `neverssl.html` and `%2f` extracted from tshark.
If the extraction was successful, `diff neverssl.html '%2f'` will return nothing.

## Further Reading

- [Official Docs](https://www.wireshark.org/docs/wsug_html_chunked/ChIOExportSection.html#ChIOExportObjectsDialog)
- [GUI: Exporting HTTP](http://securabit.com/2013/04/06/wireshark-export-http-objects/)
- [GUI: Exporting SMB](https://www.networkdatapedia.com/single-post/2019/02/28/Wireshark---Export-SMB2-Objects)
- [GUI: Exporting FTP](https://shankaraman.wordpress.com/tag/how-to-extract-ftp-files-from-wireshark-packet/)
- [Code: export_object.c](https://github.com/wireshark/wireshark/blob/master/epan/export_object.c)

#### Table of Contents

{{% children description="true" depth="9" %}}
