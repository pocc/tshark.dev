# tshark.dev Modernization Roadmap

A step-by-step plan to modernize tshark.dev from the current Hugo Learn Theme (2019-era) into a developer-first documentation site with a minimalist, high-performance aesthetic.

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [Task 1: Layout & Modern UI](#2-task-1-layout--modern-ui)
   - [2.1 Navigation: Multi-Level Sidebar](#21-navigation-multi-level-sidebar)
   - [2.2 Command Palette (Cmd+K)](#22-command-palette-cmdk)
   - [2.3 Typography & Font Stack](#23-typography--font-stack)
   - [2.4 Syntax Highlighting](#24-syntax-highlighting)
   - [2.5 Dark Mode](#25-dark-mode)
3. [Task 2: Functionality Enhancements](#3-task-2-functionality-enhancements)
   - [3.1 Interactive Code Snippets](#31-interactive-code-snippets)
   - [3.2 Dynamic Content via Cloudflare Workers](#32-dynamic-content-via-cloudflare-workers)
   - [3.3 Search with Pagefind](#33-search-with-pagefind)
4. [Task 3: Hugo Optimization](#4-task-3-hugo-optimization)
   - [4.1 Shortcode System](#41-shortcode-system)
   - [4.2 Asset Pipeline & Minification](#42-asset-pipeline--minification)
   - [4.3 Hugo Configuration Updates](#43-hugo-configuration-updates)
5. [Implementation Phases](#5-implementation-phases)
6. [File-by-File Migration Checklist](#6-file-by-file-migration-checklist)

---

## 1. Current State Assessment

### What exists today

| Component | Current | Issues |
|-----------|---------|--------|
| Theme | Hugo Learn Theme (blue variant) | 2019-era, jQuery-dependent, vendor-prefix-heavy CSS |
| CSS | 5 stylesheets (~2,200 lines total) | Hardcoded colors, custom grid system, no dark mode, scattered breakpoints |
| JS | jQuery 3.4.1 + 6 plugins (~700 lines custom) | `learn.js` and `hugo-learn.js` are fully jQuery-dependent |
| Search | Lunr.js + autoComplete.js | Works but slow on large index, no Cmd+K UX |
| Fonts | Open Sans, Roboto, Source Code Pro (self-hosted woff2) | Adequate but not "developer-first" |
| Syntax | highlight.js (Atom One Dark Reasonable) | External JS library; Hugo's built-in Chroma is faster and needs no JS |
| Sidebar | jQuery-driven expand/collapse | Could be pure CSS with `<details>` elements |
| Expand shortcode | Inline jQuery `onclick` | Should use HTML5 `<details>/<summary>` |
| Lightbox | Featherlight.js (jQuery plugin) | Replace with native `<dialog>` or CSS-only lightbox |
| Scrollbar | Perfect Scrollbar (jQuery plugin) | Replace with native CSS `overflow: auto` + `::-webkit-scrollbar` |
| Sticky header | jQuery Sticky plugin | Replace with CSS `position: sticky` |
| Comments | Utterances (GitHub Issues) | Modern, keep as-is |
| Analytics | Google Analytics (UA) | UA is deprecated; migrate to GA4 or remove |

### Critical dependencies to remove

1. **jQuery 3.4.1** — used by `learn.js`, `hugo-learn.js`, `search.js`, `expand.html`
2. **Perfect Scrollbar** — jQuery plugin, unnecessary on modern browsers
3. **Featherlight** — jQuery lightbox plugin
4. **jQuery Sticky** — jQuery plugin, replaced by CSS `position: sticky`
5. **highlight.js** — replaced by Hugo's built-in Chroma
6. **autoComplete.js** — replaced by Pagefind UI

---

## 2. Task 1: Layout & Modern UI

### 2.1 Navigation: Multi-Level Sidebar

The existing `layouts/partials/menu.html` (151 lines) uses clean Hugo template recursion to build the sidebar tree. The HTML structure is solid — the problem is that expand/collapse behavior depends on jQuery in `learn.js`.

**Recommendation: Pure CSS + minimal vanilla JS sidebar.**

Replace the jQuery-driven sidebar toggle with CSS-only nesting using `<details>/<summary>` for collapsible sections, plus a small vanilla JS script for persisting open/closed state in `localStorage`.

**New `layouts/partials/sidebar.html` approach:**

```html
<nav id="sidebar" aria-label="Documentation navigation">
  <div class="sidebar-header">
    <a href="/" class="sidebar-logo">
      <img src="/images/tshark_logo.svg" alt="tshark.dev" width="140" height="32">
    </a>
  </div>

  <div class="sidebar-search">
    <!-- Pagefind trigger button or inline search -->
    <button id="search-trigger" aria-label="Search documentation">
      <svg><!-- search icon --></svg>
      <span>Search...</span>
      <kbd>⌘K</kbd>
    </button>
  </div>

  <div class="sidebar-nav">
    {{ template "sidebar-tree" (dict "pages" .Site.Home.Sections "current" .) }}
  </div>
</nav>

{{ define "sidebar-tree" }}
  <ul class="nav-list">
    {{ range .pages.ByWeight }}
      {{ if not .Params.hidden }}
        <li class="nav-item{{ if .IsAncestor $.current }} is-ancestor{{ end }}{{ if eq .RelPermalink $.current.RelPermalink }} is-active{{ end }}">
          {{ if .Sections }}
            <details{{ if .IsAncestor $.current }} open{{ end }}>
              <summary>
                <a href="{{ .RelPermalink }}">{{ .Title }}</a>
              </summary>
              {{ template "sidebar-tree" (dict "pages" (.Pages | union .Sections) "current" $.current) }}
            </details>
          {{ else }}
            <a href="{{ .RelPermalink }}">{{ .Title }}</a>
          {{ end }}
        </li>
      {{ end }}
    {{ end }}
  </ul>
{{ end }}
```

**CSS for the sidebar (add to your main stylesheet):**

```css
/* --- Sidebar --- */
#sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width, 280px);
  height: 100vh;
  overflow-y: auto;
  padding: 1.5rem 0;
  background: var(--color-sidebar-bg);
  border-right: 1px solid var(--color-border);
  z-index: 100;
  transition: transform 0.2s ease;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item a {
  display: block;
  padding: 0.375rem 1rem 0.375rem 1.5rem;
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.5;
  border-left: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s, background 0.15s;
}

.nav-item a:hover {
  color: var(--color-text);
  background: var(--color-sidebar-hover);
}

.nav-item.is-active > a,
.nav-item.is-active > details > summary > a {
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: 500;
}

/* Nested levels get more indent */
.nav-list .nav-list { padding-left: 0.75rem; }
.nav-list .nav-list .nav-list { padding-left: 0.75rem; }

/* details/summary reset */
.nav-item details > summary {
  list-style: none;
  cursor: pointer;
}
.nav-item details > summary::-webkit-details-marker { display: none; }
.nav-item details > summary::marker { display: none; }

/* Chevron indicator */
.nav-item details > summary::before {
  content: '';
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-right: 1.5px solid var(--color-text-muted);
  border-bottom: 1.5px solid var(--color-text-muted);
  transform: rotate(-45deg);
  transition: transform 0.15s;
  margin-right: 0.25rem;
  position: relative;
  top: -1px;
}
.nav-item details[open] > summary::before {
  transform: rotate(45deg);
}

/* Mobile: hide sidebar, show via toggle */
@media (max-width: 768px) {
  #sidebar {
    transform: translateX(-100%);
  }
  #sidebar.is-open {
    transform: translateX(0);
  }
}
```

**Vanilla JS for sidebar toggle (~15 lines, replaces jQuery):**

```js
// sidebar-toggle.js
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      sidebar.classList.toggle('is-open');
      overlay?.classList.toggle('is-visible');
    });
    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      overlay.classList.remove('is-visible');
    });
  }
});
```

### 2.2 Command Palette (Cmd+K)

**Recommendation: ninja-keys (Web Component, framework-agnostic)**

ninja-keys is a Lit-based web component that provides a VS Code / Raycast-style command palette out of the box. It opens with Cmd+K / Ctrl+K, supports nested menus, fuzzy search, hotkeys, and sections. Zero framework dependencies.

**Integration in Hugo:**

Add to `layouts/partials/custom-footer.html`:

```html
<script type="module" src="https://unpkg.com/ninja-keys?module"></script>
<ninja-keys></ninja-keys>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const ninja = document.querySelector('ninja-keys');

  // Build navigation commands from the sidebar links
  const navItems = Array.from(document.querySelectorAll('#sidebar .nav-item a'))
    .map(link => ({
      id: link.getAttribute('href'),
      title: link.textContent.trim(),
      section: 'Navigation',
      handler: () => { window.location.href = link.getAttribute('href'); }
    }));

  // Add utility commands
  const utilityItems = [
    {
      id: 'theme-toggle',
      title: 'Toggle Dark/Light Mode',
      hotkey: 'ctrl+shift+d',
      section: 'Actions',
      handler: () => { document.documentElement.classList.toggle('dark'); }
    },
    {
      id: 'search',
      title: 'Search Documentation...',
      section: 'Actions',
      handler: () => {
        // Trigger Pagefind search modal
        document.querySelector('.pagefind-ui__search-input')?.focus();
      }
    },
    {
      id: 'github',
      title: 'View on GitHub',
      section: 'Links',
      handler: () => { window.open('https://github.com/pocc/tshark.dev', '_blank'); }
    }
  ];

  ninja.data = [...utilityItems, ...navItems];
});
</script>
```

The command palette auto-populates with every page in the sidebar, plus utility actions. Users press Cmd+K to open it, type to fuzzy-filter, and press Enter to navigate.

**Alternative: Combine Pagefind search with a custom Cmd+K trigger.**

If you prefer not to add ninja-keys, you can wire Cmd+K directly to Pagefind's search modal:

```js
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.querySelector('.pagefind-ui__search-input')?.focus();
  }
});
```

This gives you Cmd+K → instant search without a separate library. Less flashy but zero added dependencies.

### 2.3 Typography & Font Stack

**Recommended stack:**

| Role | Font | Why |
|------|------|-----|
| Body text | **Inter** | Designed for screens, excellent readability at small sizes, variable font, open source. The "safe" choice used by GitHub, Vercel, Linear. |
| Code / monospace | **JetBrains Mono** | Ligatures for `=>`, `!=`, `===` etc. make code more readable. Designed specifically for developers. |
| Alternative body | **Geist** (by Vercel) | More opinionated/modern feel. Pairs naturally with Geist Mono. Good if you want the "Vercel/Next.js docs" aesthetic. |

**Implementation — add to `layouts/partials/custom-header.html`:**

Option A: Inter + JetBrains Mono (recommended — broadest appeal):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Option B: Geist + Geist Mono (modern/opinionated):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**CSS custom properties for typography:**

```css
:root {
  /* Font families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', ui-monospace, monospace;

  /* Font sizes — modular scale (1.2 ratio) */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.6;
  --leading-relaxed: 1.75;

  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  font-weight: var(--font-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code, pre, kbd, samp {
  font-family: var(--font-mono);
  font-feature-settings: "liga" on, "calt" on;  /* JetBrains Mono ligatures */
}

pre {
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
}

code:not(pre code) {
  /* Inline code */
  font-size: 0.875em;
  padding: 0.125em 0.375em;
  border-radius: 4px;
  background: var(--color-code-bg);
}

h1 { font-size: var(--text-3xl); font-weight: var(--font-bold); line-height: var(--leading-tight); }
h2 { font-size: var(--text-2xl); font-weight: var(--font-semibold); line-height: var(--leading-tight); }
h3 { font-size: var(--text-xl); font-weight: var(--font-semibold); line-height: var(--leading-tight); }
h4 { font-size: var(--text-lg); font-weight: var(--font-medium); }
```

### 2.4 Syntax Highlighting

**Recommendation: Drop highlight.js entirely. Use Hugo's built-in Chroma engine with CSS classes.**

Chroma runs at build time — zero runtime JS. It supports every language tshark.dev needs (bash, python, ruby, json, yaml, etc.).

**Step 1: Update Hugo config (`config.toml`):**

```toml
[markup]
  [markup.highlight]
    noClasses = false          # Output CSS classes instead of inline styles
    lineNos = false            # No line numbers by default (use {linenos=true} per block)
    lineNumbersInTable = true  # Line numbers in a separate <td> for copy-paste
    tabWidth = 4
    guessSyntax = true         # Attempt to guess language if not specified
```

**Step 2: Generate syntax CSS files:**

```bash
# Light theme (github style)
hugo gen chromastyles --style=github > static/css/syntax-light.css

# Dark theme (github-dark style)
hugo gen chromastyles --style=github-dark > static/css/syntax-dark.css
```

**Step 3: Load both with dark mode media query:**

In your main CSS or `custom-header.html`:

```html
<link rel="stylesheet" href="/css/syntax-light.css" media="(prefers-color-scheme: light)">
<link rel="stylesheet" href="/css/syntax-dark.css" media="(prefers-color-scheme: dark)">
```

Or with the manual toggle approach (see Dark Mode section below), wrap them in a single file:

```css
/* syntax.css */

/* Light mode (default) */
/* ... paste output of: hugo gen chromastyles --style=github ... */

/* Dark mode */
[data-theme="dark"] .chroma .err { /* ... */ }
/* ... paste output of: hugo gen chromastyles --style=github-dark, prefixing every selector with [data-theme="dark"] ... */
```

**Recommended theme pairings (pick one pair):**

| Light | Dark | Aesthetic |
|-------|------|-----------|
| `github` | `github-dark` | Neutral, familiar — GitHub look |
| `catppuccin-latte` | `catppuccin-mocha` | Soft pastels, trendy, easy on eyes |
| `rose-pine-dawn` | `rose-pine` | Muted, warm — Obsidian-like |
| `tokyonight-day` | `tokyonight-night` | Vivid but balanced, VS Code-like |

For a tshark.dev audience of network engineers reading long terminal output, **`github` / `github-dark`** is the safest choice — familiar and high contrast. If you want more personality, **`catppuccin-latte` / `catppuccin-mocha`** is the current darling of developer tooling.

**Step 4: Remove highlight.js from the build.**

In `layouts/partials/footer.html`, remove:
```html
<script src="{{"js/highlight.pack.js" ...}}"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

Also remove `static/css/atom-one-dark-reasonable.css` and `static/js/highlight.pack.js`.

### 2.5 Dark Mode

**Approach: `data-theme` attribute on `<html>`, CSS custom properties, system preference detection, localStorage persistence.**

This is the same pattern used by Tailwind UI, Stripe Docs, and MDN Web Docs.

**Step 1: Define color tokens for both themes.**

Create a new file `static/css/theme-tokens.css` (or integrate into your main stylesheet):

```css
/* ===========================
   LIGHT THEME (default)
   =========================== */
:root,
[data-theme="light"] {
  /* Backgrounds */
  --color-bg: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-tertiary: #f1f3f5;
  --color-sidebar-bg: #f8f9fa;
  --color-sidebar-hover: rgba(0, 0, 0, 0.04);

  /* Text */
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --color-text-faint: #9ca3af;

  /* Borders */
  --color-border: #e5e7eb;
  --color-border-light: #f3f4f6;

  /* Primary accent */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;

  /* Code */
  --color-code-bg: #f3f4f6;
  --color-code-border: #e5e7eb;
  --color-pre-bg: #fafafa;

  /* Notices/callouts */
  --color-info-bg: #eff6ff;
  --color-info-border: #3b82f6;
  --color-warning-bg: #fffbeb;
  --color-warning-border: #f59e0b;
  --color-danger-bg: #fef2f2;
  --color-danger-border: #ef4444;
  --color-tip-bg: #f0fdf4;
  --color-tip-border: #22c55e;
}

/* ===========================
   DARK THEME
   =========================== */
[data-theme="dark"] {
  --color-bg: #0f1117;
  --color-bg-secondary: #161822;
  --color-bg-tertiary: #1e2030;
  --color-sidebar-bg: #161822;
  --color-sidebar-hover: rgba(255, 255, 255, 0.04);

  --color-text: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-text-faint: #64748b;

  --color-border: #2d3348;
  --color-border-light: #232538;

  --color-primary: #60a5fa;
  --color-primary-hover: #93bbfd;

  --color-code-bg: #1e2030;
  --color-code-border: #2d3348;
  --color-pre-bg: #161822;

  --color-info-bg: #172554;
  --color-info-border: #3b82f6;
  --color-warning-bg: #422006;
  --color-warning-border: #f59e0b;
  --color-danger-bg: #450a0a;
  --color-danger-border: #ef4444;
  --color-tip-bg: #052e16;
  --color-tip-border: #22c55e;
}

/* System preference detection (when no manual choice stored) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #0f1117;
    --color-bg-secondary: #161822;
    --color-bg-tertiary: #1e2030;
    --color-sidebar-bg: #161822;
    --color-sidebar-hover: rgba(255, 255, 255, 0.04);
    --color-text: #e2e8f0;
    --color-text-muted: #94a3b8;
    --color-text-faint: #64748b;
    --color-border: #2d3348;
    --color-border-light: #232538;
    --color-primary: #60a5fa;
    --color-primary-hover: #93bbfd;
    --color-code-bg: #1e2030;
    --color-code-border: #2d3348;
    --color-pre-bg: #161822;
    --color-info-bg: #172554;
    --color-info-border: #3b82f6;
    --color-warning-bg: #422006;
    --color-warning-border: #f59e0b;
    --color-danger-bg: #450a0a;
    --color-danger-border: #ef4444;
    --color-tip-bg: #052e16;
    --color-tip-border: #22c55e;
  }
}
```

**Step 2: Theme toggle JS (inline in `<head>` to prevent FOUC):**

Add this to `layouts/partials/header.html` inside `<head>`, **before** any stylesheets:

```html
<script>
  // Prevent flash of wrong theme — runs synchronously before paint
  (function() {
    var stored = localStorage.getItem('theme');
    if (stored) {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
</script>
```

**Step 3: Theme toggle button partial (`layouts/partials/theme-toggle.html`):**

```html
<button id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">
  <!-- Sun icon (shown in dark mode) -->
  <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
  <!-- Moon icon (shown in light mode) -->
  <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
</button>

<style>
  #theme-toggle {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    padding: 6px;
    cursor: pointer;
    color: var(--color-text-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s, border-color 0.15s;
  }
  #theme-toggle:hover {
    color: var(--color-text);
    border-color: var(--color-text-muted);
  }
  /* Show/hide icons based on current theme */
  [data-theme="dark"] .icon-moon { display: none; }
  [data-theme="light"] .icon-sun,
  :root:not([data-theme]) .icon-sun { display: none; }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme]) .icon-moon { display: none; }
    :root:not([data-theme]) .icon-sun { display: block; }
  }
</style>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const isDark = current === 'dark' ||
        (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
      const next = isDark ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  });
</script>
```

**How the three layers interact:**

1. **Inline `<head>` script** — runs synchronously before first paint, reads `localStorage` or system preference, sets `data-theme` on `<html>`. No FOUC.
2. **CSS custom properties** — all colors reference `var(--color-*)`, which resolve differently based on `[data-theme="dark"]` vs `[data-theme="light"]`.
3. **Toggle button** — flips `data-theme`, persists to `localStorage`. System preference changes are respected when no manual override is stored.

---

## 3. Task 2: Functionality Enhancements

### 3.1 Interactive Code Snippets

#### Click to Copy

Modern Clipboard API is supported in all current browsers. No library needed.

**Hugo shortcode: `layouts/shortcodes/codecopy.html`:**

```html
{{ $lang := .Get 0 | default "bash" }}
<div class="code-block">
  <div class="code-header">
    <span class="code-lang">{{ $lang }}</span>
    <button class="copy-btn" aria-label="Copy to clipboard" onclick="copyCode(this)">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      <span>Copy</span>
    </button>
  </div>
  {{ highlight (trim .Inner "\n") $lang "" }}
</div>
```

**JS (add to your main JS file):**

```js
function copyCode(button) {
  const codeBlock = button.closest('.code-block').querySelector('code');
  navigator.clipboard.writeText(codeBlock.textContent).then(() => {
    const span = button.querySelector('span');
    span.textContent = 'Copied!';
    setTimeout(() => { span.textContent = 'Copy'; }, 2000);
  });
}
```

**Alternative: Auto-add copy buttons to ALL code blocks (no shortcode needed).**

This is better for a site with hundreds of existing code blocks — no content changes required:

```js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre > code').forEach((codeEl) => {
    const pre = codeEl.parentElement;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';

    const header = document.createElement('div');
    header.className = 'code-header';

    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy to clipboard');
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>`;

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeEl.textContent).then(() => {
        btn.querySelector('span').textContent = 'Copied!';
        setTimeout(() => { btn.querySelector('span').textContent = 'Copy'; }, 2000);
      });
    });

    header.appendChild(btn);
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(header);
    wrapper.appendChild(pre);
  });
});
```

**CSS for code blocks:**

```css
.code-block {
  position: relative;
  border: 1px solid var(--color-code-border);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
}

.code-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.25rem 0.5rem;
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-code-border);
}

.code-lang {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  font-family: var(--font-sans);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}

.copy-btn:hover {
  color: var(--color-text);
  background: var(--color-sidebar-hover);
}

.code-block pre {
  margin: 0;
  border: none;
  border-radius: 0;
}
```

#### Click to Explain

For "Click to Explain" on complex tshark commands, use a shortcode that renders an annotated breakdown:

**`layouts/shortcodes/explain.html`:**

```html
<div class="explain-block">
  <div class="explain-command">
    {{ highlight (.Get "cmd") "bash" "" }}
  </div>
  <details class="explain-details">
    <summary>Explain this command</summary>
    <div class="explain-content">
      {{ .Inner | markdownify }}
    </div>
  </details>
</div>
```

**Usage in content:**

```markdown
{{</* explain cmd="tshark -r capture.pcap -Y 'tcp.analysis.retransmission' -T fields -e frame.number -e ip.src -e ip.dst -e tcp.srcport" */>}}
- `-r capture.pcap` — Read from file instead of live capture
- `-Y 'tcp.analysis.retransmission'` — Display filter: only show TCP retransmissions
- `-T fields` — Output as tab-separated fields (not full packet decode)
- `-e frame.number` — Print frame number
- `-e ip.src -e ip.dst` — Print source and destination IP
- `-e tcp.srcport` — Print source TCP port
{{</* /explain */>}}
```

### 3.2 Dynamic Content via Cloudflare Workers

Since the site deploys to a Cloudflare Worker, you can intercept requests and inject dynamic content. The static Hugo HTML is the base; the Worker enhances it.

#### Architecture: Worker as a "middleware" in front of static assets

```
User Request → Cloudflare Worker → {
  /api/*            → Dynamic handler (KV/D1 backed)
  Everything else   → Static Hugo HTML from Workers Sites / Pages
}
```

#### Feature 1: Recently Updated Pages

Store last-modified timestamps in Workers KV. Update them via a GitHub Actions webhook on push.

**Worker code (append to your existing worker):**

```typescript
// In your Worker's fetch handler:
if (url.pathname === '/api/recent') {
  const recent = await env.SITE_KV.get('recent-pages', 'json');
  return new Response(JSON.stringify(recent), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' }
  });
}
```

**GitHub Action to update KV on push:**

```yaml
# .github/workflows/update-recent.yml
name: Update Recently Changed Pages
on:
  push:
    branches: [master]
    paths: ['content/**']

jobs:
  update-kv:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      - name: Get changed content files
        id: changed
        run: |
          CHANGED=$(git diff --name-only HEAD~1 HEAD -- content/ | head -10)
          echo "files=$CHANGED" >> "$GITHUB_OUTPUT"
      - name: Update KV
        run: |
          curl -X PUT \
            "https://api.cloudflare.com/client/v4/accounts/${{ secrets.CF_ACCOUNT_ID }}/storage/kv/namespaces/${{ secrets.CF_KV_NAMESPACE_ID }}/values/recent-pages" \
            -H "Authorization: Bearer ${{ secrets.CF_API_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d "$(echo '${{ steps.changed.outputs.files }}' | jq -R -s 'split("\n") | map(select(. != "")) | map({path: ., updated: now | todate})')"
```

**Client-side widget (add to sidebar or homepage):**

```html
<div id="recently-updated"></div>
<script>
  fetch('/api/recent')
    .then(r => r.json())
    .then(pages => {
      const el = document.getElementById('recently-updated');
      if (!el || !pages?.length) return;
      el.innerHTML = '<h4>Recently Updated</h4><ul>' +
        pages.map(p => `<li><a href="${p.path}">${p.path}</a></li>`).join('') +
        '</ul>';
    })
    .catch(() => {}); // Fail silently — it's an enhancement
</script>
```

#### Feature 2: Community-Voted Common Commands

Use Cloudflare D1 (SQLite at the edge) to store vote counts.

**D1 schema:**

```sql
CREATE TABLE command_votes (
  command_id TEXT PRIMARY KEY,
  command_text TEXT NOT NULL,
  votes INTEGER DEFAULT 0,
  last_voted_at TEXT
);

CREATE INDEX idx_votes ON command_votes(votes DESC);
```

**Worker API endpoints:**

```typescript
// POST /api/vote — increment vote for a command
if (url.pathname === '/api/vote' && request.method === 'POST') {
  const { commandId } = await request.json();

  // Rate limit by IP (simple approach)
  const ip = request.headers.get('CF-Connecting-IP');
  const rateKey = `vote:${ip}:${commandId}`;
  const existing = await env.SITE_KV.get(rateKey);
  if (existing) {
    return new Response(JSON.stringify({ error: 'Already voted' }), { status: 429 });
  }

  await env.DB.prepare(
    'UPDATE command_votes SET votes = votes + 1, last_voted_at = datetime("now") WHERE command_id = ?'
  ).bind(commandId).run();

  // Set 24h rate limit
  await env.SITE_KV.put(rateKey, '1', { expirationTtl: 86400 });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// GET /api/top-commands — get top voted commands
if (url.pathname === '/api/top-commands') {
  const results = await env.DB.prepare(
    'SELECT command_id, command_text, votes FROM command_votes ORDER BY votes DESC LIMIT 20'
  ).all();

  return new Response(JSON.stringify(results.results), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' }
  });
}
```

**In-page voting UI (add via JS to code blocks or a dedicated shortcode):**

```html
<!-- Hugo shortcode: layouts/shortcodes/votable.html -->
{{ $id := .Get "id" }}
{{ $cmd := .Get "cmd" }}
<div class="votable-command" data-command-id="{{ $id }}">
  {{ highlight $cmd "bash" "" }}
  <button class="vote-btn" onclick="voteCommand('{{ $id }}')">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    <span class="vote-count">...</span>
  </button>
</div>
```

### 3.3 Search with Pagefind

**Replace Lunr.js + autoComplete.js with Pagefind.**

Pagefind is a fully static search library that runs after Hugo build. It indexes your HTML, creates chunked index files (~100-300KB total), and ships a drop-in UI component. Zero server-side infrastructure.

**Step 1: Install Pagefind.**

Add a `package.json` to the project root (this is just for the build tool, not a runtime dependency):

```json
{
  "private": true,
  "scripts": {
    "build": "hugo --gc --minify && npx pagefind@latest --site public",
    "dev": "hugo server"
  }
}
```

**Step 2: Mark indexable content in Hugo templates.**

In `layouts/partials/header.html`, add `data-pagefind-body` to your main content area:

```html
<!-- In the <body> section of your layout -->
<main data-pagefind-body>
  {{ .Content }}
</main>

<!-- Exclude sidebar, nav, footer from indexing -->
<nav data-pagefind-ignore>...</nav>
```

**Step 3: Add Pagefind UI.**

Replace the contents of `layouts/partials/search.html`:

```html
<div id="search" class="pagefind-search"></div>
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    new PagefindUI({
      element: '#search',
      showSubResults: true,
      showImages: false,
      resetStyles: false
    });
  });
</script>
```

**Step 4: Wire Cmd+K to Pagefind.**

```js
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('.pagefind-ui__search-input');
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});
```

**Step 5: Remove old search infrastructure.**

Delete:
- `static/js/lunr.min.js`
- `static/js/auto-complete.js`
- `static/js/search.js`
- `static/css/auto-complete.css`
- The JSON output in `config.toml` (`home = ["HTML", "RSS", "JSON"]` — remove `"JSON"` if it was only for Lunr)

**Step 6: Style Pagefind to match your theme.**

Override Pagefind's default CSS variables:

```css
.pagefind-ui {
  --pagefind-ui-scale: 0.9;
  --pagefind-ui-primary: var(--color-primary);
  --pagefind-ui-text: var(--color-text);
  --pagefind-ui-background: var(--color-bg);
  --pagefind-ui-border: var(--color-border);
  --pagefind-ui-tag: var(--color-bg-tertiary);
  --pagefind-ui-border-width: 1px;
  --pagefind-ui-border-radius: 8px;
  --pagefind-ui-font: var(--font-sans);
}
```

**Pagefind vs Lunr comparison:**

| Feature | Lunr.js (current) | Pagefind (recommended) |
|---------|-------------------|----------------------|
| Index size (45 pages) | ~50-100KB (full JSON index loaded upfront) | ~20-50KB (chunked, loads on demand) |
| Search speed | Fast | Fast |
| Build integration | Requires JSON output from Hugo | Post-build CLI tool |
| UI | DIY (autoComplete.js) | Built-in UI component |
| Fuzzy matching | Basic | Good |
| Highlighting | Manual | Built-in result highlighting |
| Maintenance | Low activity | Active development |

---

## 4. Task 3: Hugo Optimization

### 4.1 Shortcode System

Replace and extend the existing shortcodes with a comprehensive set for technical documentation.

#### Notice/Callout Boxes

The existing `notice.html` shortcode works but could be enhanced with better styling.

**Updated `layouts/shortcodes/notice.html`:**

```html
{{ $type := .Get 0 | default "info" }}
{{ $title := .Get 1 }}
{{ $icons := dict
  "info" `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  "warning" `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  "danger" `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
  "tip" `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg>`
}}
<div class="notice notice-{{ $type }}" role="alert">
  <div class="notice-header">
    {{ index $icons $type | safeHTML }}
    <span class="notice-title">{{ with $title }}{{ . }}{{ else }}{{ $type | title }}{{ end }}</span>
  </div>
  <div class="notice-content">
    {{ .Inner | markdownify }}
  </div>
</div>
```

**CSS for notices:**

```css
.notice {
  border-left: 4px solid;
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: var(--font-semibold);
  margin-bottom: 0.5rem;
}

.notice-content > :last-child { margin-bottom: 0; }

.notice-info    { background: var(--color-info-bg);    border-color: var(--color-info-border);    }
.notice-warning { background: var(--color-warning-bg); border-color: var(--color-warning-border); }
.notice-danger  { background: var(--color-danger-bg);  border-color: var(--color-danger-border);  }
.notice-tip     { background: var(--color-tip-bg);     border-color: var(--color-tip-border);     }

.notice-info    .notice-header { color: var(--color-info-border);    }
.notice-warning .notice-header { color: var(--color-warning-border); }
.notice-danger  .notice-header { color: var(--color-danger-border);  }
.notice-tip     .notice-header { color: var(--color-tip-border);     }
```

**Usage:**

```markdown
{{%/* notice info */%}}
You must have tshark 2.4.0 or higher to use this feature.
{{%/* /notice */%}}

{{%/* notice warning "Breaking Change" */%}}
This flag was removed in Wireshark 4.0.
{{%/* /notice */%}}

{{%/* notice tip */%}}
Use `-n` to disable name resolution for faster output.
{{%/* /notice */%}}
```

#### Tabbed Code Blocks (OS-specific examples)

**`layouts/shortcodes/tabs.html`:**

```html
{{ $id := .Get "id" | default (printf "tabs-%d" .Ordinal) }}
<div class="tabs" id="{{ $id }}">
  <div class="tab-buttons" role="tablist">
    {{ range $i, $tab := .Params.tabs }}
      <button role="tab"
              aria-selected="{{ if eq $i 0 }}true{{ else }}false{{ end }}"
              aria-controls="{{ $id }}-panel-{{ $i }}"
              class="tab-btn{{ if eq $i 0 }} is-active{{ end }}"
              onclick="switchTab(this, '{{ $id }}')">
        {{ $tab.name }}
      </button>
    {{ end }}
  </div>
  {{ range $i, $tab := .Params.tabs }}
    <div role="tabpanel"
         id="{{ $id }}-panel-{{ $i }}"
         class="tab-panel{{ if eq $i 0 }} is-active{{ end }}"
         {{ if ne $i 0 }}hidden{{ end }}>
      {{ highlight $tab.code ($tab.lang | default "bash") "" }}
    </div>
  {{ end }}
</div>
```

**Because Hugo shortcodes with complex params can be awkward, here's a simpler alternative using named inner shortcodes:**

**`layouts/shortcodes/tabgroup.html`:**

```html
{{ $id := printf "tabgroup-%d" .Ordinal }}
<div class="tabs" id="{{ $id }}">
  {{ .Inner }}
</div>
<script>
  (function() {
    const group = document.getElementById('{{ $id }}');
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');
    buttons.forEach((btn, i) => {
      if (i === 0) { btn.classList.add('is-active'); panels[i]?.classList.add('is-active'); panels[i]?.removeAttribute('hidden'); }
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        panels.forEach(p => { p.classList.remove('is-active'); p.setAttribute('hidden', ''); });
        btn.classList.add('is-active');
        panels[i]?.classList.add('is-active');
        panels[i]?.removeAttribute('hidden');
      });
    });
  })();
</script>
```

**`layouts/shortcodes/tab.html`:**

```html
{{ $name := .Get "name" }}
<button class="tab-btn" role="tab">{{ $name }}</button>
<div class="tab-panel" role="tabpanel" hidden>
  {{ .Inner | markdownify }}
</div>
```

**Usage:**

```markdown
{{</* tabgroup */>}}
{{</* tab name="Linux" */>}}
```bash
sudo apt install wireshark
```
{{</* /tab */>}}
{{</* tab name="macOS" */>}}
```bash
brew install --cask wireshark
```
{{</* /tab */>}}
{{</* tab name="Windows" */>}}
```powershell
choco install wireshark
```
{{</* /tab */>}}
{{</* /tabgroup */>}}
```

**CSS for tabs:**

```css
.tabs {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  margin: 1.5rem 0;
}

.tab-buttons {
  display: flex;
  background: var(--color-bg-tertiary);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
}

.tab-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.tab-btn:hover { color: var(--color-text); }
.tab-btn.is-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.tab-panel { padding: 0; }
.tab-panel pre { margin: 0; border: none; border-radius: 0; }
.tab-panel:not(.is-active) { display: none; }
```

#### Expand/Collapse (replace jQuery version)

Replace the existing `expand.html` shortcode that uses inline jQuery with native HTML5:

**Updated `layouts/shortcodes/expand.html`:**

```html
{{ $title := .Get 0 | default "Click to expand..." }}
<details class="expand-block">
  <summary>{{ $title }}</summary>
  <div class="expand-content">
    {{ .Inner | markdownify }}
  </div>
</details>
```

**CSS:**

```css
.expand-block {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin: 1rem 0;
}

.expand-block summary {
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: var(--font-medium);
  color: var(--color-text);
  list-style: none;
}

.expand-block summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5rem;
  font-size: 0.75em;
  transition: transform 0.15s;
}

.expand-block[open] summary::before {
  transform: rotate(90deg);
}

.expand-content {
  padding: 0 1rem 0.75rem;
  border-top: 1px solid var(--color-border);
}
```

Zero JavaScript. Works in all browsers. Animated with CSS transitions.

### 4.2 Asset Pipeline & Minification

Hugo Pipes provides built-in CSS/JS processing without external build tools.

**Use Hugo Pipes for CSS concatenation + minification.**

Instead of loading 5+ CSS files via `<link>` tags, process them through Hugo Pipes:

In `layouts/partials/header.html`, replace the individual `<link>` tags:

```html
{{ $theme := resources.Get "css/theme-tokens.css" }}
{{ $layout := resources.Get "css/layout.css" }}
{{ $components := resources.Get "css/components.css" }}
{{ $syntax := resources.Get "css/syntax.css" }}

{{ $styles := slice $theme $layout $components $syntax | resources.Concat "css/bundle.css" }}

{{ if hugo.IsProduction }}
  {{ $styles = $styles | minify | fingerprint }}
{{ end }}

<link rel="stylesheet" href="{{ $styles.RelPermalink }}"{{ if hugo.IsProduction }} integrity="{{ $styles.Data.Integrity }}"{{ end }}>
```

**For this to work, CSS files must be in `assets/css/` (not `static/css/`).**

Move your CSS files:
```bash
mkdir -p assets/css
mv static/css/theme-tokens.css assets/css/
# ... etc for files you want processed by Hugo Pipes
```

Files that should stay in `static/` (not processed): third-party CSS like `pagefind-ui.css`.

**JS bundling:**

```html
{{ $sidebarJS := resources.Get "js/sidebar.js" }}
{{ $themeJS := resources.Get "js/theme-toggle.js" }}
{{ $copyJS := resources.Get "js/copy-code.js" }}

{{ $scripts := slice $sidebarJS $themeJS $copyJS | resources.Concat "js/bundle.js" }}

{{ if hugo.IsProduction }}
  {{ $scripts = $scripts | minify | fingerprint }}
{{ end }}

<script src="{{ $scripts.RelPermalink }}" defer></script>
```

**SVG handling:**

Hugo's minifier can break inline SVGs. Add this to `config.toml`:

```toml
[minify]
  [minify.tdewolff]
    [minify.tdewolff.svg]
      precision = 0               # Don't reduce SVG precision
      keepComments = false
    [minify.tdewolff.html]
      keepEndTags = true          # Don't strip end tags
      keepQuotes = true           # Don't strip attribute quotes
      keepWhitespace = false
```

Or if using `hugo.toml` / `hugo.yaml`, the equivalent YAML:

```yaml
minify:
  tdewolff:
    svg:
      precision: 0
      keepComments: false
    html:
      keepEndTags: true
      keepQuotes: true
      keepWhitespace: false
```

### 4.3 Hugo Configuration Updates

**Full modernized `config.toml`:**

```toml
baseURL = "https://tshark.dev/"
languageCode = "en-US"
defaultContentLanguage = "en"
title = "tshark.dev — Packet Analysis"
metaDataFormat = "yaml"

enableRobotsTXT = true
enableGitInfo = true          # Enables .GitInfo for "last modified" dates

# Disable the old theme — we're using custom layouts now
# themesdir = "themes"

[params]
  editURL = "https://github.com/pocc/tshark.dev/blob/master/content/"
  description = "Your complete guide to packet analysis on the command line"
  author = "Ross Jacobs"
  version = "v2.0"

[outputs]
  home = ["HTML", "RSS"]     # Remove JSON (was for Lunr.js; Pagefind indexes HTML)

[markup]
  [markup.highlight]
    noClasses = false         # CSS-based syntax highlighting (no highlight.js)
    lineNos = false
    lineNumbersInTable = true
    tabWidth = 4
    guessSyntax = true
  [markup.goldmark.renderer]
    unsafe = true             # Allow raw HTML in Markdown
  [markup.tableOfContents]
    startLevel = 2
    endLevel = 4
    ordered = false

[minify]
  [minify.tdewolff]
    [minify.tdewolff.svg]
      precision = 0
    [minify.tdewolff.html]
      keepEndTags = true
      keepQuotes = true

[security]
  [security.funcs]
    getenv = ["^HUGO_"]
```

---

## 5. Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Goal: New CSS architecture + dark mode + font stack. No content changes.**

1. Create `assets/css/theme-tokens.css` with the full light/dark color system
2. Create `assets/css/layout.css` with the new sidebar, content area, and responsive grid
3. Create `assets/css/components.css` with notice boxes, code blocks, tabs, etc.
4. Add the FOUC-preventing `<head>` script for dark mode
5. Add the theme toggle partial
6. Switch fonts from Open Sans/Roboto/Source Code Pro to Inter + JetBrains Mono
7. Generate Chroma syntax CSS (`github` + `github-dark`)
8. Set up Hugo Pipes in `header.html` and `footer.html`
9. Update `config.toml` with new markup/highlight/minify settings

**Validation:** Site renders correctly in both light and dark mode. All code blocks use Chroma. No jQuery loaded. No visual regressions on content pages.

### Phase 2: Navigation & Search (Week 3)

**Goal: New sidebar + Pagefind search + Cmd+K.**

1. Replace `layouts/partials/menu.html` with the new `<details>`-based sidebar
2. Write `assets/js/sidebar.js` (vanilla JS, ~15 lines)
3. Install Pagefind, add `package.json` with build script
4. Replace `layouts/partials/search.html` with Pagefind UI
5. Add `data-pagefind-body` to content layouts
6. Add Cmd+K keyboard shortcut wiring
7. (Optional) Add ninja-keys for full command palette
8. Remove: `lunr.min.js`, `auto-complete.js`, `search.js`, `auto-complete.css`
9. Update CI/CD to run `npx pagefind` after `hugo build`

**Validation:** Search works. Cmd+K focuses search. Sidebar expands/collapses. All content pages are indexed.

### Phase 3: Interactive Features (Week 4)

**Goal: Copy buttons, shortcodes, expand blocks.**

1. Write `assets/js/copy-code.js` (auto-adds copy buttons to all `<pre>` blocks)
2. Update `layouts/shortcodes/expand.html` to use `<details>/<summary>`
3. Update `layouts/shortcodes/notice.html` with new SVG icons and styling
4. Create `layouts/shortcodes/tabgroup.html` and `layouts/shortcodes/tab.html`
5. Create `layouts/shortcodes/explain.html` for command explanations
6. Remove jQuery and all jQuery plugins from `footer.html`
7. Remove: `jquery-3.4.1.min.js`, `perfect-scrollbar.*.js`, `featherlight.min.js`, `jquery.sticky.js`, `highlight.pack.js`, `learn.js`, `hugo-learn.js`

**Validation:** All existing shortcodes still render. Copy buttons work. Expand blocks work without JS errors. No jQuery in network tab.

### Phase 4: Dynamic Features (Week 5-6)

**Goal: Cloudflare Worker enhancements.**

1. Add `/api/recent` endpoint to Worker (backed by KV)
2. Add GitHub Action to update KV on content push
3. Add "Recently Updated" widget to sidebar or homepage
4. (Optional) Add `/api/vote` and `/api/top-commands` endpoints (backed by D1)
5. (Optional) Add voting UI to code blocks via shortcode

**Validation:** Recently Updated shows real data. Votes persist across page loads.

### Phase 5: Cleanup & Performance (Week 7)

**Goal: Remove all legacy code, audit performance.**

1. Delete all unused CSS/JS from `static/`
2. Delete `static/css/atom-one-dark-reasonable.css`, `static/css/hybrid.css`
3. Delete `static/css/perfect-scrollbar.min.css`, `static/css/featherlight.min.css`
4. Audit with Lighthouse — target 95+ on all metrics
5. Add `loading="lazy"` to all images in templates
6. Consider moving remaining images to `.webp` format
7. Update Google Analytics from UA to GA4 (or remove entirely)
8. Update `README.md` with new build instructions

---

## 6. File-by-File Migration Checklist

### Files to DELETE

| File | Reason |
|------|--------|
| `static/js/jquery-3.4.1.min.js` | jQuery removed |
| `static/js/perfect-scrollbar.min.js` | jQuery plugin, use CSS `overflow: auto` |
| `static/js/perfect-scrollbar.jquery.min.js` | jQuery plugin wrapper |
| `static/js/jquery.sticky.js` | Use CSS `position: sticky` |
| `static/js/featherlight.min.js` | jQuery lightbox, use `<dialog>` or CSS |
| `static/js/highlight.pack.js` | Use Hugo Chroma (build-time) |
| `static/js/learn.js` | Rewritten as `assets/js/sidebar.js` + `assets/js/copy-code.js` |
| `static/js/hugo-learn.js` | Functionality inlined or removed |
| `static/js/search.js` | Replaced by Pagefind |
| `static/js/lunr.min.js` | Replaced by Pagefind |
| `static/js/auto-complete.js` | Replaced by Pagefind UI |
| `static/css/auto-complete.css` | Replaced by Pagefind UI CSS |
| `static/css/atom-one-dark-reasonable.css` | Replaced by Chroma CSS |
| `static/css/featherlight.min.css` | jQuery plugin removed |
| `static/css/perfect-scrollbar.min.css` | jQuery plugin removed |
| `static/css/hybrid.css` | Replaced by new theme CSS |

### Files to CREATE

| File | Purpose |
|------|---------|
| `assets/css/theme-tokens.css` | CSS custom properties (light + dark) |
| `assets/css/layout.css` | Sidebar, content area, responsive grid |
| `assets/css/components.css` | Notices, tabs, code blocks, expand |
| `assets/css/syntax-light.css` | Chroma `github` theme |
| `assets/css/syntax-dark.css` | Chroma `github-dark` theme |
| `assets/js/sidebar.js` | Sidebar toggle (vanilla JS, ~15 lines) |
| `assets/js/copy-code.js` | Auto copy buttons on code blocks (~25 lines) |
| `assets/js/theme-toggle.js` | Dark mode toggle logic (~20 lines) |
| `layouts/partials/sidebar.html` | New sidebar with `<details>` nesting |
| `layouts/partials/theme-toggle.html` | Toggle button + inline styles |
| `layouts/shortcodes/tabgroup.html` | Tabbed code block container |
| `layouts/shortcodes/tab.html` | Individual tab |
| `layouts/shortcodes/explain.html` | Command explanation breakdown |
| `package.json` | Pagefind build script only |

### Files to MODIFY

| File | Changes |
|------|---------|
| `config.toml` | New markup/highlight/minify config, remove JSON output |
| `layouts/partials/header.html` | Hugo Pipes CSS bundle, font loading, FOUC script |
| `layouts/partials/footer.html` | Hugo Pipes JS bundle, remove all jQuery/plugin scripts |
| `layouts/partials/custom-header.html` | Remove highlight.js, add new fonts, keep Google Charts for Format Usage page |
| `layouts/partials/search.html` | Replace Lunr/autoComplete with Pagefind UI |
| `layouts/partials/menu.html` | Replace with new sidebar partial (or redirect to `sidebar.html`) |
| `layouts/shortcodes/notice.html` | New SVG icons + improved markup |
| `layouts/shortcodes/expand.html` | Replace inline jQuery with `<details>/<summary>` |
| `layouts/_default/single.html` | Add `data-pagefind-body`, update layout structure |
| `layouts/_default/list.html` | Add `data-pagefind-body`, update layout structure |

### Files to KEEP as-is

| File | Reason |
|------|--------|
| `static/css/theme-blue.css` | Already uses CSS custom properties (may be absorbed into `theme-tokens.css`) |
| `static/css/fontawesome-custom.min.css` | Keep until icons are migrated to inline SVG |
| `static/js/modernizr.custom-3.6.0.js` | Remove in Phase 5 (not needed for modern browsers) |
| `layouts/shortcodes/mermaid.html` | Already clean |
| `layouts/shortcodes/children.html` | Complex but working Hugo template logic |
| `layouts/partials/toc.html` | Simple, works fine |
| All `content/**/*.md` files | No content changes needed (shortcode syntax is backward-compatible) |
