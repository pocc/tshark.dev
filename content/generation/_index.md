---
title: "Generate Pcap"
author: Ross Jacobs
chapter: false
pre: X<b><i class="fas fa-industry"></i> </b>
description: "\"Let there be packets!\" – TCP/IP authors, probably"
weight: 12
---

Packet generation allows us to create artificial traffic that machines will treat as real.
Applications of creating traffic include fuzzing, security auditing, bug reproduction, and throughput testing.
Fuzzing will focus on the creation of packets that test boundary conditions while the latter three require
sending packets out of your network interface. Which tool you use will largely depend on your use case.

#### Table of Contents

{{% children description="true" %}}
