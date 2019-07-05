---
title: Configuration
author: Ross Jacobs
description: "A config will always approach perfection"
summary: '<i class="fas fa-external-link-square-alt"></i> Wireshark Docs: [Config Profiles](https://www.wireshark.org/docs/wsug_html_chunked/ChAppFilesConfigurationSection.html) | [Customization](https://www.wireshark.org/docs/wsug_html_chunked/ChapterCustomize.html)'
weight: 30
---

## Custom Configuration

Tshark, like Wireshark, uses a preferences file. A different preference file or keys can be specified with flags.

| Command                     | Does                                    |
| --------------------------- | --------------------------------------- |
| `tshark -C /path/to/config` | Uses custom configuration file          |
| `tshark -o key:value`       | Overrides the specified preferences key |

## Add Tshark Alias

Aliases allow you to define default behavior or multiple sets of behavior.

### Custom Config Alias

If you want to launch tshark with a custom configuration once in a blue moon, you could add an alias for it:

```bash
alias tshark-bluemoon='tshark -C BlueConfig -o BlueKey:BlueVal'
```

### \-\-color

To always enable color, add a line to your .profile or .bashrc:

```bash
echo "alias tshark='tshark --color'" >> ~/.profile
```

For more information, check out [Tshark Colorized](/packetcraft/tshark_colorized).
