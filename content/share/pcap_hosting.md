---
title: "Hosting It"
description: "Make your capture accessible to others"
date: 2019-08-03
author: Ross Jacobs

summary: ''
weight: 50
draft: false
---

## Hosting it

Use a service like dropbox or google drive to host your file(s).
If the packet capture has sensitive information, [edit it out](/edit/sanitizing_hex) as feasible.

You will also need to share the file with the target audience.
If there are specific recipients in mind, you should specify
their email addresses/access. For corporate infrastructure,
this may be built in to only share with colleagues at the same company.
Regardless, the least access is the best access.

### Package it

If there are multiple files, you may want to create an archive of them.
If your file is too large, you may want to compress it.

On unix systems, tar/gzip are used:

```bash
tar -cfz coolStory.pcap coolStory.tgz
```

On Windows systems, zip/7z are generally used instead.
