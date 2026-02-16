---
title: "Output Options"
description: "Advanced output formatting and display options"
date: 2026-02-16
author: Claude Code

summary: '[manpage](https://www.wireshark.org/docs/man-pages/tshark.html)'
weight: 15
draft: false
---

{{% ai-warning %}}

## Hexdump Options (`--hexdump`)

Fine-grained control over hex and ASCII dump output for binary protocol analysis.

### Basic Hex Dump (`-x`)

```bash
# Basic hex dump (all data sources with ASCII)
tshark -r capture.pcap -x -c 1
```

### Advanced Hexdump (`--hexdump`)

```bash
# Show only frame data source
tshark -r capture.pcap --hexdump frames -c 1

# No ASCII output (hex only)
tshark -r capture.pcap --hexdump all,noascii -c 1

# Delimit ASCII with | characters
tshark -r capture.pcap --hexdump all,delimit -c 1

# Frames only, no ASCII (binary protocol analysis)
tshark -r binary.pcap --hexdump frames,noascii -c 1
```

**Available options:**

| Option | Description |
|--------|-------------|
| `all` | All data sources (default) |
| `frames` | Frame data only |
| `ascii` | Include ASCII (default) |
| `noascii` | Exclude ASCII |
| `delimit` | Delimit ASCII with `\|` |

**Binary protocol reverse engineering:**

```bash
# Extract hex for unknown protocol
tshark -r proprietary.pcap \
    -Y "tcp.port==9999" \
    --hexdump frames,noascii > protocol_hex.txt
```

## Timestamp Formats (`-t`)

Control timestamp display format:

```bash
# Relative to first packet (default)
tshark -r capture.pcap -t r

# Absolute with date
tshark -r capture.pcap -t a

# Absolute with date and year
tshark -r capture.pcap -t ad

# Epoch time (seconds since 1970-01-01)
tshark -r capture.pcap -t e

# Unix time (seconds.microseconds)
tshark -r capture.pcap -t u

# Delta time (since previous packet)
tshark -r capture.pcap -t d
```

**All timestamp formats:**

| Format | Description | Example Output |
|--------|-------------|----------------|
| `r` | Relative to first (default) | `0.123456` |
| `a` | Absolute with date | `12:34:56.123456` |
| `ad` | Absolute with date and year | `2024-01-15 12:34:56.123456` |
| `adoy` | Absolute with day of year | `2024/015 12:34:56.123456` |
| `d` | Delta from previous | `0.001234` |
| `dd` | Delta with date | `0.001234` |
| `e` | Epoch time | `1705322096.123456` |
| `u` | Unix timestamp | `1705322096.123456` |
| `ud` | Unix with date | `2024-01-15 1705322096.123456` |
| `udoy` | Unix with day of year | `2024/015 1705322096.123456` |

**Precision control:**

```bash
# Microseconds (6 decimals)
tshark -r capture.pcap -t u.6

# Nanoseconds (9 decimals)
tshark -r capture.pcap -t u.9

# Seconds only (no decimals)
tshark -r capture.pcap -t u.0
```

**Use cases:**

```bash
# Human-readable logs
tshark -r capture.pcap -t ad

# Sort by timestamp programmatically
tshark -r capture.pcap -t e -T fields -e frame.time_epoch | sort -n

# Timing analysis between packets
tshark -r capture.pcap -t d -T fields -e frame.time_delta
```

## Update Interval (`--update-interval`)

Control display refresh rate during live capture:

```bash
# Update every 1000ms (default: 100ms)
tshark -i eth0 --update-interval 1000

# Reduce CPU usage on slow systems
tshark -i eth0 --update-interval 5000 -q -z io,stat,1
```

**Use case:** Reduce CPU overhead on resource-constrained systems during live captures.

## Timestamp Types (`--time-stamp-type`)

Choose hardware timestamping method for high-precision captures:

```bash
# List available timestamp types for interface
tshark -i eth0 --list-time-stamp-types

# Use specific timestamp type
tshark -i eth0 --time-stamp-type adapter_unsynced -w capture.pcap
```

**Common types:**
- `host` - Host-generated timestamps (default)
- `adapter` - Adapter hardware timestamps
- `adapter_unsynced` - Adapter timestamps without NTP sync

**Use case:** High-frequency trading, research labs, or when microsecond precision is required.

## Compression (`--compress`)

Compress output files to save disk space:

```bash
# Compress with gzip
tshark -r huge.pcap -w compressed.pcap.gz --compress gzip

# Automatic with .gz extension
tshark -r huge.pcap -w output.pcap.gz
```

**Compression formats:**
- `gzip` - Standard gzip compression (slower read, smaller files)

**Trade-offs:**
- **Pros:** 70-90% disk space savings
- **Cons:** Slower to read later, requires decompression

## Capture Comments (`--capture-comment`)

Add metadata to capture files:

```bash
# Single comment
tshark -i eth0 \
    --capture-comment "Captured during incident #12345" \
    -w incident.pcap

# Multiple comments
tshark -r input.pcap \
    --capture-comment "Analysis by Security Team" \
    --capture-comment "Date: $(date)" \
    --capture-comment "Filter: tcp.port==443" \
    -w annotated.pcap
```

**Use cases:**
- Document capture context
- Track analysis provenance
- Add incident/ticket numbers
- Record capture parameters

**Viewing comments:**

```bash
tshark -r annotated.pcap | head
# or
capinfos annotated.pcap
```

## Global Profile (`--global-profile`)

Use global configuration instead of personal:

```bash
# Use system-wide configuration
tshark --global-profile -r capture.pcap

# Useful for consistent configs across users
tshark --global-profile -C Production -r capture.pcap
```

**Use case:** System administrators deploying standardized configurations for all users.

## Temporary Directory (`--temp-dir`)

Specify temporary file location:

```bash
# Use custom temp directory
tshark -r huge.pcap \
    --temp-dir /mnt/large_disk/tmp \
    -w processed.pcap

# Useful when /tmp is small
tshark -i eth0 \
    --temp-dir /data/tmp \
    -w capture.pcap
```

**Use cases:**
- `/tmp` mounted on small partition
- Network storage with more space
- SSD for temp files, HDD for final storage

## Line Separator (`-S`)

Custom separator between packet outputs:

```bash
# Visual separator
tshark -r capture.pcap -S "========" -c 5

# Empty line between packets
tshark -r capture.pcap -S ""

# Custom delimiter for parsing
tshark -r capture.pcap -T fields -e ip.src -S "||"
```

## Print Summary with File Output (`-P`)

Print packet summary to stdout even when writing to file:

```bash
# Write to file AND print to screen
tshark -i eth0 -w capture.pcap -P

# Monitor what's being captured while saving
tshark -i eth0 -w capture.pcap -P -Y "http.request"
```

## Group Read Access (`-g`)

Enable group read permissions on output files:

```bash
# Allow group members to read capture
tshark -i eth0 -g -w /shared/capture.pcap

# Useful for team analysis
tshark -r input.pcap -g -w output.pcap
```

## Flush Output (`-l`)

Flush output after each packet (implies `--update-interval 0`):

```bash
# Real-time piping to other tools
tshark -i eth0 -l -T fields -e ip.src | while read ip; do
    echo "Packet from: $ip"
done

# Live monitoring
tshark -i eth0 -l | grep "HTTP"
```

**Use case:** Real-time processing pipelines where immediate output is required.

## Quiet Mode (`-q` / `-Q`)

Reduce output noise:

```bash
# Quiet mode (suppress packet output)
tshark -r capture.pcap -q -z io,stat,1

# Very quiet (only true errors)
tshark -r capture.pcap -Q -z expert

# Useful for statistics-only output
tshark -r capture.pcap -q -z conv,tcp
```

**Differences:**
- `-q`: Be more quiet (suppress packet lines, show statistics)
- `-Q`: Very quiet (only log true errors to stderr)

## Combining Options

Real-world examples combining multiple output options:

### Forensics Analysis

```bash
# Detailed forensics capture with metadata
tshark -i eth0 \
    -w forensics_$(date +%Y%m%d_%H%M%S).pcap.gz \
    --compress gzip \
    --capture-comment "Incident #$(cat incident_number.txt)" \
    --capture-comment "Analyst: $USER" \
    --capture-comment "Location: DataCenter-A" \
    -t ad \
    -P
```

### High-Performance Live Analysis

```bash
# Optimized for speed and disk space
tshark -i eth0 \
    -t e \
    -l \
    -T fields \
    -E separator=, \
    -E header=y \
    -e frame.time_epoch \
    -e ip.src \
    -e ip.dst \
    -e tcp.port \
    --update-interval 1000 \
    > live_data.csv
```

### Binary Protocol Analysis

```bash
# Extract hex for reverse engineering
tshark -r proprietary.pcap \
    -Y "tcp.port==9999" \
    --hexdump frames,noascii \
    -t a \
    > protocol_analysis.txt
```

## Further Reading

- [Format Usage](/formats/format_usage/) for capture formats
- [Statistics](/analyze/statistics/) for analysis output
- [Performance](/analyze/performance/) for optimization