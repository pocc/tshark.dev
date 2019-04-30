# Editing

_Remember to use a spellchecker when you edit your pcaps_

## filtering packets

### Editcap
Editcap allows you to filter out packets with -A, -B, packet range selection
[packet#-packet#] and inverted selection (-r). If this is a one-off, use
editcap. If you are scripting this, use tshark.

| Editcap filter example   | Use tshark filter instead                      |
|--------------------------|------------------------------------------------|
| `-A 2019-01-23 19:01:23` | `-Y "frame.time >= 1548270083"`                |
| `-B 2019-01-23 19:01:23` | `-Y "frame.time <= 1548270083"`                |
| `3-5`                    | `-Y "frame.number >= 3 and frame.number <= 5"` |
| `-r 3-5`                 | `-Y "frame.number < 3 or frame.number > 5`     |
| `7`                      | `-Y "frame.number == 7"`                       |
| `-r 7`                   | `-Y "frame.number != 7"`                       |

### Using tshark to filter by capture/display filter

In order to create a oneliner and pass the filtered file to editcap, you can
create a temporary file:

```bash
tempfile=$(mktemp)
tshark -r dhcp.pcap -Y "dhcp.type == 1" -w $tempfile 
editcap $tempfile dhcp2.pcap -a 1:"Cool story bro!"
```

This isn't as elegant as reading from stdin, but editcap does not currently have
this capability

tshark can be used to reduce packet size 

## reordercap
Sometimes packets are out of order. Reordercap fixes that.

### Truncate packet size

### Change packet comment
Use -a

### Change number of commets

## mergecap
Merge two or more packet captures together

## text2pcap
Convert a hexstring into a packet capture
