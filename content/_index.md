---
title: "tshark guide"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Using the Wireshark CLI for Packet Analysis"

draft: false
---

# Packet Analysis

## Introduction

In line with the Unix philosophy of "Do one thing well", Wireshark has many
small CLI utilities. If you are reading this article because you want to know
how to use to do X with the CLI, you've come to the right place. As a
contributor to Wireshark and daily user, I am writing this as an unofficial
tshark guide.

## You are Here <i class="fas fa-map-marked-alt"></i>

You will find this map on every page. Use it to find what you need.

```mermaid
graph LR;
	%% Elements
	MAP(fa:fa-map-marked-alt About)
	subgraph GET STARTED
	SETUP(<a href={{< ref "/setup" >}}>fa:fa-fighter-jet Setup tshark</a>)
	end
	
	subgraph GET PCAP
	CAPTURE(<a href={{< ref "/capture" >}}>fa:fa-network-wired Capture Pcap</a>)
	GEN(<a href={{< ref "/setup" >}}>fa:fa-drafting-compass Generate Pcap</a>)
	DL(<a href={{< ref "/setup" >}}>fa:fa-download Download Pcap</a>)
	end

	subgraph ANALYZE PCAP
	PCAP((<a href={{< ref "/setup" >}}>fa:fa-file Pcap File</a>))
	EDIT(<a href={{< ref "/edit" >}}>fa:fa-edit Edit</a>)
	EXPORT(<a href={{< ref "/setup" >}}>fa:fa-file-export Export Files</a>)
	INFO(<a href={{< ref "/setup" >}}>fa:fa-info-circle Get Info</a>)
	end
	
	subgraph ADVANCED TOPICS
	ADV(<a href={{< ref "/advanced" >}}>fa:fa-hat-wizard Wizardcraft</a>)
	COMM(<a href={{< ref "/communicate" >}}>fa:fa-envelope Communicate Results</a>)
	end
	
	%% CSS
	%% Using blues from https://htmlcolorcodes.com/ 
	linkStyle default interpolate monotoneX
	classDef others fill:#D6EAF8,stroke:#1B4F72;
	classDef thisnode fill:#5DADE2,stroke:#1B4F72;
	class SETUP,CAPTURE,DL,GEN,PCAP,EDIT,EXPORT,INFO,COMM,ADV,SEEALSO others
	class MAP thisnode
	style MAP stroke-width:3px;

	%% Relationships
	SETUP --> CAPTURE
	SETUP --> GEN
	CAPTURE --> PCAP
	DL --> PCAP
	GEN --> PCAP
	
	PCAP --> EDIT
	EDIT --> PCAP
	PCAP --> EXPORT
	PCAP --> INFO
	MAP
	PCAP --> COMM
	EXPORT --> COMM
	INFO --> COMM
```	

## Motivation

There are a couple things that motivate this guide:

- [Wireshark Documentation](https://www.wireshark.org/docs/) is a reference, not a guide
- Documentation on how to do things is often found on ask.wireshark.org, Stack Overflow, or various other websites. This project aims to collect it all in one place.

## Purpose

This guide will help you to capture traffic, edit it, clean it, and send it. The
scenario being that you are reporting on a network problem and want to use
wireshark to provide a packet capture you can then send on to
colleagues/customers.

<!-- Kludgy TOC until I can figure out how to include {{ hugo toc }} in the content -->

# Table of Contents

## Getting Started

	* [ ] Installing 
* [X] [Getting Started](/post/wireshark-setup)
  <!-- [[wireshark_setup]] -->
	* [Installing Latest Package](/post/wireshark-setup/#install_from_package)
	* [Installing From Source](/post/wireshark-setup/#install_from_source)
	* [Customize your Setup]()

## Capturing

* [ ] [Capture](/post/wireshark-capturing)
  <!-- [[wireshark_capturing]] --> 
	* [X] [Determine your Interface](/post/wireshark-capturing#dumpcap)
	* [X] [Read from a Source](/post/wireshark-capturing#dumpcap)
	* [X] [Filter Traffic](/post/wireshark-capturing#dumpcap)
	* [X] [Capture Paramaters](/post/wireshark-capturing#dumpcap)
	* [X] [Name Resolution](/post/wireshark-capturing#dumpcap)
	* [X] [Decoding Protocols](/post/wireshark-capturing#dumpcap)
	* [ ] [tshark vs dumpcap](/post/wireshark-capturing#tshark)

## Analysis

* [o] [Analyze](/post/wireshark-info#info) 
  <!-- [[wireshark_info]] -->
	* [ ] [Syntax]
		* [ ] What is BPF
		* [ ] How does Wireshark syntaxt work?
		* [ ] Testing your filter: dftest
	* [X] [capinfos](/post/wireshark-info#capinfos)  
	* [ ] [captype]
	* [ ] tshark -G
	* [X] [rawshark](/post/wireshark-info#rawshark)

### Non-technical communication

## Advanced Topics

- [X] [Generate](/post/wireshark-generation#generate)
  - [X] [randpkt](/post/wireshark-generation#randpkt)
- [ ] [Edit](/post/wireshark-editing#edit)
  - [ ] [editcap](#editcap)
  - [ ] [mergecap](#mergecap)
  - [ ] [reordercap](#reordercap)
  - [ ] [text2pcap](#text2pcap)
- [o] [Additional Topics](/post/wireshark-bonus-topics#additional-topics)  
  - [ ] [Export Object](/post/wireshark-export-object)
  - [X] [Editing Hex](/post/wireshark-bonus-topics#editing-hex)
  - [X] [Piping](/post/wireshark-bonus-topics#piping)
- [ ] [Unusual Interfaces and Where to Find Them]  
  - [ ] Add Gif of chrome download live capture
  - [ ] Add Scapy gif of live capture
- [ ] [extcap: Make your own interface]  
  - [ ] randpkt 1
  - [ ] randpkt 2
  - [ ] randpkt 3
  - [ ] randpkt 4
  - [ ] <using randpkt gif (upload from desktop as gif/webp)>
  - [ ] Wireshark extcap_example.py with GUI and screen recording

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

