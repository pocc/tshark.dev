---
title: "Generate Pcap"
author: Ross Jacobs
chapter: false
pre: <b><i class="fas fa-industry"></i>　</b>
desc: "Generating pcaps for fun and profit!"
tags: [networking, wireshark]
weight: 12

draft: true
---

```mermaid
graph LR;
	%% Elements
	subgraph GET STARTED
	SETUP(<a href={{< ref "/setup" >}}>fa:fa-fighter-jet Setup tshark</a>)
	end
	
	subgraph GET PCAP
	CAPTURE(<a href={{< ref "/capture" >}}>fa:fa-network-wired Capture Pcap</a>)
	GEN(fa:fa-industry Generate Pcap)
	DL(<a href={{< ref "/download" >}}>fa:fa-download Download Pcap</a>)
	end

	subgraph ANALYZE PCAP
	PCAP((<a href={{< ref "/" >}}>fa:fa-file Pcap File</a>))
	EDIT(<a href={{< ref "/edit" >}}>fa:fa-edit Edit Pcap</a>)
	EXPORT(<a href={{< ref "/export" >}}>fa:fa-file-export Export Files</a>)
	INFO(<a href={{< ref "/getinfo" >}}>fa:fa-info-circle Get Info</a>)
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
	class SETUP,CAPTURE,DL,PCAP,EDIT,EXPORT,INFO,COMM,ADV,HELP others
	class GEN thisnode
	style GEN stroke-width:3px;

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
	PCAP --> COMM
	EXPORT --> COMM
	INFO --> COMM
```	

_Make traffic that didn't exist before._

__Note for Windows users__: _By default, `randpkt`, `androiddump`, `sshdump`,
`udpdump`, and `randpktdump` are not installed during a Windows installation. If
you want to use these, you will need to manually select them for installation._

## <a name=randpkt></a>randpkt

Note: <i>On Windows, the default is to not install randpkt. You must select
randpkt manually during installation.</i>

Caveat: <i>randpkt -r
[crashes for -c > 1](https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15627)</i>

[randpkt](https://www.wireshark.org/docs/man-pages/randpkt.html) creates
malformed packets to test packet sniffers and protocol implementations.
randpkt is limited to outputting pcaps and can only create random pcaps of one
type at a time. 
<script id="asciicast-235407" src="https://asciinema.org/a/235407.js" async></script>

Most likely, you want a traffic generator and not a pcap generator:

* [Scapy](https://scapy.net/): Packet generator with a Python API for scripting
* [Ostinato](https://github.com/pstavirs/ostinato): Network traffic generator
  with a GUI (also has a Python API)
* [TRex](https://trex-tgn.cisco.com/) is based on DPDK and can generate 10Gbps
  of traffic
* Ixia/Spirent/etc. have comprehensive paid solutions that are suitable for device
  manufacturers

