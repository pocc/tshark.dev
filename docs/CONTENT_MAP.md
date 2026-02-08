# tshark.dev Content Map

Complete map of all content pages. The site follows the "capture lifecycle" — from setup through capture, analysis, and sharing results.

## Content Organization

Each section is a directory under `content/` with an `_index.md` (section page) and individual article `.md` files. Hugo `weight` in front matter controls ordering. All front matter uses YAML format.

---

## 1. Home (`content/home/`) — weight: 1
Redirects to root `/`. The actual homepage is `content/_index.md` which displays:
- An annotated, hyperlinked version of `tshark --help` output
- A table of contents (auto-generated via `{{% children %}}` shortcode)

## 2. Start Here / Setup (`content/setup/`) — weight: 10
Getting Wireshark and tshark installed and configured.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Start Here | Section overview |
| `about.md` | About | What is tshark.dev, Wireshark, and tshark; how this differs from official docs |
| `install.md` | Install | Package manager installs (Linux/macOS/Windows), source builds, verification |
| `configuration.md` | Configuration | Wireshark/tshark configuration |

## 3. Capture Pcap (`content/capture/`) — weight: 20
How to capture packets from various sources.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Capture Pcap | Section overview |
| `tshark.md` | tshark | Full annotated tshark --help with hyperlinks |
| `dumpcap.md` | dumpcap | The underlying capture engine |
| `dumpcap_vs_tshark.md` | dumpcap vs tshark | When to use which |
| `capture_filters.md` | Capture Filters | BPF/libpcap filter syntax |
| `limit_size.md` | Limit Size | Stop conditions, ring buffers, snaplen |

### Capture Sources (`content/capture/sources/`) — subsection
| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Sources | Choosing interfaces |
| `downloading_file.md` | Downloading File | Reading from files with -r |
| `extcap_interfaces.md` | Extcap Interfaces | Extended capture interfaces |
| `pipe.md` | Pipe | Reading from stdin/pipes |
| `sample_interfaces.md` | Sample Interfaces | -D, -L output examples |
| `ssh_interface.md` | SSH Interface | Remote capture via SSH |

## 4. Search Pcaps (`content/search/`) — weight: 30
Finding existing packet captures online.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Search Pcaps | Search syntax, sources of public captures |
| `pcaptable.md` | Pcap Table | Interactive DataTable searching 6000+ pcaps |

## 5. Generate Pcap (`content/generation/`) — weight: 40
Creating artificial network traffic.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Generate Pcap | Overview: fuzzing, security auditing, testing |
| `randpkt.md` | randpkt | Wireshark's random packet generator |
| `program_gen.md` | Program Gen | Generating packets with programs |

## 6. Capture Formats (`content/formats/`) — weight: 50
Understanding pcap and pcapng file formats.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Capture Formats | Overview with hex dump examples |
| `captype.md` | captype | Identify file types |
| `format_usage.md` | Format Usage | Pie chart of format popularity |
| `magic_numbers.md` | Magic Numbers | File format identification bytes |
| `pcap_deconstruction.md` | Pcap Deconstruction | Byte-level breakdown |
| `pcap_format.md` | pcap Format | Classic pcap structure |
| `pcapng_format.md` | pcapng Format | Next-gen pcapng structure |
| `sample_capture_headers.md` | Sample Headers | Example file headers |
| `save_formats.md` | Save Formats | Available output formats |

## 7. Edit Pcap (`content/edit/`) — weight: 60
Modifying, merging, and converting packet captures.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Edit Pcap | Section overview |
| `editcap.md` | editcap | Edit capture files (trim, split, convert) |
| `editing_hex.md` | Editing Hex | Direct hex editing of pcaps |
| `mergecap.md` | mergecap | Merging multiple captures |
| `reordercap.md` | reordercap | Reordering packets by timestamp |
| `sanitizing_hex.md` | Sanitizing Hex | Anonymizing capture data |
| `text2pcap.md` | text2pcap | Converting hex dumps to pcap |

## 8. Export (`content/export/`) — weight: 70
Extracting files and data from captures.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Export | Overview (HTTP, SMB, IMF, DICOM, TFTP) |
| `export_regular.md` | Export Regular | Unencrypted file extraction |
| `export_tls.md` | Export TLS | Encrypted (TLS) file extraction |

## 9. Analyze Pcap (`content/analyze/`) — weight: 80
Analysis tools and techniques.

### Get Info (`content/analyze/get_info/`)
| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Get Info | Section overview |
| `capinfos.md` | capinfos | Capture file statistics |
| `rawshark.md` | rawshark | Raw packet analysis |

### Packet Hunting (`content/analyze/packet_hunting/`)
| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Packet Hunting | Section overview |
| `dftest.md` | dftest | Display filter testing |
| `packet_hunting.md` | Packet Hunting | Display filters, 2-pass analysis (-R, -Y, -2) |
| `tshark_analysis.md` | tshark Analysis | Analysis techniques |

## 10. SharkFu / Packetcraft (`content/packetcraft/`) — weight: 90
Advanced topics: scripting, decryption, profiles, and customization.

### Add Context (`content/packetcraft/add_context/`)
| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Add Context | Section overview |
| `name_resolution.md` | Name Resolution | -n, -N, -H, -W flags |
| `tshark_colorized.md` | Colorized Output | --color flag |
| `tshark_decryption.md` | Decryption | TLS, WPA, Kerberos decryption |

### Arcana (`content/packetcraft/arcana/`)
| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Arcana | Section overview |
| `bpf_instructions.md` | BPF Instructions | Berkeley Packet Filter internals |
| `profiles.md` | Profiles | -C, -o, -G config flags |

### Scripting (`content/packetcraft/scripting/`)
| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Scripting | Section overview |
| `lua_scripts.md` | Lua Scripts | Wireshark Lua API scripting |
| `scripted_gen.md` | Scripted Generation | Packet generation via code |
| `wirepy.md` | WirePy | Python Wireshark bindings |

## 11. Share Results (`content/share/`) — weight: 100
Communicating findings from packet analysis.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Share Results | Section overview |
| `pcap_preparation.md` | Pcap Preparation | Preparing captures for sharing |
| `talking_about_captures.md` | Talking About Captures | Writing analysis reports |

## 12. Next Steps (`content/nextsteps/`) — weight: 200
Contributing, external resources, and future plans.

| File | Title | Description |
|------|-------|-------------|
| `_index.md` | Next Steps | Section overview |
| `contributing.md` | Contribute | How to contribute (issues, PRs, Patreon) |
| `links.md` | Links | External resources |
| `wishlist.md` | Wishlist | Desired future content |

---

## Static Data Files

| File | Purpose |
|------|---------|
| `static/data/min_captures.json` | Database of 6000+ public pcaps for the search table |
| `static/files/` | Example Wireshark config files (hosts, ethers, vlans, etc.) |
| `static/pcaps/` | Sample capture files (pcapng, pcap) |
| `content/files/` | Additional config file examples served as content |

## Total Content

- **11 sections** (plus homepage)
- **~45 content pages**
- **3 sample pcap files** bundled
- **~40 images** (screenshots, diagrams, logos)
