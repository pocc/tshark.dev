---
title: "TLS1.2 Encrypted"
description: "Export files from a capture encrypted with TLS 1.2"
date: 2019-07-04
author: Ross Jacobs

summary: '[Wireshark Equivalent](https://redflagsecurity.net/2019/03/10/decrypting-tls-wireshark/)'
weight: 21
draft: false
---

## About

It is possible to decrypt the data on the client side if SSL logging is
enabled. Chrome and firefox will check whether the $SSLKEYLOGFILE
environmental variable exists, and if it does, will send keys to the file.
Using tshark and firefox, we will be able to extract the html file.

{{% notice info %}}
It is not [currently possible](/packetcraft/add_context/tshark_decryption/#tls-1-3-decryption) to decrypt with TLS 1.3 with Wireshark.
{{% /notice %}}

### Example: TLSv2 and ss64.com

### 1. Add the SSLKEYLOGFILE environment variable

```bash
echo "export SSLKEYLOGFILE=/tmp/sslkey.log" >> ~/.bashrc
source ~/.bashrc
```

### 2. Capture traffic going to a website

Let's use [ss64.com](https://ss64.com) as it uses TLSv1.2 and is [designed to be
lightweight](https://ss64.com/docs/site.html). They have an article on netcat (nc), which seems apropos to use: `https://ss64.com/bash/nc.html`.
In this example, we will be capturing for 10 seconds with `tshark` while saving the HTML with `firefox`.

We are using firefox because captures containing its usage have predictable file names. `curl` and `wget` by comparison have captures that contain
a multitude of files like "object1234" and "object2345" when exported as files from tshark.

```bash
cd /tmp
url='https://ss64.com/bash/nc.html'
# -a to wait 10 sec, -Q for suppress output
tshark -Q -a duration:5 -w /tmp/myfile.pcapng &
# Wait 5 seconds for firefox to access content and then kill
firefox --headless --private $url & ffpid=$!
sleep 5 && kill -9 $ffpid
```

### 3. Export http objects to `obj/`

```bash
mkdir -p /tmp/obj
# Equivalent to Wireshark > File > Export Objects > HTTP
tshark -Q --export-objects http,/tmp/obj -r /tmp/myfile.pcapng \
  -o tls.keylog_file:$SSLKEYLOGFILE
```

### 4. Verify that HTML extraction was successful

The two relevant files that we receive from ss64.com are `nc.html` and
`main.css`. This HTML file references its css file as "../main.css", so
create a symbolic link for verification purposes and then open it.

```bash
ln -s obj/main.css main.css
firefox --browser obj/nc.html
```

If all is well, your local version of nc's manpage looks like this:

<img src="https://dl.dropboxusercontent.com/s/kitibo0u8x42s0m/exported_file_nc_html.cmp.png" alt="Exported file in firefox" width=61%>

### Asciicast of This Example

<script id="asciicast-239566" src="https://asciinema.org/a/239566.js" async></script>
