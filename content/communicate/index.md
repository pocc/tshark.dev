---
title: "Communicate Results"
chapter: false
pre: <b><i class="fas fa-envelope"></i>　</b>
weight: 30
---

## Info

```mermaid
graph LR;
	%% Elements
	subgraph GET STARTED
	SETUP(<a href={{< ref "/setup" >}}>fa:fa-fighter-jet Setup tshark</a>)
	end
	
	subgraph GET PCAP
	CAPTURE(<a href={{< ref "/capture" >}}>fa:fa-network-wired Capture Pcap</a>)
	GEN(<a href={{< ref "/generation" >}}>fa:fa-drafting-compass Generate Pcap</a>)
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
	COMM(fa:fa-envelope Communicate<br/>Results)
	HELP(<a href={{< ref "/contribute" >}}>fa:fa-code-branch Contribute</a>)
	end
	
	%% CSS
	%% Using blues from https://htmlcolorcodes.com/ 
	linkStyle default interpolate monotoneX
	classDef others fill:#D6EAF8,stroke:#1B4F72;
	classDef thisnode fill:#5DADE2,stroke:#1B4F72;
	class SETUP,CAPTURE,DL,GEN,PCAP,EDIT,EXPORT,INFO,ADV,HELP others
	class COMM thisnode
	style COMM stroke-width:3px;

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
