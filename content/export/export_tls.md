---
title: "TLS Encrypted"
description: "Export files from a capture encrypted with TLS 1.2/1.3"
date: 2019-07-04
author: Ross Jacobs

summary: '[Wireshark Equivalent](https://redflagsecurity.net/2019/03/10/decrypting-tls-wireshark/)'
weight: 21
draft: false
---

{{%notice note%}}
You must have [tshark 2.4.0](https://github.com/wireshark/wireshark/commit/20c57cb298e4f3b7ac66a22fb7477e4cf424a11b) or higher to use the `--export-files` flag.
You must have [tshark 2.6.3](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=12779) or higher to decrypt TLS1.3.
{{%/notice%}}

## About

It is possible to decrypt the data on the client side if SSL logging is
enabled. Chrome and firefox will check whether the $SSLKEYLOGFILE
environmental variable exists, and if it does, will send keys to the file.
Using tshark and firefox, we will be able to extract the html file.

{{% notice note %}}
[ss64.com](https://ss64.com) uses TLS1.2, but the process is the same for TLS1.3.
{{% /notice %}}

### Example: TLSv2 and ss64.com

### 1. Add the SSLKEYLOGFILE environment variable

#### Linux/Macos

If you only want to use the sslkeylogfile in this session, use export.

```bash 
export SSLKEYLOGFILE=/tmp/sslkey.log
```

To use the same file permanently (in bash), you can add it to your ~/.bashrc.

```bash
echo "export SSLKEYLOGFILE=/tmp/sslkey.log" >> ~/.bashrc
source ~/.bashrc
```

**Verification**

Check that the variable is available.

```bash
bash$ echo $SSLKEYLOGFILE
/tmp/sslkey.log
```

#### Windows

To set the variable for your system, use [SetX](https://ss64.com/nt/setx.html).

```bash
# Sets the HKCU\Environment User Environment variable
PS C:\Users\rj\Desktop> SetX SSLKEYLOGFILE "$(get-location)\ssl.log"

SUCCESS: Specified value was saved.
```

**Verification**

SetX does not apply to the current session.
To verify, check `SSLKEYLOGFILE` in a new powershell window:

```powershell
PS C:\Users\rj\Desktop> Get-ChildItem ENV: | findstr SSLKEYLOGFILE
SSLKEYLOGFILE                  C:\Users\rj\desktop\ssl.log
```

### 2. Capture traffic going to a website

Let's use [ss64.com](https://ss64.com) as it is [designed to be
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

<img src="/images/exported_file_nc_html.cmp.png" alt="Exported file in firefox" width=61%>

### 5. Cleaning up

Anyone that has your network traffic AND your SSLKEYLOGFILE can decrypt it.
For the security conscious, unset this variable once you are done.

#### Linux/Macos

```sh
unset $SSLKEYLOGFILE
```

#### Windows

{{%notice warning%}}
Be careful when you work with the registry, as it is easy to shoot yourself in the foot when making a change.
{{%/notice%}}

Assuming you set without the `/M` flag for the User Environment:

```
REG delete HKCU\Environment /F /V SSLKEYLOGFILE
```

### Asciicast of This Example

<script id="asciicast-239566" src="https://asciinema.org/a/239566.js" async></script>

## Further Reading

* 2018-12-07, F5, [Decrypting SSL traffic with the SSLKEYLOGFILE environment variable](https://support.f5.com/csp/article/K50557518)
* 2013-08-07, Steven Iveson, [Using Wireshark to Decode SSL/TLS Packets](https://packetpushers.net/using-wireshark-to-decode-ssltls-packets/)