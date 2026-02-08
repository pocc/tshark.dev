/**
 * tshark.dev — Modern vanilla JS
 * Replaces jQuery dependencies for: copy-to-clipboard, sidebar toggle,
 * dark mode, and Cmd+K search.
 */

(function () {
    'use strict';

    /* =========================================================================
       Copy-to-Clipboard (auto-attaches to all <pre> blocks)
       ========================================================================= */
    function initCopyButtons() {
        document.querySelectorAll('pre > code').forEach(function (codeEl) {
            var pre = codeEl.parentElement;
            // Skip if already wrapped
            if (pre.parentElement && pre.parentElement.classList.contains('code-block')) return;

            var wrapper = document.createElement('div');
            wrapper.className = 'code-block';

            var btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.setAttribute('aria-label', 'Copy to clipboard');
            btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Copy</span>';

            btn.addEventListener('click', function () {
                var text = codeEl.textContent;
                navigator.clipboard.writeText(text).then(function () {
                    btn.querySelector('span').textContent = 'Copied!';
                    setTimeout(function () {
                        btn.querySelector('span').textContent = 'Copy';
                    }, 2000);
                });
            });

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(btn);
            wrapper.appendChild(pre);
        });
    }

    /* =========================================================================
       Dark Mode Toggle
       ========================================================================= */
    function initThemeToggle() {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;

        btn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme');
            var isDark = current === 'dark' ||
                (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
            var next = isDark ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);

            // Update utterances theme if present
            var utterances = document.querySelector('.utterances-frame');
            if (utterances) {
                utterances.contentWindow.postMessage(
                    { type: 'set-theme', theme: next === 'dark' ? 'github-dark' : 'github-light' },
                    'https://utteranc.es'
                );
            }
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        });
    }

    /* =========================================================================
       Cmd+K Search Focus
       ========================================================================= */
    function initCmdK() {
        document.addEventListener('keydown', function (e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                // Try Pagefind first, then fallback to existing search
                var pagefindInput = document.querySelector('.pagefind-ui__search-input');
                var legacyInput = document.querySelector('[data-search-input]');
                var target = pagefindInput || legacyInput;
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    /* =========================================================================
       Sidebar Enhancements
       ========================================================================= */
    function initSidebar() {
        // Persist sidebar scroll position
        var sidebar = document.querySelector('#sidebar .highlightable');
        if (sidebar) {
            var savedScroll = sessionStorage.getItem('sidebar-scroll');
            if (savedScroll) {
                sidebar.scrollTop = parseInt(savedScroll, 10);
            }
            sidebar.addEventListener('scroll', function () {
                sessionStorage.setItem('sidebar-scroll', sidebar.scrollTop);
            });
        }
    }

    /* =========================================================================
       Init on DOM ready
       ========================================================================= */
    document.addEventListener('DOMContentLoaded', function () {
        initCopyButtons();
        initThemeToggle();
        initCmdK();
        initSidebar();
    });
})();
