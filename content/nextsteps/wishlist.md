---
title: Wishlist
description: Wouldn't it be nice if X article were written?
date: 2019-08-12
author: Ross Jacobs

summary: '[tshark.dev](https://github.com/pocc/tshark.dev/issues)'
weight: 30
draft: false
---

This is a long wish list of things I'd like to have documented here.
If you feel brave, take one of the items and turn it into an issue with label "write content".

{{%notice note%}}
If a heading has a slash at the end, that means it's a folder; otherwise it's a file.
{{%/notice%}}

## Write New Content

### /capture/802.11

* [ ] Document -p -I (monitor/promiscuous mode) usage

### /capture/time

* [ ] Document Timestamps (--time-stamp-type, --list-time-stamp-types, -t (all opts), -u (all opts))

### /analyze/get_info/

* [ ] Document tshark -G, --elastic-mapping-filter
  * [ ] -G column-formats        dump column format codes and exit
  * [ ] -G decodes               dump "layer type"/"decode as" associations and exit
  * [ ] -G dissector-tables      dump dissector table names, types, and properties
  * [ ] -G fieldcount            dump count of header fields and exit
  * [ ] -G fields                dump fields glossary and exit
  * [ ] -G ftypes                dump field type basic and descriptive names
  * [ ] -G heuristic-decodes     dump heuristic dissector tables
  * [ ] -G plugins               dump installed plugins and exit
  * [ ] -G protocols             dump protocols in registration database and exit
  * [ ] -G values                dump value, range, true/false strings and exit
  * [ ] -G currentprefs          dump current preferences and exit
  * [ ] -G defaultprefs          dump default preferences and exit
  * [ ] -G folders               dump about:folders
* [ ] Document tshark -z (it's a long list, run tshark -z ? to see all)

### /analyze/text_output/

* [ ] Document -V/-O
* [ ] Document -P (print even when writing), -q, -Q
* [ ] Document tshark -T (section), -T ?
    * [ ] Document tshark -T fields. Include data on -E.
    * [ ] Document tshark -T json/jsonraw/--no-duplicate-keys
    * [ ] Document tshark -T pdml/psml
    * [ ] Document tshark -T ek/tabs
    * [ ] \(better\) Document -x (and interoperability with other options), -T text, which is the same
    * [ ] Document -j/-J
    * [ ] Document -e &lt;field&gt; vs. display filters

### /edit/no_dup

* [ ] Removing duplicate packets: -d, -D, -w, -I --skip-radiotap-header

### /edit/splitting_and_merging

* [ ] -i &lt;seconds per file&gt;, -c &lt;packets per file&gt; (perhaps merge with mergecap for a "splitting and merging")

### /edit/edit_metadata

* [ ] editcap -T &lt;encapsulation type&gt;
* [ ] editcap time adjustments (-S, -t)
* [ ] Document --capture-comment

### /packetcraft/add_context/

* [ ] Document editcap and decryption: --inject-secrets &lt;secrets type&gt;,&lt;file&gt; --discard-all-secrets
* [ ] Document Decoding as with `-d <layer>:port/name`. Should be in same article as --enable-protocol/--disable-protocol

### Need research to figure out where these go

* [ ] Document --enable-heuristic/--disable-heuristic
* [ ] tshark -B &lt;buffer size&gt;
* [ ] editcap -v verbosity
* [ ] tshark -M
* [ ] tshark -g
* [ ] tshark -U &lt;tap name&gt;

## Add to Existing Content

### [/capture/capture_filters](/capture/capture_filters/)

* Add demonstration of decrease in file size along with a scenario where there is traffic you care about

### [/capture/sources/pipe](/capture/sources/pipe/)

* [ ] Document tshark -l (goes with Pipe info)

### [/edit/editcap](/edit/editcap/)

* [ ] editcap fuzzing example (-E, --seed, -o)

### [/edit/editing_hex](/edit/editing_hex/)

* [ ] Removing content with -s &lt;snaplen&gt;, -L, -C
