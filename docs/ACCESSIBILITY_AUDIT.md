# Accessibility, Contrast, and Usability Audit

Audit date: November 8, 2026 (America/Chicago). Authoritative repository: `~/code/tshark.dev`. Baseline commit: `ba4e01b`.

## 1. Complete page inventory

Inventory was recorded before findings or fixes. 76 published HTML URLs include two redirect documents, taxonomy indexes, and the 404 page. Each non-redirect page was checked in four views: 1365px light, 1365px dark with saved dark preference, 375px light, and 320px reflow.

| # | Baseline URL | Page | Expected corrected URL |
|---|---|---|---|
| 1 | `/en/404.html` | 404 Page not found | `/404.html` |
| 2 | `/en/analyze/get_info/capinfos/` | Capinfos | `/analyze/get_info/capinfos/` |
| 3 | `/en/analyze/get_info/` | Get Info | `/analyze/get_info/` |
| 4 | `/en/analyze/get_info/rawshark/` | Rawshark | `/analyze/get_info/rawshark/` |
| 5 | `/en/analyze/` | Analyze Pcap | `/analyze/` |
| 6 | `/en/analyze/packet_hunting/dftest/` | dftest | `/analyze/packet_hunting/dftest/` |
| 7 | `/en/analyze/packet_hunting/` | Packet Hunting | `/analyze/packet_hunting/` |
| 8 | `/en/analyze/packet_hunting/packet_hunting/` | Display Filters | `/analyze/packet_hunting/packet_hunting/` |
| 9 | `/en/analyze/packet_hunting/tshark_analysis/` | Basic Analysis | `/analyze/packet_hunting/tshark_analysis/` |
| 10 | `/en/analyze/performance/` | Performance Optimization | `/analyze/performance/` |
| 11 | `/en/analyze/statistics/` | Statistics (-z) | `/analyze/statistics/` |
| 12 | `/en/capture/capture_filters/` | Capture Filters | `/capture/capture_filters/` |
| 13 | `/en/capture/dumpcap/` | dumpcap | `/capture/dumpcap/` |
| 14 | `/en/capture/` | Capture Pcap | `/capture/` |
| 15 | `/en/capture/limit_size/` | Limit Size | `/capture/limit_size/` |
| 16 | `/en/capture/sources/downloading_file/` | Downloading File | `/capture/sources/downloading_file/` |
| 17 | `/en/capture/sources/extcap_interfaces/` | Extcap | `/capture/sources/extcap_interfaces/` |
| 18 | `/en/capture/sources/` | Interfaces | `/capture/sources/` |
| 19 | `/en/capture/sources/pipe/` | Pipes | `/capture/sources/pipe/` |
| 20 | `/en/capture/sources/sample_interfaces/` | Sample Interfaces | `/capture/sources/sample_interfaces/` |
| 21 | `/en/capture/sources/ssh_interface/` | SSH Capture | `/capture/sources/ssh_interface/` |
| 22 | `/en/capture/tshark/` | tshark | `/capture/tshark/` |
| 23 | `/en/categories/` | Categories | `/categories/` |
| 24 | `/en/edit/editcap/` | editcap | `/edit/editcap/` |
| 25 | `/en/edit/editing_hex/` | Editing Hex | `/edit/editing_hex/` |
| 26 | `/en/edit/` | Edit Pcap | `/edit/` |
| 27 | `/en/edit/mergecap/` | mergecap | `/edit/mergecap/` |
| 28 | `/en/edit/reordercap/` | reordercap | `/edit/reordercap/` |
| 29 | `/en/edit/sanitizing_hex/` | Sanitizing Hex | `/edit/sanitizing_hex/` |
| 30 | `/en/edit/text2pcap/` | text2pcap | `/edit/text2pcap/` |
| 31 | `/en/export/export_pdus/` | PDU Export (-U) | `/export/export_pdus/` |
| 32 | `/en/export/export_regular/` | Plaintext Files | `/export/export_regular/` |
| 33 | `/en/export/export_tls/` | TLS Encrypted | `/export/export_tls/` |
| 34 | `/en/export/` | Export | `/export/` |
| 35 | `/en/formats/captype/` | captype | `/formats/captype/` |
| 36 | `/en/formats/format_usage/` | Format Usage | `/formats/format_usage/` |
| 37 | `/en/formats/` | Capture Formats | `/formats/` |
| 38 | `/en/formats/magic_numbers/` | Magic Numbers | `/formats/magic_numbers/` |
| 39 | `/en/formats/output_options/` | Output Options | `/formats/output_options/` |
| 40 | `/en/formats/pcap_deconstruction/` | Pcap Deconstruction | `/formats/pcap_deconstruction/` |
| 41 | `/en/formats/pcap_format/` | Pcap Format | `/formats/pcap_format/` |
| 42 | `/en/formats/pcapng_format/` | Pcapng Format | `/formats/pcapng_format/` |
| 43 | `/en/formats/sample_capture_headers/` | Capture Headers | `/formats/sample_capture_headers/` |
| 44 | `/en/formats/save_formats/` | Available Save Formats | `/formats/save_formats/` |
| 45 | `/en/generation/` | Generate Pcap | `/generation/` |
| 46 | `/en/generation/program_gen/` | Use a Program | `/generation/program_gen/` |
| 47 | `/en/generation/randpkt/` | Randpkt | `/generation/randpkt/` |
| 48 | `/en/home/` | Home | `/home/` |
| 49 | `/en/` | tshark.dev | `/` |
| 50 | `/en/nextsteps/contributing/` | Contribute | `/nextsteps/contributing/` |
| 51 | `/en/nextsteps/` | Next Steps | `/nextsteps/` |
| 52 | `/en/nextsteps/links/` | Further Reading | `/nextsteps/links/` |
| 53 | `/en/nextsteps/wishlist/` | Wishlist | `/nextsteps/wishlist/` |
| 54 | `/en/packetcraft/add_context/` | Adding Context | `/packetcraft/add_context/` |
| 55 | `/en/packetcraft/add_context/name_resolution/` | Name Resolution | `/packetcraft/add_context/name_resolution/` |
| 56 | `/en/packetcraft/add_context/tshark_colorized/` | Tshark, Colorized | `/packetcraft/add_context/tshark_colorized/` |
| 57 | `/en/packetcraft/add_context/tshark_decryption/` | Decrypt Data | `/packetcraft/add_context/tshark_decryption/` |
| 58 | `/en/packetcraft/arcana/bpf_instructions/` | BPF Instructions | `/packetcraft/arcana/bpf_instructions/` |
| 59 | `/en/packetcraft/arcana/` | Wireshark Arcana | `/packetcraft/arcana/` |
| 60 | `/en/packetcraft/arcana/profiles/` | Configuration Profiles | `/packetcraft/arcana/profiles/` |
| 61 | `/en/packetcraft/arcana/reports/` | Reports (-G) | `/packetcraft/arcana/reports/` |
| 62 | `/en/packetcraft/` | SharkFu | `/packetcraft/` |
| 63 | `/en/packetcraft/scripting/` | Scripting | `/packetcraft/scripting/` |
| 64 | `/en/packetcraft/scripting/lua_scripts/` | Lua Scripts | `/packetcraft/scripting/lua_scripts/` |
| 65 | `/en/packetcraft/scripting/scripted_gen/` | Script Packets | `/packetcraft/scripting/scripted_gen/` |
| 66 | `/en/search/` | Search Pcaps | `/search/` |
| 67 | `/en/search/pcaptable/` | Pcap Table | `/search/pcaptable/` |
| 68 | `/en/setup/about/` | About | `/setup/about/` |
| 69 | `/en/setup/configuration/` | Configuration | `/setup/configuration/` |
| 70 | `/en/setup/` | Start Here | `/setup/` |
| 71 | `/en/setup/install/` | Install | `/setup/install/` |
| 72 | `/en/share/` | Share Results | `/share/` |
| 73 | `/en/share/pcap_preparation/` | Preparing The Capture | `/share/pcap_preparation/` |
| 74 | `/en/share/talking_about_captures/` | Composing the Writeup | `/share/talking_about_captures/` |
| 75 | `/en/tags/` | Tags | `/tags/` |
| 76 | `/` | https://tshark.dev/en/ | `/` |

### Unpublished source-page inventory

| Source | Preview URL | Publication status |
|---|---|---|
| `content/capture/dumpcap_vs_tshark.md` | `/capture/dumpcap_vs_tshark/` | Draft; remains unpublished |
| `content/packetcraft/scripting/wirepy.md` | `/packetcraft/scripting/wirepy/` | Draft; remains unpublished |

Both drafts were additionally built in an isolated preview and tested in all four views (eight combinations). Their draft flags and editorial content were not changed.

## 2. Method and limits

- Automated browser: isolated headless Chromium; axe-core 4.14.0 with WCAG 2 A/AA, 2.1 A/AA, 2.2 AA and best-practice checks. No personal browser profile or login was used.
- All 74 non-redirect documents were scanned in all four views (296 baseline page/view combinations). Redirect documents were inventoried and their targets inspected separately.
- Every generated document was also parsed for headings, internal paths/fragments, image alternatives, frame titles, and table structure. Navigation, plain code and the capture table were reviewed as shared components.
- Representative rendered screenshots were inspected; this is not a claim that every screenshot or every image meaning was manually verified. Dynamic third-party comments/analytics were blocked. External link health, third-party iframe internals, assistive-technology testing, and video captions/transcripts require separate human review.
- Contrast thresholds: 4.5:1 for ordinary text and 3:1 for large text; target-size checks apply the WCAG 2.2 24px minimum and its exceptions, not a blanket 48px rule for inline links.
- Automated success is not WCAG certification. Any axe incomplete result remains a manual-review item and is recorded per page.

Sources: [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

## 3. Findings register

| ID | Priority | Area | Finding and fix objective |
|---|---|---|---|
| A01 | High | Theme contrast | Light-only appearance must override both system dark preference and saved dark preference; remove the switch and automatic dark code/search styles. |
| A02 | High | Code contrast | Legacy code styling leaves light text on the new light code background, especially the annotated help output. Give plain code a readable foreground and check syntax token contrast. |
| A03 | Medium | Oversized and unlabeled search | Sidebar search is 54.4px tall and relies on a title attribute for its accessible name. Use a compact 40px control, visible Search label, sufficient icon/text spacing, and clear keyboard focus. |
| A04 | High | Landmarks and bypass | Use one main landmark, a skip-to-content link, distinct navigation names, and a consistent accessible 404 page. |
| A05 | High | Keyboard navigation | Name the logo and icon controls. Make sidebar and contents controls keyboard-operable with correct expanded states and prevent focus entering an offscreen sidebar. |
| A06 | High | Text and link contrast | Sidebar text reaches only 4.19:1 on highlighted backgrounds; footer and other links rely on color alone. Use darker text and underline prose links. |
| A07 | High | Mobile inline links | A global mobile rule turns all links into 48px flex boxes, breaking prose and annotated help. Limit large targets to navigation and controls; keep inline text links inline. |
| A08 | Medium | Scrollable content | Code blocks and narrow data tables need keyboard-focusable scroll containers without forcing whole-page horizontal scrolling. |
| A09 | Medium | Heading structure | The shared contents label skips from h1 to h4; some section pages also begin at h4. Use sequential headings without losing existing fragment IDs. |
| A10 | Medium | List semantics | The recursive children shortcode emits paragraphs and nested lists outside list items. Keep each description and nested list inside its parent li. |
| A11 | Medium | Form labels | Markdown checklist controls and the capture-table qualifier filter need names tied to visible text; table filters must remain usable on narrow screens. |
| A12 | High | Internal navigation | The /en/ prefix makes hundreds of existing root-relative links fail. Restore root URLs and preserve incoming /en/ links with redirects; repair individual stale fragments and download URLs. |
| A13 | Medium | Images and diagrams | Name the lifecycle navigation diagram, preserve accessible equivalent text navigation on small screens, and give the linked TraceWrangler screenshot meaningful alternative text. |
| A14 | Medium | Chart alternative | The capture-format chart is fixed at 900px wide and needs a text/table alternative that remains available without the external chart library. |
| A15 | Medium | Interaction feedback | Copy buttons are hover-only and clipboard failures are unhandled. Show controls on keyboard focus, announce copy outcomes, and honor reduced-motion preferences. |
| A16 | Medium | Regression tracking | Keep a repeatable all-page audit that fails on newly detected accessibility and internal-link regressions instead of silently accumulating them. |
| A17 | High | Blank-looking mobile menu | Visual review found the old scrollbar could leave the mobile menu apparently empty after keyboard navigation. Use a native flex scroll area and test menu items intersecting the viewport. |
| A18 | Medium | Search CSS and stale output | Legacy searchbox rules reposition labels/spans and fade the placeholder. Isolate the search component and clean generated output before indexing to avoid duplicate old URLs. |

Baseline shared findings: 73 pages with text-contrast failures, 73 with target-size findings, 73 with unnamed links, 61 with heading-order findings, 17 with invalid lists, 14 with unfocusable scroll regions, and two with form-label failures. There were 759 internal-link occurrences failing path/fragment resolution before the URL correction.

### Historical provenance of the link failures

This separates upgrade effects from longstanding content defects. Git history shows `defaultContentLanguageInSubdir = true` was introduced on April 30, 2019 and was also present in the last successfully deployed 2022 source. However, the immutable February 28, 2022 deployment serves articles at root paths (for example, [the old dumpcap page](https://1a98a3ff.tshark-dev.pages.dev/capture/dumpcap/)), while the new Hugo 0.155.2 build generated the articles under `/en/`.

The large group of root-relative path failures therefore appeared with the new build/URL layout; it should not be described as hundreds of independently broken links that had been live for years. The initial checker dropped from 759 failing link occurrences to 13 after restoring root URLs. The 759 figure counts repeated occurrences across pages, not 759 distinct destinations.

The remaining 13 fragment-link occurrences point to seven stale targets. Inspection of the immutable 2022 pages confirms the same absent/mismatched target headings there: `#example-behavior`, `#example-dumpcap-d`, `#2-pass-analysis-with-r-y-and-2`, `#tshark-config-flags`, `#matches` on the section index, `#when-your-pcap-extension-filetype`, and `#determining-file-headers`. These are longstanding content-link defects, not newly changed heading IDs from this upgrade. A stricter file-URL check also identified old trailing-slash download links, which the candidate repairs.

The source flag predates the upgrade; the precise Hugo release in which the effective single-language output behavior changed was not bisected. The observed distinction between the old and newly generated URL layouts is verified.

## 4. Page-by-page analysis

### /en/404.html — 404 Page not found

- Accessibility: landmark-one-main, region across 4 views.
- Contrast: no automated text-contrast failures detected; image/diagram meaning still needs human judgment.
- Usability/content: 0 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Candidate verification at `/404.html`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: none returned by axe.

### /en/analyze/get_info/capinfos/ — Capinfos

- Accessibility: heading-order, label-title-only, landmark-unique, link-name, region, color-contrast, link-in-text-block, target-size across 4 views.
- Contrast: 23 sampled failing nodes across views. Example: li[data-nav-id="/en/analyze/"] > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/get_info/capinfos/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/get_info/ — Get Info

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 20 sampled failing nodes across views. Example: .parent > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 0 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Candidate verification at `/analyze/get_info/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/get_info/rawshark/ — Rawshark

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 58 sampled failing nodes across views. Example: li[data-nav-id="/en/analyze/"] > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/get_info/rawshark/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/ — Analyze Pcap

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 26 sampled failing nodes across views. Example: li[data-nav-id="/en/analyze/statistics/"] > a[href$="statistics/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/packet_hunting/dftest/ — dftest

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 87 sampled failing nodes across views. Example: li[data-nav-id="/en/analyze/"] > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/packet_hunting/dftest/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/packet_hunting/ — Packet Hunting

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 18 sampled failing nodes across views. Example: .parent > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 0 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Candidate verification at `/analyze/packet_hunting/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/packet_hunting/packet_hunting/ — Display Filters

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, scrollable-region-focusable, target-size across 4 views.
- Contrast: 99 sampled failing nodes across views. Example: li[data-nav-id="/en/analyze/"] > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/packet_hunting/packet_hunting/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/packet_hunting/tshark_analysis/ — Basic Analysis

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 36 sampled failing nodes across views. Example: li[data-nav-id="/en/analyze/"] > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/packet_hunting/tshark_analysis/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/performance/ — Performance Optimization

- Accessibility: color-contrast, heading-order, label-title-only, label, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: .parent > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/performance/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/analyze/statistics/ — Statistics (-z)

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: .parent > a[href$="analyze/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/analyze/statistics/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/capture_filters/ — Capture Filters

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 26 sampled failing nodes across views. Example: .parent > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 2 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/capture_filters/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/dumpcap/ — dumpcap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 31 sampled failing nodes across views. Example: .parent > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 2 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/dumpcap/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/ — Capture Pcap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 26 sampled failing nodes across views. Example: li[data-nav-id="/en/capture/sources/"] > a[href$="sources/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/limit_size/ — Limit Size

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: .parent > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/limit_size/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/sources/downloading_file/ — Downloading File

- Accessibility: color-contrast, heading-order, label-title-only, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 38 sampled failing nodes across views. Example: li[data-nav-id="/en/capture/"] > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/sources/downloading_file/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: frame-title-unique, color-contrast.

### /en/capture/sources/extcap_interfaces/ — Extcap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 79 sampled failing nodes across views. Example: li[data-nav-id="/en/capture/"] > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/sources/extcap_interfaces/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/sources/ — Interfaces

- Accessibility: color-contrast, label-title-only, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 41 sampled failing nodes across views. Example: .parent > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 0 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Candidate verification at `/capture/sources/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/sources/pipe/ — Pipes

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 58 sampled failing nodes across views. Example: li[data-nav-id="/en/capture/"] > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/sources/pipe/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/sources/sample_interfaces/ — Sample Interfaces

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 109 sampled failing nodes across views. Example: li[data-nav-id="/en/capture/"] > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/sources/sample_interfaces/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/sources/ssh_interface/ — SSH Capture

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 33 sampled failing nodes across views. Example: li[data-nav-id="/en/capture/"] > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/capture/sources/ssh_interface/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/capture/tshark/ — tshark

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 23 sampled failing nodes across views. Example: .parent > a[href$="capture/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 39 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Specific review: the annotated help output combines inline links and code; verify readable foregrounds and preserve inline layout at narrow widths.
- Candidate verification at `/capture/tshark/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/categories/ — Categories

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 3 sampled failing nodes across views. Example: p:nth-child(4) —   Element has insufficient color contrast of 1.98 (foreground color: #b3b3b3, background color: #f8f9fa, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/categories/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/edit/editcap/ — editcap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 39 sampled failing nodes across views. Example: .parent > a[href$="edit/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 2 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/export/`, `/analyze/`.
- Candidate verification at `/edit/editcap/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/edit/editing_hex/ — Editing Hex

- Accessibility: color-contrast, heading-order, label-title-only, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 73 sampled failing nodes across views. Example: a[href$="editing_hex/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 3 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/export/`, `/analyze/`.
- Candidate verification at `/edit/editing_hex/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast, frame-title-unique.

### /en/edit/ — Edit Pcap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 18 sampled failing nodes across views. Example: li[data-nav-id="/en/edit/editing_hex/"] > a[href$="editing_hex/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/export/`, `/analyze/`.
- Candidate verification at `/edit/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/edit/mergecap/ — mergecap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 39 sampled failing nodes across views. Example: .parent > a[href$="edit/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/export/`, `/analyze/`.
- Candidate verification at `/edit/mergecap/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/edit/reordercap/ — reordercap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 38 sampled failing nodes across views. Example: .parent > a[href$="edit/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/export/`, `/analyze/`.
- Candidate verification at `/edit/reordercap/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/edit/sanitizing_hex/ — Sanitizing Hex

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 45 sampled failing nodes across views. Example: a[href$="sanitizing_hex/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/export/`, `/analyze/`.
- Image review: at least one image has empty alternative text; distinguish decorative images from linked/informative screenshots.
- Candidate verification at `/edit/sanitizing_hex/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/edit/text2pcap/ — text2pcap

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 97 sampled failing nodes across views. Example: .parent > a[href$="edit/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/export/`, `/analyze/`.
- Candidate verification at `/edit/text2pcap/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/export/export_pdus/ — PDU Export (-U)

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 119 sampled failing nodes across views. Example: .parent > a[href$="export/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/analyze/`.
- Candidate verification at `/export/export_pdus/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/export/export_regular/ — Plaintext Files

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 51 sampled failing nodes across views. Example: .parent > a[href$="export/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/analyze/`.
- Candidate verification at `/export/export_regular/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/export/export_tls/ — TLS Encrypted

- Accessibility: color-contrast, heading-order, label-title-only, landmark-unique, link-name, region, link-in-text-block, target-size across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: .highlight:nth-child(18) > .code-block > pre > .language-bash[data-lang="bash"] > .line > .cl —   Element has insufficient color contrast of 1.02 (foreground color: #f5f5f5, background color: #f6f8fa, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/analyze/`.
- Candidate verification at `/export/export_tls/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/export/ — Export

- Accessibility: heading-order, label-title-only, landmark-one-main, link-name, list, region, color-contrast, link-in-text-block, target-size across 4 views.
- Contrast: 14 sampled failing nodes across views. Example: a[href$="export/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/analyze/`.
- Candidate verification at `/export/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/captype/ — captype

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-name, region, link-in-text-block, target-size across 4 views.
- Contrast: 55 sampled failing nodes across views. Example: .highlight:nth-child(13) > .code-block > pre > .language-bash[data-lang="bash"] > .line:nth-child(1) > .cl —   Element has insufficient color contrast of 1.02 (foreground color: #f5f5f5, background color: #f6f8fa, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/captype/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/format_usage/ — Format Usage

- Accessibility: heading-order, label-title-only, landmark-one-main, landmark-unique, link-name, region, scrollable-region-focusable, color-contrast, link-in-text-block, target-size across 4 views.
- Contrast: 35 sampled failing nodes across views. Example: .parent > a[href$="formats/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Specific review: supply the chart values as accessible text/table, and constrain the visualization to the viewport.
- Candidate verification at `/formats/format_usage/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/ — Capture Formats

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, link-name, list, region, link-in-text-block, target-size across 4 views.
- Contrast: 34 sampled failing nodes across views. Example: .line:nth-child(3) > .cl —   Element has insufficient color contrast of 1.02 (foreground color: #f5f5f5, background color: #f6f8fa, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 12 broken internal-link occurrences; 2 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/magic_numbers/ — Magic Numbers

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 44 sampled failing nodes across views. Example: a[href$="magic_numbers/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 0 images; 0 frames; 2 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/magic_numbers/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/output_options/ — Output Options

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: a[href$="output_options/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 2 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/output_options/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/pcap_deconstruction/ — Pcap Deconstruction

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-name, region, scrollable-region-focusable, link-in-text-block, target-size across 4 views.
- Contrast: 79 sampled failing nodes across views. Example: pre:nth-child(11) —   Element has insufficient color contrast of 1.06 (foreground color: #ffffff, background color: #f6f8fa, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/pcap_deconstruction/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/pcap_format/ — Pcap Format

- Accessibility: heading-order, label-title-only, landmark-one-main, landmark-unique, link-name, region, color-contrast, link-in-text-block, target-size across 4 views.
- Contrast: 21 sampled failing nodes across views. Example: .parent > a[href$="formats/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/pcap_format/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/pcapng_format/ — Pcapng Format

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 22 sampled failing nodes across views. Example: .parent > a[href$="formats/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/pcapng_format/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/sample_capture_headers/ — Capture Headers

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 56 sampled failing nodes across views. Example: .active > a —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/sample_capture_headers/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/formats/save_formats/ — Available Save Formats

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-name, region, link-in-text-block, target-size across 4 views.
- Contrast: 100 sampled failing nodes across views. Example: .highlight:nth-child(14) > .code-block > pre > .language-bash[data-lang="bash"] > .line:nth-child(1) > .cl —   Element has insufficient color contrast of 1.02 (foreground color: #f5f5f5, background color: #f6f8fa, font size: 11.3pt (15px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/formats/save_formats/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/generation/ — Generate Pcap

- Accessibility: heading-order, label-title-only, landmark-one-main, link-name, list, region, color-contrast, link-in-text-block, target-size across 4 views.
- Contrast: 11 sampled failing nodes across views. Example: li[data-nav-id="/en/generation/randpkt/"] > a[href$="randpkt/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/generation/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/generation/program_gen/ — Use a Program

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 15 sampled failing nodes across views. Example: a[href$="program_gen/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/generation/program_gen/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/generation/randpkt/ — Randpkt

- Accessibility: color-contrast, heading-order, label-title-only, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 37 sampled failing nodes across views. Example: a[href$="randpkt/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/generation/randpkt/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/home/ — Home

- Baseline: redirect-only document; no independent article UI to scan. Verify its destination after URL normalization.
- Candidate verification at `/home/`: 0 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: none returned by axe.

### /en/ — tshark.dev

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-name, list, region, link-in-text-block, target-size across 4 views.
- Contrast: 10 sampled failing nodes across views. Example: pre —   Element has insufficient color contrast of 1.06 (foreground color: #ffffff, background color: #f6f8fa, font size: 10.5pt (14px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 40 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Specific review: the annotated help output combines inline links and code; verify readable foregrounds and preserve inline layout at narrow widths.
- Candidate verification at `/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/nextsteps/contributing/ — Contribute

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 26 sampled failing nodes across views. Example: .parent > a[href$="nextsteps/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/nextsteps/contributing/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/nextsteps/ — Next Steps

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 12 sampled failing nodes across views. Example: li[data-nav-id="/en/nextsteps/contributing/"] > a[href$="contributing/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/nextsteps/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/nextsteps/links/ — Further Reading

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 26 sampled failing nodes across views. Example: .parent > a[href$="nextsteps/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/nextsteps/links/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/nextsteps/wishlist/ — Wishlist

- Accessibility: color-contrast, heading-order, label-title-only, label, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 35 sampled failing nodes across views. Example: .parent > a[href$="nextsteps/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/nextsteps/wishlist/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/add_context/ — Adding Context

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 22 sampled failing nodes across views. Example: .parent > a[href$="packetcraft/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 0 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Candidate verification at `/packetcraft/add_context/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: none returned by axe.

### /en/packetcraft/add_context/name_resolution/ — Name Resolution

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: li[data-nav-id="/en/packetcraft/"] > a[href$="packetcraft/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 12 broken internal-link occurrences; 1 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/add_context/name_resolution/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/add_context/tshark_colorized/ — Tshark, Colorized

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 47 sampled failing nodes across views. Example: li[data-nav-id="/en/packetcraft/"] > a[href$="packetcraft/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 2 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/add_context/tshark_colorized/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/add_context/tshark_decryption/ — Decrypt Data

- Accessibility: color-contrast, heading-order, label-title-only, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 64 sampled failing nodes across views. Example: li[data-nav-id="/en/packetcraft/"] > a[href$="packetcraft/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/add_context/tshark_decryption/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/arcana/bpf_instructions/ — BPF Instructions

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 114 sampled failing nodes across views. Example: li[data-nav-id="/en/packetcraft/"] > a[href$="packetcraft/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 2 images; 0 frames; 2 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/arcana/bpf_instructions/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/arcana/ — Wireshark Arcana

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 20 sampled failing nodes across views. Example: .parent > a[href$="packetcraft/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 0 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Candidate verification at `/packetcraft/arcana/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: none returned by axe.

### /en/packetcraft/arcana/profiles/ — Configuration Profiles

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: .active > a —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 13 broken internal-link occurrences; 1 images; 0 frames; 2 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/arcana/profiles/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/arcana/reports/ — Reports (-G)

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: .active > a —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/arcana/reports/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/ — SharkFu

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 26 sampled failing nodes across views. Example: a[href$="packetcraft/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/scripting/ — Scripting

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 19 sampled failing nodes across views. Example: a[href$="scripting/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 0 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Candidate verification at `/packetcraft/scripting/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: none returned by axe.

### /en/packetcraft/scripting/lua_scripts/ — Lua Scripts

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 120 sampled failing nodes across views. Example: .active > a —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/scripting/lua_scripts/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/packetcraft/scripting/scripted_gen/ — Script Packets

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 110 sampled failing nodes across views. Example: li[data-nav-id="/en/packetcraft/"] > a[href$="packetcraft/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/packetcraft/scripting/scripted_gen/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/search/ — Search Pcaps

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 22 sampled failing nodes across views. Example: a[href$="search/"] —   Element has insufficient color contrast of 2.52 (foreground color: #ffffff, background color: #58a6ff, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 1 images; 0 frames; 0 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/search/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/search/pcaptable/ — Pcap Table

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 24 sampled failing nodes across views. Example: .parent > a[href$="search/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Specific review: searchable capture data is a complex table; retain column headers, label both filters, provide local horizontal scrolling, and verify keyboard sorting/filtering.
- Candidate verification at `/search/pcaptable/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: aria-required-children, color-contrast, th-has-data-cells.

### /en/setup/about/ — About

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 23 sampled failing nodes across views. Example: .parent > a[href$="setup/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 12 broken internal-link occurrences; 2 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/setup/about/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/setup/configuration/ — Configuration

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 28 sampled failing nodes across views. Example: .parent > a[href$="setup/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/setup/configuration/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/setup/ — Start Here

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 13 sampled failing nodes across views. Example: li[data-nav-id="/en/setup/about/"] > a[href$="about/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/setup/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/setup/install/ — Install

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size, scrollable-region-focusable across 4 views.
- Contrast: 89 sampled failing nodes across views. Example: .parent > a[href$="setup/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 1 tables. Check narrow-screen overflowing content; two-dimensional data tables/code are exceptions only when independently scrollable.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/setup/install/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/share/ — Share Results

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, link-in-text-block, link-name, list, region, target-size across 4 views.
- Contrast: 10 sampled failing nodes across views. Example: li[data-nav-id="/en/share/pcap_preparation/"] > a[href$="pcap_preparation/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/share/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/share/pcap_preparation/ — Preparing The Capture

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 103 sampled failing nodes across views. Example: .parent > a[href$="share/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/share/pcap_preparation/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/share/talking_about_captures/ — Composing the Writeup

- Accessibility: color-contrast, heading-order, label-title-only, landmark-one-main, landmark-unique, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 34 sampled failing nodes across views. Example: .parent > a[href$="share/"] —   Element has insufficient color contrast of 4.19 (foreground color: #6b7280, background color: #eeeff0, font size: 11.4pt (15.2px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 10 broken internal-link occurrences; 1 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`, `/analyze/`.
- Candidate verification at `/share/talking_about_captures/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### /en/tags/ — Tags

- Accessibility: color-contrast, label-title-only, landmark-one-main, link-in-text-block, link-name, region, target-size across 4 views.
- Contrast: 3 sampled failing nodes across views. Example: p:nth-child(4) —   Element has insufficient color contrast of 1.98 (foreground color: #b3b3b3, background color: #f8f9fa, font size: 9.8pt (13px), font weight: normal). Expected contrast ratio of 4.5:1
- Usability/content: 11 broken internal-link occurrences; 0 images; 0 frames; 0 tables. No uncontained horizontal overflow detected by the sampled layout check.
- Broken-link examples: `/packetcraft/`, `/share/`, `/nextsteps/`, `/formats/`, `/edit/`, `/export/`.
- Candidate verification at `/tags/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### / — https://tshark.dev/en/

- Baseline: redirect-only document; no independent article UI to scan. Verify its destination after URL normalization.
- Candidate verification at `/`: 4 views; no automated violations reported; 0 broken internal-link occurrences. Manual-review rules: color-contrast.

### Unpublished draft-page analysis

#### /capture/dumpcap_vs_tshark/

- Scope: unpublished draft preview only; no new article was published or written.
- Accessibility/contrast: 4 views; no automated violations reported.
- Usability: these are unfinished editorial drafts, not completed public guides. Shared navigation, search, headings, contrast, and keyboard fixes apply to their rendered previews. Publication requires a separate editorial decision.

#### /packetcraft/scripting/wirepy/

- Scope: unpublished draft preview only; no new article was published or written.
- Accessibility/contrast: 4 views; no automated violations reported.
- Usability: these are unfinished editorial drafts, not completed public guides. Shared navigation, search, headings, contrast, and keyboard fixes apply to their rendered previews. Publication requires a separate editorial decision.

## 5. Candidate fix status

All confirmed automated findings A01–A18 have candidate fixes. The authoritative checkout and production site remain unchanged until approval. The report does not equate incomplete automated checks with either a pass or a confirmed failure.

| Finding | Candidate implementation | Status |
|---|---|---|
| A01 | Static light theme and light color scheme; removed theme storage/system listeners, switch, and dark syntax/search overrides. | Prepared; locally verified; awaiting publication approval |
| A02 | Readable plain code and the command-line sitemap in light mode: dark text and dark-blue links on a pale background, preserved monospace columns and horizontal scrolling, plus darkened inline color legends. | Prepared; locally verified; awaiting publication approval |
| A03 | 40px labeled search field with visible placeholder, non-overlapping icon, clear focus ring and functional results. | Prepared; locally verified; awaiting publication approval |
| A04 | Main/skip landmarks, named sidebar and contents navigation, and an accessible shared-layout 404. | Prepared; locally verified; awaiting publication approval |
| A05 | Keyboard disclosures, Escape handling, mobile close control, background inertness, focus containment and focus return. | Prepared; locally verified; awaiting publication approval |
| A06 | Darker sidebar/footer/blockquote text, underlined prose links, and readable warning-link colors. | Prepared; locally verified; awaiting publication approval |
| A07 | Large targets scoped to navigation/controls; inline article and footer links keep normal text flow. | Prepared; locally verified; awaiting publication approval |
| A08 | Focusable code/table content and working keyboard horizontal scrolling for the capture table. | Prepared; locally verified; awaiting publication approval |
| A09 | Sequential shared contents heading and section headings; explicit stable fragment IDs where needed. | Prepared; locally verified; awaiting publication approval |
| A10 | Descriptions and child lists nested inside their parent list items. | Prepared; locally verified; awaiting publication approval |
| A11 | Named checklist controls, labeled numeric filter, responsive filter layout and table caption. | Prepared; locally verified; awaiting publication approval |
| A12 | Root canonical URLs restored; /en/ redirects preserve destinations; stale fragments and trailing download slashes repaired. | Prepared; locally verified; awaiting publication approval |
| A13 | Named lifecycle diagram and logo image; preserved logo variants; informative linked screenshots have alt text. | Prepared; locally verified; awaiting publication approval |
| A14 | Responsive chart plus the equivalent data table; historical chart count corrected to the sum of its displayed values. | Prepared; locally verified; awaiting publication approval |
| A15 | Copy controls appear on keyboard focus, announce errors/success, and reduced-motion preferences are respected. | Prepared; locally verified; awaiting publication approval |
| A16 | Repeatable all-page audit, nine interaction checks, and a read-only-permission GitHub validation workflow. | Prepared; locally verified; awaiting publication approval |
| A17 | Removed the obsolete sidebar scrollbar calls/assets and replaced them with a native bounded flex scroll area. | Prepared; locally verified; awaiting publication approval |
| A18 | Isolated site-searchbox CSS, visible label/placeholder, main-content search indexing and clean build output. | Prepared; locally verified; awaiting publication approval |

Validation:

- Full candidate scan: 75 generated HTML documents, including one redirect; all 74 non-redirect pages scanned in four views: 296 page/view combinations.
- Draft preview: two additional unpublished pages in four views: eight combinations.
- Final full scan: zero automated violations, zero failed internal links, and no page-level JavaScript errors reported.
- Recursive content verification: zero broken internal path/fragment/download targets, zero missing local images, and zero missing image alternative attributes.
- Search control height: 40px in every measured view.
- Follow-up interaction run: all nine checks pass, including computed text/link colors and monospace layout in the command-line sitemap. This targeted run supplements the full 296-view scan; it is not another full-page scan.
- Clean dependency installation, npm audit (zero reported vulnerabilities), site build, syntax checks, and patch whitespace checks passed.
- Local runtime: Node 25 on macOS ARM64; CI is configured for Node 22/Linux and has not yet run this new workflow.

| Interaction check | Result |
|---|---|
| Skip link moves keyboard focus to main content | Pass |
| Contents disclosure supports Enter and Escape | Pass |
| Copy buttons are visible on focus and handle clipboard rejection | Pass |
| Search shortcut focuses the compact labeled input and returns real results | Pass |
| Command-line sitemap stays readable and preserves monospace columns in light mode | Pass |
| Mobile navigation opens, traps focus, closes, and returns focus | Pass |
| Mobile search shortcut opens navigation and focuses search | Pass |
| Incoming English-prefixed links preserve the article destination | Pass |
| Capture table numeric filter and keyboard horizontal scrolling work | Pass |

### Palette cross-check

These are source-palette calculations for the stated opaque color pairs, not proof of the colors inside bitmap screenshots or all SVG overlaps. The unrounded ratio is used for the threshold decision.

| Pair | Foreground | Background | Ratio | Normal-text 4.5:1 |
|---|---|---|---|---|
| Body text | #1a1a2e | #ffffff | 17.06:1 | Pass |
| Sidebar text on selected section background | #4b5563 | #eeeff0 | 6.56:1 | Pass |
| Diagram links on node fill | #174b7a | #d6eaf8 | 7.31:1 | Pass |
| Diagram labels on group fill | #1a1a2e | #ffffde | 16.74:1 | Pass |
| Plain code | #1a1a2e | #f6f8fa | 16.02:1 | Pass |
| Warning links | #174b7a | #fae2e2 | 7.33:1 | Pass |
| Search label on header | #0f172a | #1c90f3 | 5.38:1 | Pass |
| BPF red legend | #b91c1c | #ffffff | 6.47:1 | Pass |
| BPF green legend | #3f6212 | #ffffff | 7.08:1 | Pass |
| BPF orange legend | #92400e | #ffffff | 7.09:1 | Pass |
| BPF yellow legend | #713f12 | #ffffff | 8.67:1 | Pass |

## 6. Flagged human-review work and boundaries

| ID | Follow-up | Status |
|---|---|---|
| M01 | VoiceOver/NVDA and real-device assistive-technology review | Not performed; automated keyboard checks are not a substitute |
| M02 | Meaning and contrast inside images, recorded terminal demonstrations, and complex SVG graphics | Alt attributes and source palette checked; full semantic/image certification not claimed |
| M03 | Third-party comments, embedded frames, video/audio captions/transcripts, and external link health | Outside the isolated first-party scan; inspect where applicable before claiming compliance |
| M04 | axe incomplete results | Explicitly retained in every page record; review is required, not an automatic pass/fail |
| M05 | First execution of the new GitHub workflow on Linux/Node 22 | Pending approved publication; locally tested on macOS/Node 25 |

The published tree returned incomplete contrast evaluations on shared complex content, frame-title review on two pages, and complex-table structural review on the capture table. These are not treated as confirmed failures or silently suppressed. The responsive table has a caption, headers, labeled filters, keyboard scrolling, and verified filtering, but still requires a screen-reader pass.

The pre-existing GitHub Worker-deploy workflow still lacks its deployment credentials. This accessibility patch does not change that workflow or Cloudflare account settings. No GitHub issues are automatically created or closed by this audit; findings are tracked here and in audit artifacts.

## 7. Repeating the audit and flagging regressions

```sh
npm ci
npx playwright install chromium
npm run build
npm run audit:a11y
```

The command recursively inventories public/, writes per-page inventory/results, interaction results, a summary and representative screenshots to artifacts/accessibility/, and exits nonzero for definitive automated violations, broken internal paths/fragments, JavaScript errors or failed interaction checks. The GitHub Accessibility checks workflow runs on pushes, pull requests and manual dispatch, uploads these artifacts, and uses read-only repository permissions. It does not deploy and requires no Cloudflare credential.

Keep findings A01–A18 and manual-review flags M01–M05 visible when adding new content or components. Review newly returned incomplete checks as well as red CI failures. Do not claim WCAG conformance solely from a green automated result.
