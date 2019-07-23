---
title: "Decrypt Data"
description: "Tshark Decryption for Kerberos, TLS, and 802.11"
date: 2019-04-08
author: Ross Jacobs

summary: 'Wireshark Decrypt: [802.11](https://wiki.wireshark.org/HowToDecrypt802.11) | [TLS](https://wiki.wireshark.org/TLS#TLS_Decryption) | [ESP](https://wiki.wireshark.org/ESP_Preferences) | [WireGuard](https://wiki.wireshark.org/WireGuard#Key_Log_Format) | [Kerberos](https://wiki.wireshark.org/Kerberos)<br><i class="fas fa-external-link-square-alt"></i> Articles Decrypt: [SNMP](https://robert.penz.name/1215/decoding-snmpv3-encrypted-traffic-in-wireshark/)'
weight: 70
draft: false
---

There are many protocols that can be decrypted in Wireshark:

## Kerberos

[Kerberos](https://wiki.wireshark.org/Kerberos) is a network authentication protocol that can be decrypted with Wireshark.
Use [this guide](https://docs.axway.com/bundle/APIGateway_762_IntegrationKerberos_allOS_en_HTML5/page/Content/KerberosIntegration/Wireshark/wireshark_tracing_for_spnego_kerberos_auth_between.htm)
to generate a keytab file. To use this keytab file for decryption:

`tshark -r /path/to/file -K /path/to/keytab`

## TLS 1.2 Decryption

It is possible to decrypt the data on the client side if SSL logging is
enabled. Chrome and firefox will check whether the $SSLKEYLOGFILE
environmental variable exists, and if it does, will send keys to the file.
Using tshark and firefox, we will be able to extract the html file. 

### 1. Add the SSLKEYLOGFILE environment variable

```bash
echo "export SSLKEYLOGFILE=/tmp/sslkey.log" >> ~/.bashrc
source ~/.bashrc
```

### 2. Capture traffic going to a website

Let's use
https://ss64.com as it uses TLSv1.2 and is [designed to be
lightweight](https://ss64.com/docs/site.html). They have an article on netcat, which seems apropos to use: `https://ss64.com/bash/nc.html`.

```bash
cd /tmp
url='https://ss64.com/bash/nc.html'
tshark -Q -w /tmp/myfile.pcapng & tpid=$!
firefox --headless --private $url & ffpid=$!
sleep 10 && kill -9 $tpid $ffpid
```

### 3. Export http objects to `obj/`

```bash
mkdir -p /tmp/obj
# Equivalent to Wireshark > File > Export Objects > HTTP
tshark --export-objects http,/tmp/obj -r /tmp/myfile.pcapng \
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

If all is well, your local version of nc's manpage looks exactly the same
as ss64's version.

### TLS 1.2 In Summary

<script id="asciicast-239566" src="https://asciinema.org/a/239566.js" async></script>

[_Wireshark Equivalent_](https://redflagsecurity.net/2019/03/10/decrypting-tls-wireshark/)

## TLS 1.3 Decryption

TLS 1.3 is the next iteration after industry standard 1.2, with 1.3 adopted
by [most browsers](https://caniuse.com/#feat=tls1-3) at this point. TLS
decryption is currently broken ([bug
15537](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15537)) when
certificate message spans multiple records. In my testing, some javascript
files (and other small files) get decrypted, but no html or css files.

## WPA2 Decryption

### 1. Get your capture

```bash
# Get a sample.pcap
pcap_url="https://mrncciew.files.wordpress.com/2014/08/wpa2-psk-final.zip"
curl $pcap_url | tar -xzv
```

### 2. Decrypt

Set the values of vars to whatever they are in your case.

```bash
infile="WPA2-PSK-Final.cap"
outfile="decrypted.pcap"
ssid='TEST1'
psk='Cisco123Cisco123'

tshark -r $infile -w $outfile \
       -o wlan.enable_decryption:TRUE \
       -o "uat:80211_keys:\"wpa-pwd\",\"${psk}:${ssid}\""
```

We can now send the result to a colleage who will not need to know the SSID/PSK.

### 3. Analyze

Let's pretend we care about TCP resets in the decrypted traffic. We can check
for it with `tcp.connection.rst` with output that should look something like:

```sh
bash-5.0$ tshark -r decrypted.pcap -Y "tcp.connection.rst"
  487  38.407227 192.168.140.1 → 192.168.140.100 TCP 112 2000 → 1091 [RST, ACK] 
    Seq=1 Ack=1 Win=0 Len=0
  626  41.687352 192.168.140.1 → 192.168.140.100 TCP 112 2000 → 1092 [RST, ACK] 
    Seq=1 Ack=1 Win=0 Len=0
  1226  52.758103 192.168.140.1 → 192.168.140.100 TCP 112 2000 → 1093 [RST, ACK
    Seq=1 Ack=1 Win=0 Len=0
```

### WPA2 In Summary

<script id="asciicast-239577" src="https://asciinema.org/a/239577.js" async></script>

[_Wireshark Equivalent_](https://mrncciew.com/2014/08/16/decrypt-wpa2-psk-using-wireshark/)

## WPA3 Decryption

WPA3 decryption support in Wireshark is
[still in development](https://seclists.org/wireshark/2019/Mar/79).
