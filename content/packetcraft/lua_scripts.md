---
title: "Lua Scripts"
author: Ross Jacobs
date: 2019-03-12T12:44:45Z
description: Scripting with Wireshark's Lua API

summary: 'Wireshark: [Lua API docs](https://www.wireshark.org/docs/wsdg_html_chunked/lua_module_Proto.html) | [Lua Examples](https://wiki.wireshark.org/Lua/Examples)'
weight: 90
draft: false
---

Lua scripting allows you to dynamically access info that might not be available in Wireshark normally! Examples will be added at some point. <!-- TODO -->

To use a lua script with tshark, use option `-X lua_script:<path/to/script>`.  
Obligatory Hello World example, capturing one packet:

```sh
bash$ echo 'print("Hello World!")' > temp.lua
bash$ tshark -X lua_script:temp.lua -c 1
Hello World!
Capturing on 'Wi-Fi: en0'
    1   0.000000 178.33.111.155 → mbp.attlocal.net TLSv1.2 839 Application Data
5 packets dropped from Wi-Fi: en0
1 packet captured
```

## Metaprogramming

There are two libraries I came across that are more metaprogramming that lua dissectors:

* [kaitai-to-wireshark](https://github.com/joushx/kaitai-to-wireshark): Convert a [Kaitai struct](https://github.com/kaitai-io/kaitai_struct) binary file description to a Lua Plugin. Only some elements are supported.
* [pyreshark](https://github.com/ashdnazg/pyreshark): Use Python instead of Lua to communicate with Wireshark. Limited to Python 2.6/ 2.7.

## Lua Dissectors

I've compiled a list of the most popular lua dissectors on github.

Have a dissector you want added to this list? Has a dissector been merged into Wireshark? Make a [pull request](https://github.com/pocc/tshark.dev/pulls).

### Repo Metrics

A ✔ is given for each of the following (in order of importance):

* **D**: Has <u>**D**</u>ocumentation in the form a README. Ideally, this includes separate installation and usage sections.
* **T**: One or more of: <u>**T**</u>est code / CICD / Examples folder
* **I**: Has <u>**I**</u>ssues opened or closed by a different user
* **R**: Has github <u>**R**</u>elease or version. Lacking one may mean that the project is not yet stable.
* **C**: Has multiple <u>**C**</u>ontributors (>1)

Star/Fork count in 2019 Aug [★] and can be converted to an in-browser javascript github API query.
Repos below are on github and have at least 5 stars. None of these repos have been tested.

Note: Any derivative works of Wireshark [MUST use a GPL2-compatible license](https://wiki.wireshark.org/Lua#Beware_the_GPL).

### Github Dissector List

| Name                                                                               | Protocol                                                        | D | T | I | R | C | License  | Last Updated | ★   | Forks | Lang       |
|------------------------------------------------------------------------------------|-----------------------------------------------------------------|---|---|---|---|---|----------|--------------|-----|-------|------------|
| [protobuf_dissector](https://github.com/128technology/protobuf_dissector)          | [protobuf](https://developers.google.com/protocol-buffers/)     | ✔ |   | ✔ |   |   | MIT      | 2015-09      |92    | 43    | Lua        |
| [h264extractor](https://github.com/volvet/h264extractor)                           | [H.264](https://tools.ietf.org/html/rfc6184), [opus](https://en.wikipedia.org/wiki/Opus_(audio_format)) | ✔ |   | ✔ |   | ✔ | GPL2     | 2016-06 | 66    | 32    | Lua        |
| [SAP-Dissection-plug-in-for-Wireshark](https://github.com/SecureAuthCorp/SAP-Dissection-plug-in-for-Wireshark) | SAP Various                         | ✔ | ✔ | ✔ | ✔ | ✔ | GPL2     | 2019-05 |51    | 21    | C          |
| [suriwire](https://github.com/regit/suriwire)                                                         | [Suricata Alert](https://suricata-ids.org/)  | ✔ |   | ✔ | ✔ | ✔ | GPL3     | 2018-06 |49    | 6     | Lua        |
| [lightning-dissector](https://github.com/nayutaco/lightning-dissector)     | [Lightning Network](https://github.com/lightningnetwork/lightning-rfc) (crypto) | ✔ |   | ✔ |   | ✔ | MIT      | 2019-05 |41    | 6     | Lua        |
| [ethereum_devp2p_wireshark_dissector](https://github.com/bcsecorg/ethereum_devp2p_wireshark_dissector) | [devp2p](https://github.com/ethereum/devp2p) (crypto) | ✔|   |   |   |   | ✗        | 2018-06 |38    | 5     | Lua        |
| [wireshark-plugins](https://github.com/kaos/wireshark-plugins)                                                | [CAPN PROTO](https://capnproto.org/) | ✔ |   | ✔ |   | ✔ | Apache2  | 2016-08 |34    | 10    | Lua        |
| [cautious-rotary-phone](https://github.com/legoscia/cautious-rotary-phone) | [Erlang Trace](https://www.erlang-solutions.com/blog/erlang-trace-files-in-wireshark.html) |  |   | ✔ |   |   | Apache2  | 2018-06 |24    | 2     | Lua        |
| [wireshark-http-extra](https://github.com/shomeax/wireshark-http-extra)   | [HTTP](https://tools.ietf.org/html/rfc2616) with extras                  | ✔ |   | ✔ |   |   | ✗        | 2011-09 |23    | 6     | Lua        |
| [wireshark-plugin](https://github.com/cloudshark/wireshark-plugin)                         | Interface for [Cloudshark](https://www.cloudshark.org)  | ✔ |   | ✔ | ✔ | ✔ | GPL2     | 2019-01 |20    | 6     | Lua        |
| [hep-wireshark](https://github.com/sipcapture/hep-wireshark)             | [HEP3](https://github.com/sipcapture/HEP/blob/master/docs/HEP3_rev12.pdf) | ✔ |   | ✔ |   | ✔ | GPL2     | 2019-01 |13    | 8     | Lua        |
| [WiresharkLIFXDissector](https://github.com/mab5vot9us9a/WiresharkLIFXDissector)    | [LIFX](https://lan.developer.lifx.com/docs/header-description) | ✔ |   |   |   |   | GPL3     | 2018-02 |12    | 0     | Lua        |
| [wireshark-plugin-dash](https://github.com/thephez/wireshark-plugin-dash)                                   | [Dash](https://www.dash.org/) (crypto) | ✔ |   | ✔ | ✔ |   | GPL2     | 2018-10 |11    | 3     | C          |
| [amos-ss16-proj3](https://github.com/AMOS-ss16-proj3/amos-ss16-proj3)  | [DOIP](https://pdfs.semanticscholar.org/fbdf/e95a7addaf25402e0fcb30e127f0cd95647b.pdf) | ✔ | ✔ | ✔ | ✔ | ✔ | AGPL3  | 2017-01 |8     | 6     | C          |
| [wireshark-plugin-mqtt](https://github.com/Johann-Angeli/wireshark-plugin-mqtt)                                           | [MQTT](http://mqtt.org/) | ✔ |   | ✔ |   |   | GPL2 | 2014-02 | 8     | 4     | None       |
| [wireshark-stomp-plugin](https://github.com/ficoos/wireshark-stomp-plugin)                                      | [STOMP](https://stomp.github.io/)  | ✔ |   |   |   |   | GPL2 | 2017-05 | 7     | 4     | Lua        |
| [wireshark-plugin-afdx](https://github.com/redlab-i/wireshark-plugin-afdx) | [AFDX](https://en.wikipedia.org/wiki/Avionics_Full-Duplex_Switched_Ethernet) | ✔ | ✔ |   | ✔ |   | GPL2 | 2019-06 |6     | 1     | C          |
| [tox_decoder](https://github.com/cleverca22/tox_decoder)                                                       | [Tox](https://toktok.ltd/spec.html) | ✔ |   |   |   |   | ✗ | 2018-10 | 6     | 2     | C          |
| [wireshark-plugin-rhcs](https://github.com/masatake/wireshark-plugin-rhcs)                                                          | Redhat Cert Protocols | ✔ |   |   |   |   | GPL2 | 2014-01 |5     | 2     | C          |
| [some-ip-dissector](https://github.com/atmes-gmbh/some-ip-dissector)                                                | [SOME/IP](http://some-ip.com/) | ✔ |   |   |   |    | GPL2 | 2019-01 |5     | 2     | Lua        |
| [lppb](https://github.com/othrayte/lppb)                                              | [protobuf](https://developers.google.com/protocol-buffers/)  | ✔ |   | ✔ |   |    | GPL3 | 2016-03 |5     | 2     | Lua        |
| [rfc8450-vc2-dissector](https://github.com/bbc/rfc8450-vc2-dissector)                              | [RFC8450](https://tools.ietf.org/html/rfc8450)  | ✔ |   |   |   | ✔ | GPL2  |2018-09 |5     | 0     | Lua        |

<!--
### Need Maintainers / Out-of-Date

These are old, immature, or merged into Wireshark.

| Name                                                                        | Description                                                             | D | T | I | R | C | License  | Star  | Forks | Lang   |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------|---|---|---|---|---|----------|-------|-------|--------|
| [wireshark-whatsapp](https://github.com/davidgfnet/wireshark-whatsapp)      | Limited to old version of Whatsapp                                      | ✔ |   | ✔ | ✔ |   | ✗        | 165   | 58    | C      |
| [sst-dissector](https://github.com/pathorn/sst-dissector)                   | Fails maturity metrics                                                  |   |   |   |   |   | ✗        |16     | 4     | C++    |
| [WireShark_URI_Decode_LUA_Plugin](https://github.com/shmilylty/WireShark_URI_Decode_LUA_Plugin)                            |  Fails maturity metrics  |   |   |   |   |   | ✗        |15    | 0     | Lua        |
| [wireshark-with-thrift-plugin](https://github.com/andrewcox/wireshark-with-thrift-plugin)    | This is an old Wireshark clone with a plugin added     |   |   |   |   |   |   |13    | 0     | C          |
| [Tibia-Wireshark-Plugin](https://github.com/a3f/Tibia-Wireshark-Plugin)                                                          |     It's been merged into Wireshark |   |   |   |   |   |   |10    | 7     | C          |
| [wireshark_protobuf_plugin](https://github.com/esrrhs/wireshark_protobuf_plugin) | It's in Chinese and has a subfolder called "evil"  |   |   |   |   |   |   |7     | 3     | C++        |
| [pdml2flow](https://github.com/Enteee/pdml2flow)                                                                                                 | Duplicates Wireshark functionality |   |   |   |   |   |   |7     | 0     | Python     |
| [Wireshark_Dissectors](https://github.com/mvijayasekhar/Wireshark_Dissectors)                                                                    | Unclear what protocols this decodes  |   |   |   |   |   |   |6     | 9     | C          |
| [ffxiv-wireshark](https://github.com/Minoost/ffxiv-wireshark)                                                                                    | Not maintained |   |   |   |   |   |   |5     | 0     | Lua        |
| [amd](https://github.com/JonathanBeck/amd)                                                                                                       | Fails maturity metrics |   |   |   |   |   |   |5     | 1     | C          |
| [LoLENetPacketDissector](https://github.com/garthbjerk/LoLENetPacketDissector)                                              | Fails maturity metrics  |   |   |   |   |   | ✗  |1     | 5     | Makefile   |
-->
