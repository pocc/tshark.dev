/**
 * tshark.dev — Modern vanilla JS
 * Replaces jQuery dependencies for: copy-to-clipboard, sidebar toggle,
 * and Cmd+K search.
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
            btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span aria-live="polite">Copy</span>';

            btn.addEventListener('click', function () {
                var text = codeEl.textContent;
                Promise.resolve().then(function () { return navigator.clipboard.writeText(text); }).then(function () {
                    btn.querySelector('span').textContent = 'Copied!';
                    setTimeout(function () {
                        btn.querySelector('span').textContent = 'Copy';
                    }, 2000);
                }).catch(function () {
                    btn.querySelector('span').textContent = 'Copy unavailable';
                });
            });

            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(btn);
            wrapper.appendChild(pre);
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
                    var toggle = document.getElementById('sidebar-toggle');
                    if (toggle && window.matchMedia('(max-width: 47.938em)').matches && !document.body.classList.contains('sidebar-hidden')) toggle.click();
                    requestAnimationFrame(function () {
                        target.focus();
                        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
                    });
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

    function initAccessibility() {
        document.querySelectorAll('pre, #body table').forEach(function (element) {
            element.setAttribute('tabindex', '0');
        });
        document.querySelectorAll('input[type="checkbox"][disabled]').forEach(function (input) {
            var text = input.closest('li').textContent.trim();
            input.setAttribute('aria-label', text);
        });
        document.querySelectorAll('i.fas, i.fa, i.far').forEach(function (icon) {
            icon.setAttribute('aria-hidden', 'true');
        });
        var sidebar = document.getElementById('sidebar');
        var toggle = document.getElementById('sidebar-toggle');
        var main = document.getElementById('body');
        var skip = document.querySelector('.skip-link');
        if (skip && main) skip.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            main.focus({ preventScroll: true });
            main.scrollIntoView({ behavior: 'auto', block: 'start' });
        });
        var wasOpen = false;
        var mobile = window.matchMedia('(max-width: 47.938em)');
        function syncSidebar() {
            if (!sidebar || !toggle) return;
            var hidden = mobile.matches && !document.body.classList.contains('sidebar-hidden');
            var open = mobile.matches && !hidden;
            sidebar.inert = hidden;
            if (main) main.inert = open;
            if (skip) skip.inert = open;
            toggle.setAttribute('aria-expanded', String(!hidden));
            toggle.setAttribute('aria-label', hidden ? 'Open navigation' : 'Close navigation');
            if (open && !wasOpen) sidebar.querySelector('input,button,a[href]').focus();
            if (hidden && wasOpen) toggle.focus();
            wasOpen = open;
        }
        document.querySelectorAll('[data-sidebar-toggle]').forEach(function (button) {
            button.addEventListener('click', function () { requestAnimationFrame(syncSidebar); });
        });
        var overlay = document.getElementById('overlay');
        if (overlay) overlay.addEventListener('click', function () { requestAnimationFrame(syncSidebar); });
        mobile.addEventListener('change', syncSidebar);
        syncSidebar();
        var contentsButton = document.getElementById('toc-menu');
        var contents = document.getElementById('toc-panel');
        function closeContents() {
            if (!contents || !contentsButton) return;
            contents.hidden = true;
            contents.style.display = 'none';
            contentsButton.setAttribute('aria-expanded', 'false');
        }
        if (contentsButton && contents) {
            contentsButton.addEventListener('click', function () {
                contents.hidden = !contents.hidden;
                contents.style.display = contents.hidden ? 'none' : 'block';
                contentsButton.setAttribute('aria-expanded', String(!contents.hidden));
            });
            document.addEventListener('click', function (event) {
                if (!contentsButton.contains(event.target) && !contents.contains(event.target)) closeContents();
            });
        }
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Tab' && mobile.matches && document.body.classList.contains('sidebar-hidden')) {
                var controls = Array.from(sidebar.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')).filter(function (element) {
                    return !element.disabled && element.getClientRects().length && !element.closest('[hidden]');
                });
                var first = controls[0];
                var last = controls[controls.length - 1];
                if (controls.length && ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last) || !sidebar.contains(document.activeElement))) {
                    event.preventDefault();
                    (event.shiftKey ? last : first).focus();
                }
            }
            if (event.key !== 'Escape') return;
            if (contents && !contents.hidden) {
                closeContents();
                contentsButton.focus();
            } else if (toggle && mobile.matches && document.body.classList.contains('sidebar-hidden')) {
                toggle.click();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initAccessibility();
        initCopyButtons();
        initCmdK();
        initSidebar();
    });
})();
