Color
=====

   *"With color one obtains an energy that seems to stem from
   witchcraft."
   -- Henri Matisse*

Part of the allure of Wireshark is the ability to identify networking
problems with the use of color. Relatively recently, tshark has gained
this ability too with the ``--color`` flag. This article goes over how
to set it up on your system.

|image0| *Demonstration of tshark --color on Windows, Macos, Linux, and
BSD.*

Using a compatible terminal
---------------------------

Support for terminal colors depends on whether "truecolor" 24-bit colors
are implemented. One way to check for it is to query the ``$COLORTERM``
environment variable. If supported, ``echo $COLORTERM`` will return
``truecolor`` or ``24bit``.

`This repo <https://github.com/termstandard/colors>`__ keeps track
whether your ${TERMINAL} supports truecolor as well as general truecolor
info.

``alias tshark='tshark --color'``

| I have tested truecolor and ``tshark --color`` compatability across
  multiple terminals.
| These are my recommendations:

======== ==================================================================================================================================================================================================================
Platform Recommendations
======== ==================================================================================================================================================================================================================
Windows  `Mobaxterm <https://mobaxterm.mobatek.net/>`__, `WSL <http://wsl-guide.org/en/latest/installation.html>`__ `1 <Note%20that%20you%20can%20call%20Powershell%20from%20Mobaxterm%20or%20WSL,%20but%20given%20that>`__
Macos    `iTerm2 <https://www.iterm2.com/>`__, `upterm <https://github.com/railsware/upterm>`__
Linux    `gnome-terminal <http://manpages.ubuntu.com/manpages/cosmic/man1/gnome-terminal.1.html>`__, Any terminal using ``libvte``
BSD      `gnome-terminal <http://manpages.ubuntu.com/manpages/cosmic/man1/gnome-terminal.1.html>`__, Any terminal using ``libvte``
======== ==================================================================================================================================================================================================================

Powershell does not support truecolor, you are limited to using bash
pseudo-terminals on Windows to get truecolor.

Windows Considerations
----------------------

*As with most things terminal, using on Windows is harder*

The problem
~~~~~~~~~~~

NOTE: I filed a `bug for tshark on
Windows <https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15659>`__,
and a fix may be available in the latest dev version of Wireshark.

-  The Windows version of tshark will print 16 colors, instead of 24bit
   "truecolor".
-  The Linux version of tshark usable by WSL and Mobaxterm can print in
   truecolor
-  The Linux version of tshark (like tcpdump on WSL) is not able to
   capture packets. This is because sockets (SOCK_RAW/SOCK_PACKET) are
   `not yet
   implemented <https://github.com/Microsoft/WSL/issues/1515>`__ in WSL.

The hack
~~~~~~~~

I created a hack that will allow you to use ``tshark --color`` while
capturing on Windows by using both Windows and Linux tsharks.

#. `Install Wireshark </post/wireshark-setup>`__ # Link to the Windows
   section
#. `Install WSL <http://wsl-guide.org/en/latest/installation.html>`__
#. Install tshark on WSL with ``sudo apt install tshark``
#. Add this `bash
   function <https://gist.github.com/pocc/b2017eeb2609f80a38d8db811d1c6cb8>`__
   to your ``~/.bashrc``:
#. ``source ~/.bashrc``
#. Test by live capturing with the ``tshark`` command with no options:

.. |image0| image:: https://dl.dropboxusercontent.com/s/pt45pphiekt4srh/packets_the_universal_interface.png

