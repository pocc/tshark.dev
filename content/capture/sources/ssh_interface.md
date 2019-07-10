---
title: "SSH Capture"
description: "Capture from a remote machine"
date: 2019-04-08T12:44:45Z
author: Ross Jacobs

summary: ''
weight: 10
draft: false
---

Getting a live capture over an ssh connection is a solved problem on all
platforms. `ssh` works for this purpose on Linux, Macos, and WSL on Windows
while
[`Plink`](https://kaischroed.wordpress.com/2013/01/28/howto-use-wireshark-over-ssh/)
works for Windows PuTTY users. Briefly, I'll go over what
that looks like for `ssh`.

_You can check that your ssh-key is loaded with `ssh-add -L`._

Initially, let's set up variables for cleaner code. Replace each variable in <>
with a value that works for you.

```bash
ssh_opts="<user>@<server> -p <port>"
remote_cmd="sudo /usr/sbin/tcpdump -s0 -n -w - not port <port>"
read_cmd="wireshark -k -i" -OR- "tshark -i"
```

We then have the option of piping directly:

```bash
ssh $ssh_opts $remote_cmd | $read_cmd -
```

__Or__ using a named pipe:

```bash
mkfifo /tmp/capfifo
ssh $ssh_options $ssh_command > /tmp/capinfo &
$read_cmd /tmp/capfifo
```
