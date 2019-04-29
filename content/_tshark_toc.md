---
title: "Wireshark CLI"
date: 2019-03-12T12:44:45Z
author: Ross Jacobs
desc: "Using the Wireshark CLI for Packet Analysis"
tags:
  - networking
  - wireshark
image: https://allabouttesting.org/wp-content/uploads/2018/06/tshark-count.jpg

draft: true
---

# _Packet Analysis, Scripted_

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

## <a name=closing-thoughts></a>Closing Thoughts

Personally, I think that wireshark's CLI needs a better API. For example, git
has a large amount of functionality, but.

## Further Reading

_The end of one adventure is the beginning of another._

### Network Scripting with Python

* [Python for Network Engineers](https://www.youtube.com/watch?v=s6SIVc7C5U0):
  David Bombal is a CCIE who has good lectures on using Python (costs $$$)
* [Sentdex Tutorials](https://www.youtube.com/user/sentdex): A Pythonista who
  will inspire you
* [Python Guide](https://docs.python-guide.org/): For when you want to turn your
  script into a project.

### Wireshark

* [Official Docs](https://www.wireshark.org/docs/man-pages/)
* [Get the Sourcecode](https://www.wireshark.org/develop.html)
* [File a Bug Report](https://wiki.wireshark.org/ReportingBugs)
* [Contribute!](https://www.wireshark.org/docs/wsdg_html_chunked/)
