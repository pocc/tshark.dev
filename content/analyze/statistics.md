---
title: "Statistics (-z)"
description: "Extract statistics and metrics from packet captures"
date: 2026-02-16
author: Claude Code

summary: '[manpage](https://www.wireshark.org/docs/man-pages/tshark.html)'
weight: 50
draft: false
---

{{% ai-warning %}}

The `-z` flag enables tshark to generate various statistics without requiring the Wireshark GUI. This is essential for automated analysis, CI/CD pipelines, and forensics workflows.

## Core Statistics

### IO Statistics (`-z io,stat`)

**Use Case:** Track packet rate, byte rate, and bandwidth over time intervals. Essential for automated network performance regression testing and establishing traffic baselines.

```bash
# Basic IO stats with 1-second intervals
tshark -r capture.pcap -q -z io,stat,1

# Calculate average, min, and max frame lengths
tshark -r capture.pcap -q -z io,stat,1,"AVG(frame.len)frame.len","MIN(frame.len)frame.len","MAX(frame.len)frame.len"

# Track HTTP traffic over 5-second intervals
tshark -r web.pcap -q -z io,stat,5,"COUNT(http.request)http.request"

# Monitor bandwidth usage
tshark -r capture.pcap -q -z io,stat,1,"SUM(frame.len)frame.len"
```

**Available Functions:** `COUNT()`, `SUM()`, `MIN()`, `MAX()`, `AVG()`

### Conversations (`-z conv,<protocol>`)

**Use Case:** Identify all unique conversations between endpoints. Critical for breach analysis, network mapping, and identifying lateral movement.

```bash
# TCP conversations sorted by bytes
tshark -r capture.pcap -q -z conv,tcp | sort -t'<' -k3 -nr | head -20

# All conversation types
tshark -r capture.pcap -q -z conv,ip      # IP conversations
tshark -r capture.pcap -q -z conv,udp     # UDP conversations
tshark -r capture.pcap -q -z conv,eth     # Ethernet conversations
```

**Available Protocols:** bluetooth, bpv7, dccp, eth, fc, fddi, ip, ipv6, ipx, jxta, ltp, mptcp, ncp, opensafety, rsvp, sctp, sll, tcp, tr, udp, usb, wlan, wpan, zbee_nwk

### Endpoints (`-z endpoints,<protocol>`)

**Use Case:** List all unique endpoints (top talkers). Essential for identifying data exfiltration targets and network inventory.

```bash
# Top TCP endpoints by packets
tshark -r capture.pcap -q -z endpoints,tcp

# Top IP addresses
tshark -r capture.pcap -q -z endpoints,ip | sort -k4 -nr | head -20
```

### Expert Info (`-z expert`)

**Use Case:** Extract Wireshark's expert analysis (warnings, errors, notes). Critical for automated anomaly detection and SIEM integration.

```bash
# All expert information
tshark -r capture.pcap -q -z expert

# Filter for errors and warnings only
tshark -r capture.pcap -q -z expert | grep -E "Error|Warn"

# Common issues to look for:
# - TCP Retransmissions
# - Malformed packets
# - Checksum errors
# - Connection resets
```

### Follow Streams (`-z follow,<protocol>,<format>,<stream_id>`)

**Use Case:** Extract stream contents in CLI for automated parsing, malware analysis, or log correlation.

```bash
# Follow TCP stream 0 in ASCII format
tshark -r capture.pcap -q -z follow,tcp,ascii,0 > stream0.txt

# Follow HTTP stream 5
tshark -r capture.pcap -q -z follow,http,ascii,5

# Available formats: ascii, ebcdic, hex, raw, yaml
# Available protocols: tcp, udp, tls, http, http2, quic, sip, dccp, usbcom, websocket
```

**Finding Stream IDs:**
```bash
# List all TCP streams
tshark -r capture.pcap -T fields -e tcp.stream | sort -u

# Filter specific conversation to find stream ID
tshark -r capture.pcap -Y "ip.addr==192.168.1.10 and tcp.port==443" -T fields -e tcp.stream | head -1
```

### Credentials Extraction (`-z credentials`)

**Use Case:** Extract cleartext credentials from captures. Essential for security audits, breach assessments, and compliance checks.

```bash
# Extract all cleartext credentials
tshark -r traffic.pcap -q -z credentials

# Common protocols with cleartext credentials:
# - FTP (USER/PASS)
# - HTTP Basic Authentication
# - Telnet
# - POP3
# - IMAP
# - SMTP AUTH
```

**Security Note:** This only extracts credentials from unencrypted protocols. For encrypted traffic, see [TLS Decryption](/packetcraft/add_context/tshark_decryption/).

### Flow Analysis (`-z flow,<protocol>`)

**Use Case:** Generate flow data for network diagrams and visualization tools like Graphviz.

```bash
# TCP flow graph
tshark -r capture.pcap -q -z flow,tcp | dot -Tpng > flow.png

# All protocols
tshark -r capture.pcap -q -z flow,any
```

**Available Protocols:** any, icmp, icmpv6, lbm_uim, tcp

## Protocol-Specific Statistics

### HTTP Statistics

```bash
# HTTP request/response statistics
tshark -r web.pcap -q -z http,stat

# HTTP request tree (methods, URIs)
tshark -r web.pcap -q -z http,tree

# HTTP server response tree
tshark -r web.pcap -q -z http_srv,tree

# HTTP request tree (clients)
tshark -r web.pcap -q -z http_req,tree
```

### DNS Statistics

```bash
# DNS query/response tree with counts
tshark -r dns.pcap -q -z dns,tree

# DNS query/response pairs
tshark -r dns.pcap -q -z dns_qr,tree
```

### RTP/VoIP Statistics

```bash
# RTP stream analysis (jitter, packet loss, MOS estimates)
tshark -r voip.pcap -q -z rtp,streams
```

### Protocol Hierarchy (`-z io,phs`)

**Use Case:** Generate protocol distribution tree. Useful for network inventory and identifying unknown traffic.

```bash
# Protocol hierarchy statistics
tshark -r capture.pcap -q -z io,phs
```

## Service Response Time (SRT) Statistics

Service Response Time measures the time between request and response for various protocols. Critical for performance analysis.

```bash
# Common SRT statistics
tshark -r capture.pcap -q -z smb,srt      # SMB file operations
tshark -r capture.pcap -q -z dcerpc,srt   # Windows RPC
tshark -r capture.pcap -q -z nfs,srt      # NFS file operations
tshark -r capture.pcap -q -z dns,srt      # DNS queries
tshark -r capture.pcap -q -z ldap,srt     # LDAP queries
tshark -r capture.pcap -q -z icmp,srt     # ICMP (ping)
```

**Available SRT Protocols:** afp, camel, dcerpc, diameter, dns, fc, gtp, gtpv2, h225_ras, icmp, icmpv6, kerberos, ldap, megaco, mgcp, ncp, nfs, pfcp, radius, rpc, scsi, sip, smb, smb2, snmp

## Automation Examples

### CI/CD Performance Baseline

```bash
#!/bin/bash
# Check if average response time exceeds threshold
avg_time=$(tshark -r test.pcap -q -z io,stat,0,"AVG(tcp.analysis.ack_rtt)tcp.analysis.ack_rtt" | \
           grep -oP '\d+\.\d+' | tail -1)

if (( $(echo "$avg_time > 0.5" | bc -l) )); then
    echo "FAIL: Average TCP RTT ${avg_time}s exceeds 0.5s threshold"
    exit 1
fi
echo "PASS: Average TCP RTT ${avg_time}s"
```

### Security Alert on Credential Exposure

```bash
#!/bin/bash
# Alert if cleartext credentials found
creds=$(tshark -r capture.pcap -q -z credentials 2>/dev/null | grep -v "^$")

if [ -n "$creds" ]; then
    echo "SECURITY ALERT: Cleartext credentials detected!"
    echo "$creds"
    # Send alert to SIEM...
fi
```

### Top Talkers Report

```bash
#!/bin/bash
# Generate daily top talkers report
tshark -r daily.pcap -q -z endpoints,ip | \
    awk 'NR>5 {print $1, $5, $6}' | \
    sort -k2 -nr | \
    head -20 > top_talkers_$(date +%Y%m%d).txt
```

## Complete Statistics List

For a complete list of all available statistics:

```bash
tshark -z help
```

Common categories:
- **Conversation/Endpoints:** Network flow analysis
- **SRT (Service Response Time):** Protocol performance
- **Protocol Trees:** HTTP, DNS, DHCP, etc.
- **Expert Info:** Automated packet analysis
- **Follow Streams:** Stream content extraction
- **Credentials:** Security auditing

## Further Reading

- [Wireshark Statistics Documentation](https://wiki.wireshark.org/Statistics)
- [Display Filters](/analyze/packet_hunting/packet_hunting/) for pre-filtering before statistics
- [Automation with Scripts](/packetcraft/scripting/)
