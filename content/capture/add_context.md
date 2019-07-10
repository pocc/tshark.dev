---
title: "Add Context"
description: "Resolve for analysis"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: '[docs](https://www.wireshark.org/docs/wsug_html_chunked/ChAdvNameResolutionSection.html)'
weight: 50
draft: true
---

## Adding context 

There are 

### 5A. Name resolution

There are ways to polish a packet capture. What you add should depend on what
you are troubleshooting.

-N :
  m => mac
  t => port
  v => vlan
  N => dns

-n : Does this actually do anything (check bug)
??? What is the scope of these? Is it added to stdout but not to files ???
-Wn implies this.

-Wn saves info to a file
-H Use hosts file as source, implies -Wn.

## Further Reading

* [Generating VLANs file](https://osqa-ask.wireshark.org/questions/63009/generate-vlans-file)'