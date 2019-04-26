---
title: "TCP Windowing"
date: 2019-03-14T13:06:57Z
author: Ross Jacobs
desc: "TCP Windowing"
tags: 
  - TCP
  - Explanation
image: https://accedian.com/wp-content/uploads/2018/09/TCP-window-syn.png

draft: true
---

_How does TCP respond to latency?_
(Or why using wifi won't affect video streaming as much as a file download)

TCP is a stateful layer 4 networking protocol that creates a virtual circuit.
TCP will verify that data has been received, so it is used in cases where it is
important that data be transmitted/received without transcription errors. Some
common protocols are HTTP/S, FTP, SSH, SMTP, etc.
Compare this to UDP, which is focused on delivery, and is used for realtime
applications.

While UDP doesn't care about latency (citation), TCP is extremely affected by
it. There is a formula (citation) that relates the latency and max possible
throughput. 

Another concept that is important for TCP is windowing. Essentially, it's how
many packets should be sent before an ACK is required. On a connection with a
lot of loss or latency, this will keep going down. It is possible for you to go
down to a zero window. This is bad because no packets will be sent in this
scenario. To avoid this scenario, these are things you can do (add content).

* How does a network card determine how many packets should be sent to send a
  file over FTP?

### Stuff from the RFC (will be organized at some point)

The RFC starts with "Computer communication systems are playing an increasingly
important role in military, government, and civilian environments." Clearly,
this was an understatemnet in retrospect.

RFC Def: "TCP is a connection-oriented, end-to-end reliable protocol"
(got to Section 1.5)

**Asserts**

- You are comfortable using and reading wireshark
- You want to know what TCP is and what to delve deeper into how it works

<script type="text/javascript">
function calc() {
        /* finds out whether the browser uses textContent (Webkit, Opera, Mozilla...)
           or innerText (Microsoft) to set the text of an element/node */
    var textType = Node.textContent ? 'textContent' : 'innerText',
        /* uses parseFloat to create numbers (where possible) from the entered value
           if parseFloat fails to find a number (it's empty or nonsensical)
           then a 0 is used instead (to prevent NaN being the output). */
        num1 = parseFloat(document.getElementById('num1').value) || 0,
        num2 = parseFloat(document.getElementById('num2').value) || 0,
        // retrieves the result element
        result = document.getElementById('result');

    // switch is used to avoid lots of 'if'/'else if' statements,
    // .replace() is used to remove leading, and trailing, whitespace
    // could use .trim() instead, but that'd need a shim for (older?) IE
    switch (document.getElementById('op').value.replace(/\s/g,'')){
        // if the entered value is:
        // a '+' then we set the result element's text to the sum
        case '+':
            result[textType] = num1 + num2;
            break;
        // and so on...
        case '-':
            result[textType] = num1 - num2;
            break;
        case '*':
            result[textType] = num1 * num2;
            break;
        case '/':
            result[textType] = num1 / num2;
            break;
        // because people are going to try, give a default message if a non-math
        // operand is used
        default:
            result[textType] = 'Seriously? You wanted to try math with that operand? Now stop being silly.'
            break;
    }
}
</script> 

<strong>This is a javascript calculator</strong><br>
<input type="text" id="num1" name="num1" placeholder="e.g. 5" />
    <input type="text" id="op" name="op" placeholder="+ - * /" />
    <input type="text" id="num2" name="num2" placeholder="e.g. 7" />
    <br>
    <input type="button" value="Solve" onclick="calc()" />
    <p id="result" value="result"></p>

	
## Operation

## Further Reading

**Questions and Exercises**

- Question/Exercise
- Question/Exercise

**Relevant Articles**

- [Article 1]()
- [Article 2]()

**Sources** [0]() [1]()

## Drafting

### Prewriting

**Audience**

Who is your audience?

**Deliverable**

What is the ONE thing your audince gain from reading this?

**Niche**

What makes this unique compared to existing articles?

### Checklist

** Basic**

- [ ] Intro: How WILL they get the deliverable?
- [ ] 300-600 words
- [ ] Images: Cover image, Reengage image/table
- [ ] Conclusion: How DID they get the deliverable?
- [ ] Questions/Exercises/Call To Action

**Extended**

- [ ] Keywords: Front Matter, Title, Desc, Post: (top, end), Images: (alt,
      title)
- [ ] 3-4 external links
- [ ] 1-2 sources
- [ ] 2-4 internal links
- [ ] Lint!

### Prepublish

- Engaging: Why will the reader read until the end?
- Organized: Identify specific things that the reader might be looking for in
  subsections. How easy are they to find?
- Optimized: Can the Deliverable be provided to the reader in fewer words?
