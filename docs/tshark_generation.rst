*Make traffic that didn't exist before.*

**Note for Windows users**: *By default, ``randpkt``, ``androiddump``,
``sshdump``, ``udpdump``, and ``randpktdump`` are not installed during a
Windows installation. If you want to use these, you will need to
manually select them for installation.*

randpkt
-------

Note: On Windows, the default is to not install randpkt. You must select
randpkt manually during installation.

Caveat: randpkt -r `crashes for -c >
1 <https://bugs.wireshark.org/bugzilla/show_bug.cgi?id=15627>`__\ 

`randpkt <https://www.wireshark.org/docs/man-pages/randpkt.html>`__
creates malformed packets to test packet sniffers and protocol
implementations. randpkt is limited to outputting pcaps and can only
create random pcaps of one type at a time.

.. raw:: html

   <script id="asciicast-235407" src="https://asciinema.org/a/235407.js" async></script>

Most likely, you want a traffic generator and not a pcap generator:

-  `Scapy <https://scapy.net/>`__: Packet generator with a Python API
   for scripting
-  `Ostinato <https://github.com/pstavirs/ostinato>`__: Network traffic
   generator with a GUI (also has a Python API)
-  `TRex <https://trex-tgn.cisco.com/>`__ is based on DPDK and can
   generate 10Gbps of traffic
-  Ixia/Spirent/etc. have comprehensive paid solutions that are suitable
   for device manufacturers
