---
title: "Display Filters"
description: Find the packets you are looking for
date: 2019-07-06
author: Ross Jacobs

summary: ''
weight: 30
draft: false
---

Display Filters are a large topic and a major part of Wireshark's popularity.
If you are unfamiliar with filtering for traffic,
Hak5's video on [Display Filters in Wireshark](https://www.youtube.com/watch?v=N-HpD0bUSO4) is a good introduction.

## Introduction to Display Filters

Display filters allow you to use Wireshark's powerful multi-pass packet processing capabilities.
To use a display filter with tshark, use the `-Y 'display filter'`. Single quotes are recommended here for the display filter to avoid
[bash expansions](https://unix.stackexchange.com/questions/4956/how-to-properly-escape-exclamation-points-in-bash) and
problems with spaces.

If you create a filter and want to see how it is evaluated, [dftest](/analyze/packet_hunting/dftest/) is bundled with Wireshark.

### Layers 2-4

For any major protocol, there is query for each direction and either.

1. `eth.src == 00:11:22:33:44:55`: Source MAC address is 00:11:22:33:44:55
1. `ip.addr == 10.0.0.1`: Find all traffic that has IP of 10.0.0.1
1. `tcp.dstport != 80`: Destination tcp port is NOT 80

For the table below, create a filter by joining the relevant header and word below it with a `.`.
For example, source MAC address becomes `eth.src`.

| direction   | eth  | ip   | tcp     | udp     |
|-------------|------|------|---------|---------|
| source      | src  | src  | srcport | srcport |
| destination | dst  | dst  | dstport | dstport |
| either      | addr | addr | port    | port    |

{{% notice warning %}}
Care must be taken when using `!=` with a filter that specifies either direction like `addr` or `port`.
If you are wondering why, dftest [can be used](/analyze/packet_hunting/dftest/#example-behavior) to investigate.
{{% /notice %}}

### Protocols

Protocols you might run into are `icmp`, `dhcp`, and `http`. These are provided as examples as the list of available protocols is extremely long.
For example:

```bash
bash$ tshark -Y 'icmp'
Capturing on 'Wi-Fi: en0'
    1   0.000000 192.168.1.246 → dns.google   ICMP 98 Echo (ping) request  id=0x1d5b, seq=48153/6588, ttl=63
    2   0.025354      8.8.8.8 → mbp.attlocal.net ICMP 98 Echo (ping) reply    id=0x1d5b, seq=48153/6588, ttl=53 (request in 1)
   13   1.001761 192.168.1.246 → dns.google   ICMP 98 Echo (ping) request  id=0x1d5b, seq=48154/6844, ttl=63
   14   1.026759      8.8.8.8 → mbp.attlocal.net ICMP 98 Echo (ping) reply    id=0x1d5b, seq=48154/6844, ttl=53 (request in 13)
   31   2.004378 192.168.1.246 → dns.google   ICMP 98 Echo (ping) request  id=0x1d5b, seq=48155/7100, ttl=63
   35   2.029677      8.8.8.8 → mbp.attlocal.net ICMP 98 Echo (ping) reply    id=0x1d5b, seq=48155/7100, ttl=53 (request in 31)
```

### Logic

`and`, `or`, `()`, and `!` are used to combine statements. For example, to get all traffic going to google's dns servers that is not a ping or dns lookup, use

`ip.addr == 8.8.8.8 and !(icmp or dns)`

{{% notice note %}}
If you like C-style syntax, you can also use `&&` instead of `and` and `||` instead of `or`.
{{% /notice %}}

### Finding Components of Protocols

Sometimes you know the protocol you're looking for, just not the relevant fields you need to filter with.
`tshark -G` will print all protocols, so you can use it in conjunction with grep to find fields of interest.

#### grep for a specific field by name

If we already know what the field name is, we can get the full display filter by searching for it.

    bash$ tshark -G | grep -E "sec_websocket_version"
    F	Sec-WebSocket-Version	http.sec_websocket_version	FT_STRING	http		0x0	

#### find all subfields of a protocol

In this example, use `http.response`, and escape the periods.

    bash$ tshark -G | grep -E "http\.response\."
    F	Response line	http.response.line	FT_STRING	http		0x0	
    F	Response Version	http.response.version	FT_STRING	http		0x0	HTTP Response HTTP-Version
    F	Status Code	http.response.code	FT_UINT16	http	BASE_DEC	0x0	HTTP Response Status Code
    F	Status Code Description	http.response.code.desc	FT_STRING	http		0x0	HTTP Response Status Code Description
    F	Response Phrase	http.response.phrase	FT_STRING	http		0x0	HTTP Response Reason Phrase

## 2-pass analysis with -R, -Y, and -2

If you would like to optimize display filtering over 2
passes, you can specify the first and second with `-R <filter> -2 -Y <2nd filter>`.

There are few circumstances where this relevant, but I can make a contrived
example: Let's say that you want the 5th arp frame in a capture. You could
do this with two passes or by calling tshark twice. Using two passes is faster:

```sh
bash-5.0$ time tshark -r large.pcapng -R "arp" -2 -Y "frame.number == 5"
    5   5.872787 18:68:cb:ad:97:60 → Broadcast    ARP 60 Who has 192.168.1.64? Tell 192.168.1.141

real  0m2.945s
user  0m2.702s
sys   0m0.447s
bash-5.0$ time tshark -r large.pcapng -Y "arp" -w - | tshark -r - -Y "frame.number == 5"
    5   5.836911 18:68:cb:ad:97:60 → Broadcast    ARP 60 Who has 192.168.1.64? Tell 192.168.1.141

real  0m4.660s
user  0m4.633s
sys   0m0.781s
```

## Realtime Analysis

One of the biggest differences between tshark and Wireshark is that you can change the
Termshark is the way to analyze a capture in the terminal. You can change filters just like Wireshark's GUI to see what's happening.

<a href="https://termshark.io"><img src="https://termshark.io/images/termshark.gif" alt="Termshark: A UI for tshark"></a>

## Filter with Regex: matches and contains

Sometimes you want to search packet data and a display filter won't cut it.
`matches` will search with a regex while `contains` searches for exact byte sequences.

### Caveats

You cannot use matches and contains with fields that have a number type like `int`.

### matches: Search for a URL with regex

You're looking for an HTTP GET that contains a request for a URL that
starts with 'http' or 'https', has the Russian '.ru' domain, and contains the word 'worm' in the query string.
Luckily, Wireshark gives you `matches` which uses PCRE [regex syntax](https://www.regular-expressions.info/).
A simple one that satisfies this is `https?.*?\.ru.*?worm`. If this seems like greek, you can explore it on [regex101](https://regex101.com/r/xKuEVZ/2).

Given that this is GET, it's better to just search the 'http' protocol: `http matches "https?.*?\.ru.*?worm"`
Note that the regex is double quoted. With tshark, `-Y "display filter"` also needs to be double-quoted.
In order to use this display filter, escape the inner quotes:

```bash
tshark -r $file -Y "frame matches \"https?.*?\.ru.*?worm\""
```

{{% notice warning %}}
You [cannot use the null character](https://osqa-ask.wireshark.org/questions/41234/matches-regex-null-byte),`\x00` when using `matches` because Wireshark uses null-terminated C-strings.
Use `[^\x01-\xff]` instead.
{{% /notice %}}

### contains: Search for a byte sequence

`contains` searches the text representation of a field.
If you're looking for any frames that match an OUI '00:16:e3',
there are a couple ways of doing this.

```bash
# These are all equivalent
tshark -r $file -Y "eth.addr contains 00:16:e3"
tshark -r $file -Y "eth.addr[0:3] == 00:16:e3"
tshark -r $file -Y "eth.addr matches \"^[^\x01-\xff]\x16\xe3\""
```

<!--
## Display Filter Macros

If you have a long and complicated 
-->

## Further Reading

_This will be a long list as this is the meat of what Wireshark does._

### Wireshark

* 2019-07, <i class="fas fa-clock"></i> 8 min, Docs: [Building Display Filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html): Comprehensive guide on usage
* 2019-07, <i class="fas fa-clock"></i> 2 min, Docs: [Defining And Saving Filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkDefineFilterSection.html): Create shortcodes for your most used display filters
* 2006-07, <i class="fas fa-clock"></i> 4 min: Wiki: [Display Filters](https://wiki.wireshark.org/DisplayFilters):  of general usage and examples

### Articles

* 2019-01, <i class="fas fa-clock"></i> 9 min, Brad Duncan, [Using Wireshark – Display Filter Expressions](https://unit42.paloaltonetworks.com/using-wireshark-display-filter-expressions/)
* 2017-01, <i class="fas fa-clock"></i> 4 min, Robert Allen, [20 Display Filter Examples](https://networksecuritytools.com/list-wireshark-display-filters/)

### Similar Programs

* [ngrep](https://github.com/jpr5/ngrep): Use PCRE and libpcap syntax to search for data. This qualifies as a similar program, but tshark with `match` has a superset of functionality. Limited to pcaps and parses vastly fewer protocols.
