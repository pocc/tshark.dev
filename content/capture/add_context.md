---
title: "Add Context"
description: "Context is worth 80 IQ points. – Alan Kay"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: 'Generating [VLANs file](https://osqa-ask.wireshark.org/questions/63009/generate-vlans-file)'
weight: 50
draft: true
---

## 5. Add context

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

??? How do you strip DNS info from a file ???

### 5B. Decoding protocols

Sometimes you might be using network protocools in ways that Wireshark isn't
expecting (or aren't standard). In these cases, it is important to decode the
protocols so that wireshark's dissectors can be leveraged. 

Using `-d`, ... <ASCIICAST>

en/disable protocols/heuristics can do the same thing.

??? What is a heuristic vis-a-vis wireshark vs protocol ???

### Usage for already-captured files

- Use Tshark to [Decrypt Kerberos, TLS, or 802.11](/post/tshark-decryption)

### 6. tshark vs dumpcap

At first glance, tshark looks like it has most of dumpcap's functionality, and that's mostly true.

Here are a couple differences:
- 
Question: In what significant ways do dumpcap and tshark differ?
