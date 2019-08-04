---
title: "Writing the Email"
description: "Communication is Key"
date: 2019-08-03
author: Ross Jacobs

summary: ''
weight: 70
draft: false
---

When writing your message, you want to come off as polished and professional as you can.
This page covers how to communicate the technical parts.

## General Structure

<u>___When in doubt, use fewer words.___</u>

It is possible to have a pagelong paragraph of an email. Nobody will read this.

It's better to break it up into small sections that each have a purpose.
Make it easy for the recipient to skim and find the information relevant to them.
Generally speaking, you'll want to have at least four sections:

* Problem Statement: What's wrong in a sentence or two?
* Problem State: What work did you do / Are there any new developments related to the problem?
* Analysis: What are the effects of this new problem state?
* Action Items: What do people in the thread need to do next?

## Possible Sections

This is one possible ordering. Your needs likely differ.

### Problem Statement

{{% notice tip %}}
It may be tempting to add more than one issue to an email. This is a mistake.
The response you get will get will ALWAYS be about the 2nd minor issue.
{{% /notice %}}

Introduce the problem in one sentence. By making it immediately clear what your email is about, you make it easier for your recipient to care.
If you would have a problem statement that is more than two sentences, add it to a section immediately next called "Background" or "Description".

### Problem State

If this email introduces the issue, you may want to have a section before this one called "Background" or "Description".
If it's continuing the thread, then explain any updates you may have.

When communicating work that you've done with others, you should share any relevant details
that may help the person reading your message. For example:

* Devices/interfaces you gathered data off of. Include topologies as
appropriate.
* If you are not pre-filtering the packet capture, include the relevant filters.

### Analysis

You are the domain expert here! And if you are not, triple-check that the way you talk about protocols and the problem state is accurate.
Provide the analysis you gathered in the [analysis](/analysis) section.

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

_While these posts focus on asking questions, they are quite relevant in thinking about technical issues correctly._

* 2014-05-21, Eric Steven Raymond, [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html)
* 2013-06-16, Stack Overflow, [How to Ask a Stackoverflow Question](https://stackoverflow.com/help/how-to-ask)
* 2010-08-29, Jon Skeet, [Writing the Perfect Question](https://codeblog.jonskeet.uk/2010/08/29/writing-the-perfect-question/)
