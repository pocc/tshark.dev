---
title: "PDU Export (-U)"
description: "Export Protocol Data Units for external processing"
date: 2026-02-16
author: Claude Code

summary: '[manpage](https://www.wireshark.org/docs/man-pages/tshark.html)'
weight: 40
draft: false
---

{{% ai-warning %}}

The `-U <tap_name>` flag exports Protocol Data Units (PDUs) from a capture for processing by external tools. This enables chaining tshark with protocol-specific analyzers, custom parsers, or machine learning models.

## What are PDUs?

PDUs (Protocol Data Units) are the extracted payloads of specific protocols, stripped of lower-layer headers. Exporting PDUs allows you to:

- Feed extracted protocols into specialized parsers
- Build custom analysis pipelines
- Train ML models on protocol-specific data
- Integrate tshark with non-Wireshark tools

## Basic Usage

```bash
# Export HTTP PDUs to a file
tshark -r capture.pcap -q -U http > http_pdus.bin

# Export SMB PDUs
tshark -r fileshare.pcap -q -U smb > smb_pdus.bin

# Export DNS PDUs
tshark -r dns.pcap -q -U dns > dns_pdus.bin
```

## Common Use Cases

### 1. HTTP Content Extraction for Analysis

Extract HTTP request/response bodies for content analysis or malware detection:

```bash
# Export all HTTP PDUs
tshark -r web_traffic.pcap -U http -w http_only.pcap

# Then extract objects from the PDU-only capture
tshark -r http_only.pcap --export-objects http,extracted_files/
```

### 2. SMB File Transfer Analysis

Extract SMB protocol data for file access auditing:

```bash
# Export SMB PDUs for analysis
tshark -r fileshare.pcap -U smb > smb_data.bin

# Count unique files accessed
tshark -r fileshare.pcap -U smb -T fields -e smb.file | sort -u | wc -l
```

### 3. Custom Protocol Parser Integration

Feed extracted protocols into custom parsers:

```bash
# Extract SIP calls for VoIP analysis tool
tshark -r voip.pcap -U sip | ./custom_sip_analyzer

# Extract MODBUS data for ICS analysis
tshark -r industrial.pcap -U modbus | python modbus_analyzer.py
```

### 4. Machine Learning Pipeline

Extract protocol data for ML model training:

```bash
# Extract TLS handshakes for fingerprinting
tshark -r traffic.pcap -U tls -T json | \
    jq '.[] | select(._source.layers.tls.handshake)' | \
    python train_tls_classifier.py
```

## Available Taps

To see all available tap names:

```bash
tshark -G protocols | grep -i "<protocol_name>"
```

Common taps include:
- **http** - HTTP requests/responses
- **http2** - HTTP/2 streams
- **tls** - TLS/SSL sessions
- **dns** - DNS queries/responses
- **smb** - SMB/CIFS file operations
- **sip** - SIP VoIP signaling
- **rtp** - RTP media streams
- **modbus** - MODBUS industrial protocol
- **opcua** - OPC UA industrial protocol

## Combining with Display Filters

Filter before exporting PDUs to focus on specific traffic:

```bash
# Export only HTTP POST requests
tshark -r upload.pcap -Y "http.request.method==POST" -U http > posts.bin

# Export TLS from specific IP
tshark -r capture.pcap -Y "ip.src==192.168.1.100" -U tls > client_tls.bin

# Export DNS queries to specific domain
tshark -r dns.pcap -Y 'dns.qry.name contains "example.com"' -U dns > example_dns.bin
```

## Output Formats

PDUs can be exported in different formats for various use cases:

### Binary Format (Default)

Raw protocol data, useful for binary analysis:

```bash
tshark -r capture.pcap -U http > http_raw.bin
```

### PCAP Format

Export as a new capture file with only the specified protocol:

```bash
tshark -r capture.pcap -U http -w http_only.pcap
```

### Text Format

Combine with text output for human-readable exports:

```bash
tshark -r capture.pcap -U http -V > http_verbose.txt
```

## Advanced Examples

### Extract and Decrypt TLS Content

Combine PDU export with TLS decryption:

```bash
# Decrypt TLS and export application data
tshark -r encrypted.pcap \
    -o "tls.keylog_file:$SSLKEYLOGFILE" \
    -U tls -w decrypted_pdus.pcap
```

### Chain Multiple Analysis Steps

Build complex analysis pipelines:

```bash
#!/bin/bash
# Multi-stage HTTP analysis pipeline

# 1. Extract HTTP PDUs
tshark -r capture.pcap -U http -w http.pcap

# 2. Extract POST request bodies
tshark -r http.pcap -Y "http.request.method==POST" \
    -T fields -e http.file_data | \
    xxd -r -p > post_data.bin

# 3. Analyze POST data
file post_data.bin
strings post_data.bin | grep -i password
```

### IoT/ICS Protocol Extraction

Extract industrial protocols for specialized analysis:

```bash
# Extract MODBUS PDUs from ICS network
tshark -r scada.pcap -U modbus > modbus_commands.bin

# Extract OPC UA for industrial monitoring
tshark -r factory.pcap -U opcua -T json | \
    jq '.[] | ._source.layers.opcua' > opcua_data.json
```

## Automation in CI/CD

Integrate PDU export in automated testing:

```bash
#!/bin/bash
# Test that API responses match expected schema

# Extract HTTP responses
tshark -r api_test.pcap -Y "http.response" -U http -w responses.pcap

# Extract JSON bodies
tshark -r responses.pcap -T fields -e http.file_data | \
    xxd -r -p | \
    while read -r json; do
        echo "$json" | jq empty || {
            echo "FAIL: Invalid JSON in response"
            exit 1
        }
    done

echo "PASS: All responses contain valid JSON"
```

## Comparison with --export-objects

| Feature | `-U` (PDU Export) | `--export-objects` |
|---------|-------------------|---------------------|
| Purpose | Extract raw protocol data | Extract complete files |
| Output | Binary PDU stream | Individual files |
| Use Case | Custom parsing, ML | File recovery |
| Processing | Requires external tools | Ready-to-use files |

Use `-U` when you need raw protocol data for custom analysis.
Use `--export-objects` when you need complete files (HTTP downloads, SMB transfers, etc.).

See also: [Export Objects](/export/export_regular/)

## Troubleshooting

### Empty Output

If no PDUs are exported, check:

1. **Protocol exists in capture:**
   ```bash
   tshark -r capture.pcap -q -z io,phs | grep -i http
   ```

2. **Correct tap name:**
   ```bash
   tshark -G protocols | grep -i http
   ```

3. **Display filter not too restrictive:**
   ```bash
   # Remove filter temporarily to test
   tshark -r capture.pcap -U http > test.bin
   ls -lh test.bin
   ```

### Large Output Files

PDU exports can be large. Optimize with:

```bash
# Filter first, then export
tshark -r huge.pcap -Y "http and tcp.port==80" -U http > http_port80.bin

# Export to compressed format
tshark -r capture.pcap -U http | gzip > http_pdus.bin.gz
```

## Further Reading

- [Statistics (-z)](/analyze/statistics/) for protocol analysis without export
- [Export Objects](/export/export_regular/) for file extraction
- [Display Filters](/analyze/packet_hunting/packet_hunting/) for pre-filtering
- [Scripting](/packetcraft/scripting/) for automation examples
