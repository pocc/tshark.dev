---
title: "Reports (-G)"
description: "Generate glossary and configuration reports"
date: 2026-02-16
author: Claude Code

summary: '[manpage](https://www.wireshark.org/docs/man-pages/tshark.html)'
weight: 30
draft: false
---

{{% ai-warning %}}

The `-G` flag generates various reports about tshark's internal configuration, available protocols, fields, and preferences. This is essential for building automation tools, discovering available dissectors, and debugging configuration issues.

## Basic Usage

```bash
# List all available reports
tshark -G help

# Generate default report (fields)
tshark -G

# Generate specific report
tshark -G protocols
```

## Field Discovery (`-G fields`)

**Use Case:** Find available field names for filter expressions and field extraction. Critical for building dynamic filter generators and automation scripts.

```bash
# List all available fields (30,000+ fields!)
tshark -G fields > all_fields.txt

# Search for specific protocol fields
tshark -G fields | grep -i "^dns\."

# Find HTTP-related fields
tshark -G fields | grep -i "http" | head -20

# Get field details (name, type, description)
tshark -G fields | grep "tcp.stream"
```

**Output format:**
```
F    <field_name>    <field_type>    <protocol>    <description>
```

**Example output:**
```
F    tcp.stream    FT_UINT32    tcp    Stream index
F    tcp.port      FT_UINT16    tcp    Source or Destination Port
F    http.host     FT_STRING    http   Host
```

**Practical automation:**

```bash
#!/bin/bash
# Generate filters for all TCP ports in use
tshark -G fields | grep "tcp.port" | \
    while read -r line; do
        echo "Display filter: tcp.port==$line"
    done
```

## Protocol Discovery (`-G protocols`)

**Use Case:** List all registered protocols. Essential for determining which protocols are available in your tshark version.

```bash
# List all protocols
tshark -G protocols

# Search for specific protocol
tshark -G protocols | grep -i modbus

# Check if HTTP/2 is available
tshark -G protocols | grep -i http2

# List industrial protocols
tshark -G protocols | grep -iE "modbus|opcua|profinet|ethercat"
```

**Output format:**
```
<protocol_name>    <protocol_description>    <filter_name>
```

**Example output:**
```
HTTP                Hypertext Transfer Protocol                http
DNS                 Domain Name System                         dns
MODBUS              Modbus                                     modbus
```

**Use in automation:**

```bash
#!/bin/bash
# Check if required protocols are available
required_protocols=("http2" "quic" "tls")

for proto in "${required_protocols[@]}"; do
    if ! tshark -G protocols | grep -qi "^$proto"; then
        echo "ERROR: Protocol $proto not available"
        exit 1
    fi
done
```

## Dissector Tables (`-G dissector-tables`)

**Use Case:** List all dissector tables and their properties. Useful for understanding how protocols are layered and for Lua dissector development.

```bash
# List all dissector tables
tshark -G dissector-tables

# Find TCP port dissectors
tshark -G dissector-tables | grep "tcp.port"

# Find UDP dissectors
tshark -G dissector-tables | grep "udp"
```

**Example output:**
```
tcp.port    TCP Port    integer    base 10
udp.port    UDP Port    integer    base 10
```

**Lua dissector integration:**

```lua
-- Use dissector table info to register custom protocol
local tcp_table = DissectorTable.get("tcp.port")
tcp_table:add(9999, my_custom_proto)
```

## Preferences (`-G defaultprefs` / `-G currentprefs`)

**Use Case:** Export default or current preferences. Essential for reproducible analysis and configuration management.

```bash
# Export default preferences
tshark -G defaultprefs > default_prefs.txt

# Export current preferences (including user changes)
tshark -G currentprefs > current_prefs.txt

# Compare default vs current
diff <(tshark -G defaultprefs) <(tshark -G currentprefs)
```

**Finding specific preferences:**

```bash
# Find TLS-related preferences
tshark -G defaultprefs | grep -i "tls\."

# Find name resolution settings
tshark -G defaultprefs | grep -i "nameres"

# Find HTTP preferences
tshark -G defaultprefs | grep "^http\."
```

**Use with `-o` flag:**

```bash
# Get default HTTP port preference
tshark -G defaultprefs | grep "http.tcp.port"

# Override it
tshark -o "http.tcp.port:8080,8888" -r capture.pcap -Y http
```

## Elasticsearch Mapping (`-G elastic-mapping`)

**Use Case:** Generate Elasticsearch mapping for tshark JSON output. Required for indexing tshark data in ELK stacks.

```bash
# Generate full mapping
tshark -G elastic-mapping > tshark_mapping.json

# Generate mapping for specific protocols only
tshark -G elastic-mapping --elastic-mapping-filter "ip,tcp,http" > http_mapping.json
```

**Use in ELK pipeline:**

```bash
#!/bin/bash
# Create Elasticsearch index with tshark mapping

# Generate mapping
tshark -G elastic-mapping > /tmp/mapping.json

# Create index
curl -XPUT "http://localhost:9200/packets" \
     -H 'Content-Type: application/json' \
     -d @/tmp/mapping.json

# Index packets
tshark -r capture.pcap -T ek | \
    curl -XPOST "http://localhost:9200/packets/_bulk" \
         -H 'Content-Type: application/json' \
         --data-binary @-
```

## Other Reports

### Column Formats (`-G column-formats`)

List available column format codes:

```bash
tshark -G column-formats
```

### Decode As Associations (`-G decodes`)

List all "Decode As" layer type associations:

```bash
tshark -G decodes
```

### Heuristic Decoders (`-G heuristic-decodes`)

List heuristic dissector tables:

```bash
tshark -G heuristic-decodes
```

### Manufacturer Tables (`-G manuf`)

Dump ethernet manufacturer (OUI) tables:

```bash
# Get OUI database
tshark -G manuf > manufacturers.txt

# Look up specific MAC vendor
tshark -G manuf | grep -i "apple"
```

### Services/Ports (`-G services`)

Dump transport service (port) names:

```bash
# Get port mappings
tshark -G services | grep "^80/"
tshark -G services | grep "^443/"
```

### Field Types (`-G ftypes`)

List field type definitions:

```bash
tshark -G ftypes
```

### Value Strings (`-G values`)

Dump value, range, and true/false string definitions:

```bash
tshark -G values > value_strings.txt
```

### Folder Locations (`-G folders`)

Display Wireshark configuration folder locations:

```bash
# Find config directories
tshark -G folders

# Common folders:
# - Personal configuration
# - Global configuration
# - Personal plugins
# - Global plugins
```

## Automation Examples

### Build Dynamic Filter Tool

```bash
#!/bin/bash
# Interactive field selector

# Cache fields
tshark -G fields > /tmp/fields_cache.txt

# Search function
search_field() {
    grep -i "$1" /tmp/fields_cache.txt | \
        awk '{print $2 " - " $5}'
}

# Usage
search_field "http.request"
```

### Protocol Availability Check

```bash
#!/bin/bash
# Verify protocol support before analysis

check_protocol() {
    local proto=$1
    if tshark -G protocols | grep -qi "^$proto\s"; then
        return 0
    else
        echo "ERROR: Protocol '$proto' not supported" >&2
        return 1
    fi
}

# Usage
check_protocol "http2" && echo "HTTP/2 supported"
check_protocol "quic" && echo "QUIC supported"
```

### Field Documentation Generator

```bash
#!/bin/bash
# Generate markdown docs for protocol fields

generate_docs() {
    local proto=$1

    echo "# ${proto^^} Protocol Fields"
    echo ""

    tshark -G fields | grep "^F\s*${proto}\." | \
        awk -F'\t' '{
            printf "- **%s** (%s): %s\n", $2, $3, $5
        }'
}

# Usage
generate_docs "dns" > dns_fields.md
generate_docs "http" > http_fields.md
```

### Configuration Backup

```bash
#!/bin/bash
# Backup tshark configuration for reproducibility

backup_dir="tshark_config_$(date +%Y%m%d)"
mkdir -p "$backup_dir"

# Save current preferences
tshark -G currentprefs > "$backup_dir/preferences.txt"

# Save folder locations
tshark -G folders > "$backup_dir/folders.txt"

# Save enabled protocols
tshark -G protocols > "$backup_dir/protocols.txt"

echo "Configuration backed up to $backup_dir/"
```

### ELK Stack Integration

```bash
#!/bin/bash
# Automated ELK pipeline setup

# Generate minimal mapping for common protocols
tshark -G elastic-mapping \
    --elastic-mapping-filter "frame,eth,ip,tcp,udp,http,dns,tls" \
    > /tmp/tshark_mapping.json

# Create Elasticsearch index
curl -XPUT "http://localhost:9200/network-traffic" \
     -H 'Content-Type: application/json' \
     -d @/tmp/tshark_mapping.json

# Start ingestion
tshark -i eth0 -T ek -l | \
    while read -r line; do
        echo "$line" | \
        curl -XPOST "http://localhost:9200/network-traffic/_doc" \
             -H 'Content-Type: application/json' \
             -d @-
    done
```

## Use in Development

### Building Wireshark Wrappers

When building tools that wrap tshark:

```python
#!/usr/bin/env python3
import subprocess
import json

def get_available_fields():
    """Get all available tshark fields"""
    result = subprocess.run(
        ['tshark', '-G', 'fields'],
        capture_output=True,
        text=True
    )

    fields = {}
    for line in result.stdout.splitlines():
        parts = line.split('\t')
        if len(parts) >= 3:
            field_name = parts[1]
            field_type = parts[2]
            fields[field_name] = field_type

    return fields

def validate_filter(filter_str):
    """Validate filter uses only available fields"""
    available_fields = get_available_fields()

    # Extract field names from filter
    # (simplified - real implementation needs proper parsing)
    for field in filter_str.split():
        if '.' in field and field not in available_fields:
            print(f"Warning: Unknown field '{field}'")

# Usage
fields = get_available_fields()
print(f"Total available fields: {len(fields)}")
```

### Protocol Feature Detection

```bash
#!/bin/bash
# Detect tshark capabilities

capabilities_file="tshark_capabilities.json"

cat > "$capabilities_file" <<EOF
{
    "version": "$(tshark -v | head -1)",
    "protocols": $(tshark -G protocols | wc -l),
    "fields": $(tshark -G fields | wc -l),
    "http2_support": $(tshark -G protocols | grep -qi "http2" && echo "true" || echo "false"),
    "quic_support": $(tshark -G protocols | grep -qi "quic" && echo "true" || echo "false"),
    "tls13_support": $(tshark -G protocols | grep -qi "tls" && echo "true" || echo "false")
}
EOF

cat "$capabilities_file"
```

## Performance Notes

- `-G` reports are generated quickly (< 1 second for most)
- Cache report outputs when building tools to avoid repeated calls
- Use `grep` for filtering instead of loading entire reports into memory

## Further Reading

- [Preferences](/packetcraft/arcana/profiles/) for using preference overrides
- [Display Filters](/analyze/packet_hunting/packet_hunting/) for using discovered fields
- [Lua Scripts](/packetcraft/scripting/lua_scripts/) for using dissector tables
