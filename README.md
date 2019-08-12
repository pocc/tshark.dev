# Packet Analysis with Tshark

[![Netlify Status](https://api.netlify.com/api/v1/badges/a4908e43-12a2-4a57-926d-43b639fed0a4/deploy-status)](https://app.netlify.com/sites/pedantic-lumiere-bf6286/deploys)
<img src="/.github/lighthouse/lighthouse_performance.svg" alt="Lighthouse Performance Badge">
<img src="/.github/lighthouse/lighthouse_best-practices.svg" alt="Lighthouse Best Practices Badge">
<img src="/.github/lighthouse/lighthouse_accessibility.svg" alt="Lighthouse Accessibility Badge">
<img src="/.github/lighthouse/lighthouse_seo.svg" alt="Lighthouse SEO Badge">

<br><br>
<a href="https://tshark.dev"><img src="https://dl.dropboxusercontent.com/s/nrz5y62f4d70p00/tshark_logo.cmp.png" alt="tshark.dev screenshot"/></a>
<br><br>

[tshark.dev](https://tshark.dev) exists to teach you about packet analysis.

The main aim for the site is to provide example usage of
working with packets and hopefully give back something
to the networking community in the process.

This website is built using [hugo](https://gohugo.io/), an open-source static
site generator. Most of the HTML/CSS/JS, shortcodes, and partials come from the [Learn Theme](https://learn.netlify.com/en/).

## Build it

### Serve tshark.dev locally

1. Download the repo

   ```
   git clone https://github.com/pocc/tshark.dev
   cd tshark.dev
   ```

2. [Install hugo](https://gohugo.io/getting-started/installing/)

3. Start the server: `hugo server`

4. Open the address in a browser (default is localhost:1313)

## Contributing

<a href="https://www.patreon.com/bePatron?u=23107486"><img class="patreon" src="https://dl.dropboxusercontent.com/s/olcfumplfco2sov/patreon_button.png" alt="Become a Patron!"></a>

Support me if you like good documentation!

### Raising an Issue

Apart from manually adding an issue, there are multiple ways to raise an issue for this website:

- <u>**Edit this page**</u>: Every page has a link in the upper right corner that can click on to see the page in github. You can then make a pull request once you are satisfied with your changes.
- <u>**Comment**</u>: At the bottom of every article, there is a comments section that is tied to github issues.
- <u>**Email**</u>: If you do not want to use github, you can interact with the contributors by emailing tshark_dev[АТ]fire.fundersclub.com. This will make a github issue that functions like an email chain. As this is public, do not put any PII or sensitive information in it.
- <u>**Contact**</u>: If you do not want your issue to be public, you can contact me directly at rj[АТ]tshark.dev

### Submitting a Pull Request

Contributions to the site are greatly appreciated, if you see a typo or
something that isn't quite right and want to help improve the site for everyone
then please feel free to submit a pull request.

- Start off by forking the repository
- Make any changes you have in mind
- Submit a Pull Request from your forked version back into the original version
  of the site
- I'll review it and approve it
- It'll automatically go live in seconds!

A list of contributors is available [here](https://github.com/pocc/tshark.dev/graphs/contributors).

## Guide Philosophy

- If you can't understand an article, that's a bug
- Bad style and tone are high-priority issues
- Prefer linking to articles than writing new ones
- Link to manpages/Wireshark docs wherever relevant
- Further reading links should provide something that the article above it does not
