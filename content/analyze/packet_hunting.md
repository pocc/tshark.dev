---
title: "Display Filters"
description: Find the packets you're looking for
date: 2019-07-06
author: Ross Jacobs

summary: ''
weight: 70
draft: false
---

{{% notice note %}}
Draft in progress. More content will be added here.
{{% /notice %}}

## General Display Filters

Display filters allow you to use Wireshark's powerful multi-pass packet processing capabilities.

## matches and contains

Sometimes you want to search packet data and a display filter won't cut it.
`matches` will search with a regex while `contains` searches for exact byte sequences.

### Caveats

* You cannot use matches and contains with fields that have a number type like `int`.

#### matches: Search for a URL with regex

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

#### contains: Search for a byte sequence

`contains` searches the text representation of a field.
If you're looking for any frames that match an OUI '00:16:e3',
there are a couple ways of doing this.

```bash
# These are all equivalent
tshark -r $file -Y "eth.addr contains 00:16:e3"
tshark -r $file -Y "eth.addr[0:3] == 00:16:e3"
tshark -r $file -Y "eth.addr matches \"^[^\x01-\xff]\x16\xe3\""
```

## Further Reading

_This will be a long list as this is the meat of what Wireshark does._

### Wireshark

* 2019-07, <i class="fas fa-clock"></i> 8 min, Docs: [Building Display Filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html): Comprehensive guide on usage
* 2019-07, <i class="fas fa-clock"></i> 2 min, Docs: [Defining And Saving Filters](https://www.wireshark.org/docs/wsug_html_chunked/ChWorkDefineFilterSection.html): Create shortcodes for your most used display filters
* 2006-07, <i class="fas fa-clock"></i> 4 min: Wiki: [Display Filters](https://wiki.wireshark.org/DisplayFilters):  of general usage and examples

### Articles

* 2019-01, <i class="fas fa-clock"></i> 9 min, Brad Duncan, [Using Wireshark – Display Filter Expressions](https://unit42.paloaltonetworks.com/using-wireshark-display-filter-expressions/)
* 2017-01, <i class="fas fa-clock"></i> 4 min, Robert Allen, [20 Display Filter Examples](https://networksecuritytools.com/list-wireshark-display-filters/)
