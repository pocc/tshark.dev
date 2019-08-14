---
title: "Composing the Writeup"
description: "Communication is Key"
date: 2019-08-03
author: Ross Jacobs

summary: '[Expert Information](https://www.wireshark.org/docs/wsug_html_chunked/ChAdvExpert.html)'
weight: 70
draft: false
---

When writing your message, you want to come off as polished and professional as you can.
This page covers how to communicate the technical parts.

## General Structure

<u>___When in doubt, use fewer words.___</u>

It is possible to have a page-long paragraph of an email. Nobody will read this.

It's better to break it up into small sections that each have a purpose.
Make it easy for the recipient to skim and find the information relevant to them.
Generally speaking, you'll want to have at least four sections that answer these questions:

* Problem Statement: What's wrong in a sentence or two?
* Problem State: What work did you do / Are there any new developments related to the problem?
* Analysis: What are the effects of this new problem state?
* Action Items: What needs to be done and by who?

## Possible Sections

This is one possible ordering. Your needs likely differ.

### Problem Statement

{{% notice tip %}}
It may be tempting to add more than one issue to an email. This is a mistake.
You will get a response that reciprocates your lack of clarity.
{{% /notice %}}

Introduce the problem in one sentence. By making it immediately clear what your email is about, you make it easier for your recipient to care.
If your problem statement has more than two sentences, follow it with a section called "Background" or "Description" and move the extra content there.

### Problem State

When communicating work that you've done with others, share details
that are key to the person understanding your message. For example:

* Devices/interfaces you gathered data off of. Include topologies as
appropriate.
* If you are not pre-filtering the packet capture, include the relevant filters.

If your description of the problem is lacking, you may want to gather more data.

### Analysis

<a href="https://www.wireshark.org/docs/wsug_html_chunked/ChAdvExpert.html"><img src="https://dl.dropboxusercontent.com/s/1lmpu4e3uu9yplm/wireshark_expert_item.cmp.png" alt="Wireshark makes it easy to be an expert"></a>

<p style="text-align:center"><i>Wireshark makes it easy to be an expert.</i></p>

As the "domain expert" here, you need to explain what the data means. And if you aren't, triple-check that the way you talk about protocols and the problem state is accurate. Data is important when discussing a problem, but needs context to give it value for the reader.

For capture-based evidence:

* How does the packet capture demonstrate the problem?
* What should be done based upon that conclusion?

### Action Items

Specify which people need to do what based on your analysis. It is easy for there to be a general abdication of responsibility when the who and what are not clear.
Your reader should never ask "What is this email asking me to do?"

Something like this would suffice:

**@Alice**: Test the lotus-o-deltoid model [turboencabulator](https://en.wikipedia.org/wiki/Turboencabulator) that is surmounted atop prefabulated amulite.

**@Bob**: Make a [presentation](https://www.youtube.com/watch?v=Ac7G7xOG2Ag) to our investors on Feb 31, at 9:99.

## Further Reading

_While the following articles focus on asking questions, they are quite relevant in thinking about technical issues correctly._

* 2014-05-21, Eric Steven Raymond, [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html)
* 2013-06-16, Stack Overflow, [How to Ask a Stackoverflow Question](https://stackoverflow.com/help/how-to-ask)
* 2010-08-29, Jon Skeet, [Writing the Perfect Question](https://codeblog.jonskeet.uk/2010/08/29/writing-the-perfect-question/)

**Email Style**
* 2019-06-26, Lazarus Lazaridis, [Composing better emails](https://iridakos.com/how-to/2019/06/26/composing-better-emails.html)