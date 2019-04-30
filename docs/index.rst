Packet Analysis, Scripted
===========================

.. Tshark Guide documentation master file, created by
   sphinx-quickstart on Tue Apr 30 20:43:04 2019.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Introduction
------------

In line with the Unix philosophy of "Do one thing well", Wireshark has
many small CLI utilities. If you are reading this article because you
want to know how to use to do X with the CLI, you've come to the right
place. As a contributor to Wireshark and daily user, I am writing this
as an unofficial tshark guide.

Motivation
----------

There are a couple things that motivate this guide:

-  `Wireshark Documentation <https://www.wireshark.org/docs/>`__ is a
   reference, not a guide
-  Documentation on how to do things is often found on
   ask.wireshark.org, Stack Overflow, or various other websites. This
   project aims to collect it all in one place.

Purpose
-------

This guide will help you to capture traffic, edit it, clean it, and send
it. The scenario being that you are reporting on a network problem and
want to use wireshark to provide a packet capture you can then send on
to colleagues/customers.


Welcome to Tshark Guide's documentation!
========================================

.. toctree::
   :maxdepth: 2
   :caption: Contents:

   tshark_analysis
   tshark_bonus
   tshark_capturing
   tshark_colorized
   tshark_decryption
   tshark_editing
   tshark_export_objects
   tshark_extcap
   tshark_generation
   tshark_info
   tshark_livecaptures
   tshark_setup
   tshark_tools

Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`

Closing Thoughts
----------------

Personally, I think that wireshark's CLI needs a better API. For
example, git has a large amount of functionality, but.

Further Reading
---------------

*The end of one adventure is the beginning of another.*

Network Scripting with Python
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  `Python for Network
   Engineers <https://www.youtube.com/watch?v=s6SIVc7C5U0>`__: David
   Bombal is a CCIE who has good lectures on using Python (costs $$$)
-  `Sentdex Tutorials <https://www.youtube.com/user/sentdex>`__: A
   Pythonista who will inspire you
-  `Python Guide <https://docs.python-guide.org/>`__: For when you want
   to turn your script into a project.

Wireshark
~~~~~~~~~

-  `Official Docs <https://www.wireshark.org/docs/man-pages/>`__
-  `Get the Sourcecode <https://www.wireshark.org/develop.html>`__
-  `File a Bug Report <https://wiki.wireshark.org/ReportingBugs>`__
-  `Contribute! <https://www.wireshark.org/docs/wsdg_html_chunked/>`__
