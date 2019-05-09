---
title: "tshark guide"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Using the Wireshark CLI for Packet Analysis"

draft: false
---

# Packet Analysis

## You are Here <i class="fas fa-map-marked-alt"></i>

```mermaid
graph LR;
	%% Elements
	MAP(fa:fa-map-marked-alt About)
	subgraph GET STARTED
	SETUP(<a href={{< ref "/setup" >}}>fa:fa-fighter-jet Setup tshark</a>)
	end
	
	subgraph GET PCAP
	CAPTURE(<a href={{< ref "/capture" >}}>fa:fa-network-wired Capture Pcap</a>)
	LIVE(fa:fa-wind Live Capture)
	GEN(<a href={{< ref "/generation" >}}>fa:fa-industry Generate Pcap</a>)
	DL(<a href={{< ref "/download" >}}>fa:fa-download Download Pcap</a>)
	end

	subgraph ANALYZE PCAP
	PCAP((<a href={{< ref "/" >}}>fa:fa-file Pcap File</a>))
	EDIT(<a href={{< ref "/edit" >}}>fa:fa-edit Edit Pcap</a>)
	EXPORT(<a href={{< ref "/export" >}}>fa:fa-file-export Export Files</a>)
	INFO(<a href={{< ref "/getinfo" >}}>fa:fa-info-circle Get Info</a>)
	ANLS(Packet Analysis)
	end
	
	subgraph ADVANCED TOPICS
	ADV(<a href={{< ref "/advanced" >}}>fa:fa-hat-wizard Packetcraft</a>)
	COMM(<a href={{< ref "/communicate" >}}>fa:fa-envelope Communicate<br/> Results</a>)
	HELP(<a href={{< ref "/contribute" >}}>fa:fa-code-branch Contribute</a>)
	end
	
	%% CSS
	%% Using blues from https://htmlcolorcodes.com/ 
	linkStyle default interpolate monotoneX
	classDef others fill:#D6EAF8,stroke:#1B4F72;
	classDef thisnode fill:#5DADE2,stroke:#1B4F72;
	class SETUP,CAPTURE,DL,GEN,LIVE,PCAP,EDIT,EXPORT,INFO,COMM,ADV,HELP others
	class MAP thisnode
	style MAP stroke-width:3px;

	%% Relationships
	SETUP --> CAPTURE
	SETUP --> LIVE
	SETUP --> GEN
	DL --> PCAP
	GEN --> ANLS
	CAPTURE --> PCAP
	LIVE --> ANLS
	
	PCAP --> EDIT
	EDIT --> PCAP
	PCAP --> EXPORT
	PCAP --> INFO
	PCAP --> ANLS
	ANLS --> COMM
	EXPORT --> COMM
	INFO --> COMM
```	

You will find this map on every page. Use it to find what you need.

## Introduction

In line with the Unix philosophy of "Do one thing well", Wireshark has many
small CLI utilities. If you are reading this article because you want to know
how to use to do X with the CLI, you've come to the right place. As a
contributor to Wireshark and daily user, I am writing this as an unofficial
tshark guide.

## Motivation

There are a couple things that motivate this guide:

- [Wireshark Documentation](https://www.wireshark.org/docs/) is a reference, not a guide
- Documentation on how to do things is often found on ask.wireshark.org, Stack Overflow, or various other websites. This project aims to collect it all in one place.

## Purpose

This guide will help you to capture traffic, edit it, clean it, and send it. The
scenario being that you are reporting on a network problem and want to use
wireshark to provide a packet capture you can then send on to
colleagues/customers.

## Further Reading

_The end of one adventure is the beginning of another._

### Network Scripting with Python

* [Python for Network Engineers](https://www.youtube.com/watch?v=s6SIVc7C5U0):
  David Bombal is a CCIE who has good lectures on using Python (costs $$$)
* [Sentdex Tutorials](https://www.youtube.com/user/sentdex): A Pythonista who
  will inspire you
* [Python Guide](https://docs.python-guide.org/): For when you want to turn your
  script into a project.

### Content from another page (edit this)

There are many wireshark command line utilities. I plan on going over how to use
them as part of networking troubleshooting and pcap munging.

This article is focused on different packet libraries like Google's Go Packet
library, Python's PyShark and Scapy. 

Things I care about:
* Speed
* Capabilities

https://wiki.wireshark.org/Tools

## Wireshark

* [Official Docs](https://www.wireshark.org/docs/man-pages/)
* [Get the Sourcecode](https://www.wireshark.org/develop.html)
* [File a Bug Report](https://wiki.wireshark.org/ReportingBugs)
* [Contribute!](https://www.wireshark.org/docs/wsdg_html_chunked/)

