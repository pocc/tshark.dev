---
title: Guide Map
pre: "<b>0. </b>"
weight: 1
---

```mermaid
graph LR;
	SUWS[<a href={{< ref "/setup/tshark_setup" >}}>0. Setup Wireshark</a>]
	has_iface[Interface found?]
	CAPT[<a href={{< ref "/capture" >}}>1. Capture</a>]
	SUCI[<a href={{< ref "/capture/tshark_capturing" >}}>Setup Capture Interface</a>]
	ANLS[<a href={{< ref "/analyze" >}}>2. Analysis</a>] 
	GEN8[<a href=google.com>3. Generation</a>] 

	SUWS --> has_iface
	has_iface--> CAPT
	has_iface -- no --> SUCI
	CAPT -- interface not found --> COMM
	
	GEN8
```
