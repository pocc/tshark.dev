---
title: "Capture Pcap"
chapter: false
pre: <b><i class="fas fa-network-wired"></i>　</b>
weight: 10
---

<!-- Draft Until
* [ ] Bug 2874
* [ ] Filtering ASCIINEMA
* [ ] tshark vs dumpcap
-->

```mermaid
graph LR;
	%% Elements
	subgraph GET STARTED
	SETUP(<a href={{< ref "/setup" >}}>fa:fa-fighter-jet Setup tshark</a>)
	end
	
	subgraph GET PCAP
	CAPTURE(fa:fa-network-wired Capture Pcap)
	GEN(<a href={{< ref "/generation" >}}>fa:fa-industry Generate Pcap</a>)
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
	class SETUP,DL,GEN,PCAP,EDIT,EXPORT,INFO,COMM,ADV,HELP others
	class CAPTURE thisnode
	style CAPTURE stroke-width:3px;

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

> _Everything comes to us that belongs to us if we create the capacity to receive it._ 
>
> _-Rabindranath Tagore_

{{% children %}}
