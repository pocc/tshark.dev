---
title: "dftest"
description: "Analyze the Analyzer"
date: 2019-08-03
author: Ross Jacobs

summary: 'dftest: [manpage](https://www.wireshark.org/docs/man-pages/dftest.html) | [code](https://github.com/wireshark/wireshark/blob/master/dftest.c)'
weight: 50
draft: false
---

## About

dftest (Display Filter TEST) is a tool to show how a display filter should be interpreted.
You should use this tool if you are confused why a display filter is filtering for or out the wrong traffic.

## Example: != Behavior

`ip.addr != 10.0.0.1` will not filter out all packets from/to 10.0.0.1.
Without further context, this seems conterintuitive.
To expand on this, these two statements are not the same:

* `ip.addr != 10.0.0.1` (A!=B)
* `!ip.addr == 10.0.0.1` (!A==B)

To investigate what's actually happening, let's use dftest on each.

### Naked !=

```bash
bash$ dftest 'ip.addr != 10.0.0.1'
Filter: "ip.addr != 10.0.0.1"

Constants:
00000 PUT_FVALUE	10.0.0.1 <FT_IPv4> -> reg#1

Instructions:
00000 READ_TREE		ip.addr -> reg#0
00001 IF-FALSE-GOTO	3
00002 ANY_NE		reg#0 == reg#1
00003 RETURN

Deprecated tokens: "!="
```

### Using !()

```bash
bash$ dftest '!ip.addr == 10.0.0.1'
Filter: "!ip.addr == 10.0.0.1"

Constants:
00000 PUT_FVALUE	10.0.0.1 <FT_IPv4> -> reg#1

Instructions:
00000 READ_TREE		ip.addr -> reg#0
00001 IF-FALSE-GOTO	3
00002 ANY_EQ		reg#0 == reg#1
00003 NOT
00004 RETURN
```

### Finding the Difference

In both, we can see that

reg#0 = ip.addr
reg#1 = 10.0.0.1

diffing between the two and grepping for instructions, we can see that the differences are on 2-4

```bash
diff <(dftest 'ip.addr != 10.0.0.1') <(dftest '!ip.addr == 10.0.0.1') | grep -E ". 0000\d|---"
---
< 00002 ANY_NE		reg#0 == reg#1
< 00003 RETURN
---
> 00002 ANY_EQ		reg#0 == reg#1
> 00003 NOT
> 00004 RETURN
```

reg#0 will be tested for ip.src and ip.dst as there are two ip.addr values in every packet.
Using "any" to connote "or", and with A=`ip.addr`, B=`10.0.0.1`,

A!=B ==> `!ip.src == 10.0.0.1 or !ip.dst == 10.0.0.1`  
!A==B => `!(ip.src == 10.0.0.1 or ip.dst == 10.0.0.1)`

Using [De Morgan's laws](https://www.whitman.edu/mathematics/higher_math_online/section01.03.html), we have  

A!=B ==> `!ip.src == 10.0.0.1 or  !ip.dst == 10.0.0.1`  
!A==B => `!ip.src == 10.0.0.1 and !ip.dst == 10.0.0.1`

This form highlights the difference between the two statements: An or/and.
The latter states that if either IP address in a packet is 10.0.0.1, then filter it out.
Clearly, this is the intended behavior.

{{% notice tip %}}
When in doubt, prefer the form `!a==b` to `a!=b`.
{{% /notice %}}
