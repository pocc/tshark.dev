# Contributing to tshark.dev

Thank you for contributing to tshark.dev! This guide helps maintain consistency across articles.

## Style Guide

### Further Reading Sections

All "Further Reading" sections should follow this format:

```markdown
## Further Reading

* YYYY-MM-DD, Author/Source, [Article Title](https://url.com) — Optional description
```

**Examples:**

```markdown
* 2018-12-07, F5, [Decrypting SSL traffic with the SSLKEYLOGFILE environment variable](https://support.f5.com/csp/article/K50557518)
* 2013-08-07, Steven Iveson, [Using Wireshark to Decode SSL/TLS Packets](https://packetpushers.net/using-wireshark-to-decode-ssltls-packets/)
```

**For resources without dates:**
* Use the publication year if known
* For living documents/repos, omit the date:

```markdown
* [Awesome-Fuzzing](https://github.com/secfigo/Awesome-Fuzzing) — A comprehensive list of fuzzing resources
```

### Terminology

- **tshark** (lowercase) - The command-line packet analyzer
- **Wireshark** (capitalized) - Refers to both:
  - The GUI application
  - The Wireshark project as a whole
- When context is needed, use:
  - "Wireshark GUI" for the graphical interface
  - "Wireshark suite" for the project/collection of tools
  - "tshark command" when specifically referring to the CLI tool

### Code Examples

- Use proper syntax highlighting with triple backticks
- Include comments for complex commands
- Show both the command and relevant output when helpful

### Images

- Prefer static images over GIFs for technical documentation
- Use PNG or WebP formats
- Include descriptive alt text
- Set reasonable width constraints (e.g., `style="width:61%"`)

## File Organization

```
content/
├── analyze/     # Packet analysis techniques
├── capture/     # Capturing packets
├── edit/        # Editing packet captures
├── export/      # Exporting data from captures
├── formats/     # File format documentation
├── generation/  # Generating packets
├── nextsteps/   # Additional resources
├── packetcraft/ # Advanced techniques
├── search/      # Finding and searching captures
├── setup/       # Installation and configuration
└── share/       # Sharing and reporting
```

## Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Keep first line under 72 characters
- Reference issue numbers when applicable
- No AI attribution or Co-Authored-By trailers

## Testing

Before submitting a PR:

```bash
# Build the site
hugo --gc

# Check for broken links
hugo server
```

## Questions?

Open an issue or email tshark_dev[АТ]fire.fundersclub.com
