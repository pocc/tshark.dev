---
title: "Performance Optimization"
description: "Optimize tshark for processing large captures"
date: 2026-02-16
author: Claude Code

summary: '[manpage](https://www.wireshark.org/docs/man-pages/tshark.html)'
weight: 60
draft: false
---

{{% ai-warning %}}

Processing multi-GB captures requires optimization to avoid excessive memory usage and slow performance. This guide covers techniques for speeding up tshark analysis by 3-10x.

## Protocol Dissector Control

Disabling unnecessary protocols significantly reduces processing time for large captures.

### Disable All Protocols (`--disable-all-protocols`)

Start with a blank slate and only enable what you need:

```bash
# Only analyze IP and TCP layers
tshark --disable-all-protocols \
       --enable-protocol ip \
       --enable-protocol tcp \
       -r huge.pcap

# Only HTTP traffic (enables required lower layers automatically)
tshark --disable-all-protocols \
       --enable-protocol frame \
       --enable-protocol eth \
       --enable-protocol ip \
       --enable-protocol tcp \
       --enable-protocol http \
       -r capture.pcap -Y http
```

**Performance gain:** 3-5x faster for large captures with many protocols.

### Enable/Disable Specific Protocols

Fine-tune dissection:

```bash
# Disable expensive protocols you don't need
tshark --disable-protocol smb \
       --disable-protocol dcerpc \
       --disable-protocol rpc \
       -r capture.pcap

# Enable only required protocols
tshark --enable-protocol tls \
       --enable-protocol http2 \
       -r capture.pcap -Y "tls or http2"
```

**Finding protocol names:**

```bash
# List all available protocols
tshark -G protocols | less

# Search for specific protocol
tshark -G protocols | grep -i "modbus"
```

### Only Protocols Flag (`--only-protocols <list>`)

Shorthand for disabling all and enabling specific ones:

```bash
# Only process specific protocols (comma-separated)
tshark --only-protocols ip,tcp,http -r capture.pcap

# Combined with filters for maximum speed
tshark --only-protocols ip,tcp,dns \
       -r huge.pcap \
       -Y "dns.qry.name contains 'example.com'"
```

## Session Auto Reset (`-M <packet_count>`)

Prevents memory bloat when processing very long captures by resetting dissector state periodically.

```bash
# Reset every 100,000 packets
tshark -r 100gb.pcap -M 100000 -w processed.pcap

# Useful for multi-hour captures
tshark -i eth0 -M 50000 -w capture_%Y%m%d_%H%M%S.pcap -b duration:3600
```

**Use cases:**
- Captures > 10 million packets
- Long-running live captures (hours/days)
- Memory-constrained environments

**Trade-off:** Some stateful protocol analysis may be lost at reset boundaries (e.g., TCP stream reassembly).

## Disable TCP/IP Analysis Features

TCP analysis adds overhead. Disable when not needed:

```bash
# Disable TCP sequence number analysis
tshark -r capture.pcap \
       -o "tcp.analyze_sequence_numbers:false" \
       -o "tcp.calculate_timestamps:false" \
       -o "tcp.track_bytes_in_flight:false" \
       -Y "tcp.port==80"

# Disable fragmentation reassembly
tshark -r capture.pcap \
       -o "ip.defragment:false" \
       -o "ipv6.defragment:false" \
       -o "tcp.reassemble_out_of_order:false"
```

**Performance gain:** 20-40% faster for TCP-heavy captures.

## Checksum Validation

Disable checksum validation unless specifically needed:

```bash
# Disable all checksum validation
tshark -r capture.pcap \
       -o "tcp.check_checksum:false" \
       -o "udp.check_checksum:false" \
       -o "ip.check_checksum:false"
```

**When to disable:**
- Captures from virtual interfaces (checksums often offloaded)
- Mirrored/SPAN traffic (checksums may be invalid)
- Large captures where checksum errors aren't the focus

## Filter Early

Apply filters as early as possible in the processing pipeline.

### Capture Filters (`-f`)

Most efficient - filters at capture time:

```bash
# Only capture HTTP traffic (BPF filter)
tshark -i eth0 -f "tcp port 80 or tcp port 443" -w web_only.pcap
```

### Read Filters (`-R` with `-2`)

Filters during first pass of two-pass analysis:

```bash
# Two-pass analysis with read filter
tshark -r huge.pcap -2 -R "tcp.port==443" -Y "tls.handshake.type==1"
```

**Note:** `-R` requires `-2` (two-pass mode) and filters before full dissection.

### Display Filters (`-Y`)

Filters after dissection (least efficient but most flexible):

```bash
# Standard display filter
tshark -r capture.pcap -Y "http.request.method==POST"
```

**Filter order of efficiency:**
1. Capture filter (`-f`) - fastest, least flexible
2. Read filter (`-R -2`) - medium speed, medium flexibility
3. Display filter (`-Y`) - slowest, most flexible

## Output Format Selection

Choose the minimal output format for your needs:

```bash
# Fields-only (faster than full packet details)
tshark -r capture.pcap -T fields -e ip.src -e ip.dst -e tcp.port

# Quiet mode with statistics (no packet printing)
tshark -r capture.pcap -q -z io,stat,1

# JSON (slower due to serialization)
tshark -r capture.pcap -T json  # Slower
tshark -r capture.pcap -T ek    # Slightly faster (Elasticsearch format)
```

**Speed ranking (fastest to slowest):**
1. Quiet mode (`-q`)
2. Fields (`-T fields`)
3. Text (`-T text`, default)
4. PDML/PSML (`-T pdml/psml`)
5. JSON/EK (`-T json/ek`)

## JSON/EK Output Optimization

Reduce JSON output size with protocol filters.

### Protocol Layer Filter (`-j`)

Include only specific protocol layers (does not expand children):

```bash
# Only include IP and TCP fields in JSON
tshark -r capture.pcap -T json -j "ip tcp"

# Only top-level HTTP fields
tshark -r web.pcap -T json -j "http"
```

### Top-Level Protocol Filter (`-J`)

Include protocol layer and all children:

```bash
# Include HTTP and all its child fields
tshark -r web.pcap -T json -J "http tcp"

# Reduce output size for ELK ingestion
tshark -r huge.pcap -T ek -J "ip tcp dns" | \
    curl -XPOST "localhost:9200/_bulk" -H 'Content-Type: application/json' --data-binary @-
```

**Performance gain:** 50-70% reduction in JSON output size.

### No Duplicate Keys (`--no-duplicate-keys`)

Merge duplicate JSON keys into arrays:

```bash
# Clean JSON for strict parsers
tshark -r capture.pcap -T json --no-duplicate-keys > clean.json
```

## Buffer Size Tuning

Increase buffer size for high-speed captures:

```bash
# Increase kernel buffer to 256MB (default: 2MB)
tshark -i eth0 -B 256 -w capture.pcap

# Useful for 10Gbps+ links or high packet rates
```

## Parallel Processing

Split large captures for parallel processing:

```bash
#!/bin/bash
# Split capture into chunks and process in parallel

# Split by packets
editcap -c 100000 huge.pcap chunk.pcap

# Process chunks in parallel
for file in chunk_*.pcap; do
    tshark -r "$file" -Y "http" -T fields -e http.host > "${file%.pcap}.txt" &
done
wait

# Combine results
cat chunk_*.txt > all_hosts.txt
```

## Pre-filtering with editcap

Filter before analysis with editcap:

```bash
# Extract only specific packets
editcap -F pcap -Y "tcp.port==443" huge.pcap filtered.pcap

# Then analyze smaller file
tshark -r filtered.pcap -T json
```

## Heuristic Dissector Control

Disable heuristic dissectors that may incorrectly trigger:

```bash
# Disable specific heuristic dissector
tshark --disable-heuristic usb.heuristic -r capture.pcap

# List available heuristic dissectors
tshark -G heuristic-decodes
```

## Complete Optimization Example

Multi-GB capture optimization pipeline:

```bash
#!/bin/bash
# Optimized processing for 100GB+ captures

CAPTURE="huge_capture.pcap"
OUTPUT="results.json"

tshark -r "$CAPTURE" \
    --disable-all-protocols \
    --enable-protocol frame \
    --enable-protocol eth \
    --enable-protocol ip \
    --enable-protocol tcp \
    --enable-protocol http \
    -M 100000 \
    -o "tcp.analyze_sequence_numbers:false" \
    -o "tcp.calculate_timestamps:false" \
    -o "tcp.check_checksum:false" \
    -o "ip.check_checksum:false" \
    -o "ip.defragment:false" \
    -Y "http.request" \
    -T json \
    -J "http" \
    --no-duplicate-keys \
    > "$OUTPUT"
```

**Expected speedup:** 5-10x faster than default settings.

## Benchmarking

Measure performance improvements:

```bash
#!/bin/bash
# Compare performance

time tshark -r capture.pcap -Y http -q
# vs
time tshark --disable-all-protocols \
            --enable-protocol frame \
            --enable-protocol eth \
            --enable-protocol ip \
            --enable-protocol tcp \
            --enable-protocol http \
            -o "tcp.check_checksum:false" \
            -r capture.pcap -Y http -q
```

## Memory Optimization

Monitor and limit memory usage:

```bash
# Monitor memory during processing
/usr/bin/time -v tshark -r huge.pcap -q -z io,stat,1

# Process in chunks if memory-limited
editcap -c 1000000 huge.pcap chunk.pcap
for f in chunk_*.pcap; do
    tshark -r "$f" -q -z io,stat,1
done
```

## Hardware Considerations

**CPU:**
- More cores help with parallel processing
- Single-threaded performance matters for sequential processing

**Memory:**
- Minimum: 2x capture file size
- Recommended: 4x capture file size for reassembly

**Disk:**
- SSD significantly faster for reading large captures
- Network storage (NFS) adds latency

## Performance Checklist

Quick reference for optimizing tshark:

- [ ] Use `--disable-all-protocols` + `--enable-protocol` for specific protocols
- [ ] Disable TCP analysis: `-o "tcp.analyze_sequence_numbers:false"`
- [ ] Disable checksums: `-o "tcp.check_checksum:false"`
- [ ] Use `-M` for captures > 10M packets
- [ ] Apply `-Y` filters to reduce processing
- [ ] Use `-T fields` instead of `-T json` when possible
- [ ] Use `-j`/`-J` to reduce JSON output size
- [ ] Increase buffer size `-B` for live captures
- [ ] Split large captures with `editcap` for parallel processing
- [ ] Use `-q` (quiet mode) for statistics-only analysis

## Further Reading

- [Statistics](/analyze/statistics/) for efficient analysis without full dissection
- [Preferences](/packetcraft/arcana/profiles/) for persistent optimization settings
- [Reports (-G)](/packetcraft/arcana/reports/) for discovering protocols and preferences
