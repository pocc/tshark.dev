---
title: "Export"
description: The country of Wireshark has developed a rich and prosperous file exporting industry
date: 2019-07-04
author: Ross Jacobs

pre: <b><i class="fas fa-file-export"></i> </b>
weight: 21
draft: false
---

{{%notice info%}}
You must have [tshark 2.4.0](https://github.com/wireshark/wireshark/commit/20c57cb298e4f3b7ac66a22fb7477e4cf424a11b) or higher to use the `--export-files` flag.
{{%/notice%}}

#### About

tshark has the ability to reassemble files provided a packet capture. These list includes
[HTTP](https://wiki.wireshark.org/Hyper_Text_Transfer_Protocol?action=show&redirect=HTTP), [SMB](https://wiki.wireshark.org/SMB), [IMF](https://wiki.wireshark.org/IMF), [DICOM](https://wiki.wireshark.org/Protocols/dicom?action=show&redirect=DICOM), and [TFTP](https://wiki.wireshark.org/TFTP) for latest Wireshark.
This section covers how to extract files from HTTP in both encypted and unencypted captures.

#### Table of Contents

{{% children description="true" depth="4" %}}
