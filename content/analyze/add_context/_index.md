---
title: "Add Context"
description: "Context is King"
date: 2019-07-19
author: Ross Jacobs

subsection: true
weight: 10
draft: false
---

These methods change context only for the current session.
The file is not changed and others will need to readd the context
with all files and commands that you used to see what you see.

If you want to disable the parsing of a protocol for protocols that are not relevant, you can use `--disable-protocol <protocol>`.
If you want to make this permanent on your system, add the protocols, one per line to `disabled_protos` in your [Wireshark Config](/packetcraft/config_files) directory. If the protocol would have been parsed frequently in the capture, you will see a proportional speedup.

{{% children description="true" depth="4" %}}
