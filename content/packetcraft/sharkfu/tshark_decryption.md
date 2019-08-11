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

FIXME

## TLS 1.3 Decryption

TLS 1.3 is the next iteration after industry standard 1.2, with 1.3 adopted
by [most browsers](https://caniuse.com/#feat=tls1-3) at this point. TLS
decryption is currently broken ([bug
15537](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15537)) when
certificate message spans multiple records. In my testing, some javascript
files (and other small files) get decrypted, but no html or css files.

## WPA2 Decryption

This section is possible due to the amazing content at [mrncciew.com](https://mrncciew.com), by Rasika Nayanajith.
If you want to get better with 802.11, start your journey here.

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

We can now send the result to a colleague who will not need to know the SSID/PSK.

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
