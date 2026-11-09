import assert from 'node:assert/strict';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import type { Browser } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

export async function runInteractionChecks(browser: Browser, origin: string, output: string) {
    const results: { name: string; passed: boolean; error?: string }[] = [];
    async function check(name: string, action: () => Promise<void>) {
        try { await action(); results.push({ name, passed: true }); }
        catch (error) { results.push({ name, passed: false, error: String(error) }); }
    }
    const desktop = await browser.newContext({ viewport: { width: 1365, height: 900 }, serviceWorkers: 'block' });
    await desktop.route(/(?:disqus|google-analytics|googletagmanager|doubleclick)/, route => route.abort());
    const page = await desktop.newPage();
    await page.goto(origin + '/setup/install/', { waitUntil: 'load' });
    await check('Skip link moves keyboard focus to main content', async () => {
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement?.classList.contains('skip-link')), true);
        await page.keyboard.press('Enter');
        assert.equal(await page.evaluate(() => document.activeElement?.id), 'body');
    });
    await check('Contents disclosure supports Enter and Escape', async () => {
        await page.locator('#toc-menu').focus();
        await page.keyboard.press('Enter');
        assert.equal(await page.locator('#toc-menu').getAttribute('aria-expanded'), 'true');
        assert.equal(await page.locator('#toc-panel').isVisible(), true);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('#toc-menu').getAttribute('aria-expanded'), 'false');
        assert.equal(await page.evaluate(() => document.activeElement?.id), 'toc-menu');
    });
    await check('Copy buttons are visible on focus and handle clipboard rejection', async () => {
        const button = page.locator('.copy-btn').first();
        await button.focus();
        await page.waitForTimeout(200);
        assert.equal(await button.evaluate(element => Number(getComputedStyle(element).opacity) > 0.9), true);
        await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new Error('Test clipboard rejection'); } } }));
        await page.keyboard.press('Enter');
        await page.waitForFunction(() => [...document.querySelectorAll('.copy-btn span')].some(element => element.textContent === 'Copy unavailable'));
    });
    await check('Search shortcut focuses the compact labeled input and returns real results', async () => {
        await page.keyboard.press('Control+k');
        await page.waitForFunction(() => document.activeElement?.id === 'site-search-input');
        const search = page.locator('#site-search-input');
        assert.equal((await search.boundingBox())?.height, 40);
        await search.fill('kerberos');
        await page.waitForSelector('.pagefind-ui__result-link', { timeout: 15000 });
        const href = await page.locator('.pagefind-ui__result-link').first().getAttribute('href');
        assert.ok(href && !new URL(href, origin).pathname.startsWith('/en/'));
    });
    await check('Command-line sitemap stays readable and preserves monospace columns in light mode', async () => {
        await page.goto(origin + '/', { waitUntil: 'load' });
        const terminal = page.locator('pre.language-text').first();
        const style = await terminal.evaluate(element => {
            const computed = getComputedStyle(element);
            const link = element.querySelector('a');
            const linkStyle = link && getComputedStyle(link);
            return { color: computed.color, background: computed.backgroundColor, whitespace: computed.whiteSpace, font: computed.fontFamily, linkColor: linkStyle?.color, linkFont: linkStyle?.fontFamily, focusable: element.getAttribute('tabindex') };
        });
        assert.equal(style.color, 'rgb(26, 26, 46)');
        assert.equal(style.background, 'rgb(246, 248, 250)');
        assert.equal(style.linkColor, 'rgb(23, 75, 122)');
        assert.equal(style.whitespace, 'pre');
        assert.equal(style.font, style.linkFont);
        assert.equal(style.focusable, '0');
        await terminal.evaluate(element => window.scrollTo(0, element.getBoundingClientRect().top + window.scrollY - 80));
        const rectangle = await terminal.boundingBox();
        assert.ok(rectangle);
        await page.screenshot({ path: join(output, 'command-line-sitemap.png'), clip: { x: Math.max(0, Math.floor(rectangle.x)), y: Math.max(0, Math.floor(rectangle.y)), width: Math.floor(Math.min(rectangle.width, 1365 - rectangle.x)), height: Math.floor(Math.min(620, 900 - rectangle.y)) } });
    });
    await desktop.close();
    const mobile = await browser.newContext({ viewport: { width: 375, height: 812 }, serviceWorkers: 'block' });
    await mobile.route(/(?:disqus|google-analytics|googletagmanager|doubleclick)/, route => route.abort());
    const phone = await mobile.newPage();
    await phone.goto(origin + '/', { waitUntil: 'load' });
    await check('Mobile navigation opens, traps focus, closes, and returns focus', async () => {
        assert.equal(await phone.locator('#sidebar').evaluate(element => (element as HTMLElement).inert), true);
        await phone.locator('#sidebar-toggle').focus();
        await phone.keyboard.press('Enter');
        await phone.waitForFunction(() => document.querySelector('#sidebar-toggle')?.getAttribute('aria-expanded') === 'true');
        assert.equal(await phone.locator('#body').evaluate(element => (element as HTMLElement).inert), true);
        assert.equal(await phone.evaluate(() => document.querySelector('#sidebar')?.contains(document.activeElement)), true);
        await phone.evaluate(() => {
            const controls = [...document.querySelectorAll<HTMLElement>('#sidebar a[href],#sidebar button,#sidebar input,#sidebar select,#sidebar textarea,#sidebar [tabindex="0"]')].filter(element => !(element as HTMLInputElement).disabled && element.getClientRects().length && !element.closest('[hidden]'));
            controls[controls.length - 1].focus();
        });
        await phone.keyboard.press('Tab');
        assert.equal(await phone.evaluate(() => document.activeElement?.id), 'sidebar-close');
        await phone.keyboard.press('Escape');
        await phone.waitForFunction(() => document.querySelector('#sidebar-toggle')?.getAttribute('aria-expanded') === 'false');
        assert.equal(await phone.evaluate(() => document.activeElement?.id), 'sidebar-toggle');
        assert.equal(await phone.locator('#body').evaluate(element => (element as HTMLElement).inert), false);
    });
    await check('Mobile search shortcut opens navigation and focuses search', async () => {
        await phone.keyboard.press('Control+k');
        await phone.waitForFunction(() => document.activeElement?.id === 'site-search-input');
        assert.equal((await phone.locator('#site-search-input').boundingBox())?.height, 40);
        const details = await phone.evaluate(() => {
            const topics = document.querySelector('#sidebar .topics');
            const highlightable = document.querySelector('#sidebar .highlightable');
            const label = document.querySelector('.search-label');
            return { topics: topics && { class: topics.className, display: getComputedStyle(topics).display, visibility: getComputedStyle(topics).visibility, opacity: getComputedStyle(topics).opacity, rectangle: topics.getBoundingClientRect().toJSON(), html: topics.innerHTML.slice(0, 500) }, highlightable: highlightable && { style: highlightable.getAttribute('style'), rectangle: highlightable.getBoundingClientRect().toJSON() }, label: label && { style: getComputedStyle(label).color, rectangle: label.getBoundingClientRect().toJSON() }, links: [...document.querySelectorAll('#sidebar .topics > li > a')].slice(0, 5).map(element => ({ text: element.textContent, display: getComputedStyle(element).display, visibility: getComputedStyle(element).visibility, rectangle: element.getBoundingClientRect().toJSON() })) };
        });
        await writeFile(join(output, 'mobile-navigation-dom.json'), JSON.stringify(details, null, 2));
        await phone.screenshot({ path: join(output, 'mobile-navigation.png') });
        assert.equal(await phone.evaluate(() => {
            const viewport = document.querySelector('#sidebar .highlightable').getBoundingClientRect();
            return [...document.querySelectorAll('#sidebar .topics > li > a')].some(element => {
                const bounds = element.getBoundingClientRect();
                return bounds.bottom > viewport.top && bounds.top < viewport.bottom;
            });
        }), true);
        const navigationAudit = await new AxeBuilder({ page: phone }).include('#sidebar').withRules(['color-contrast', 'label', 'label-title-only', 'link-name', 'label-content-name-mismatch', 'target-size']).analyze();
        assert.deepEqual(navigationAudit.violations.map(rule => rule.id), []);
        await phone.locator('#sidebar-close').click();
        await phone.waitForFunction(() => document.querySelector('#sidebar-toggle')?.getAttribute('aria-expanded') === 'false');
    });
    await check('Incoming English-prefixed links preserve the article destination', async () => {
        await phone.goto(origin + '/en/setup/install/', { waitUntil: 'load' });
        assert.equal(new URL(phone.url()).pathname, '/setup/install/');
        assert.ok(await phone.locator('h1').textContent());
    });
    await check('Capture table numeric filter and keyboard horizontal scrolling work', async () => {
        await phone.goto(origin + '/search/pcaptable/', { waitUntil: 'load' });
        await phone.waitForFunction(() => (window as any).jQuery?.('#pcap-search').DataTable().rows().count() > 1000);
        const initial = await phone.evaluate(() => (window as any).jQuery('#pcap-search').DataTable().rows().count());
        await phone.locator('#pcap-search-qualifiers').fill('packets > 99999999');
        await phone.locator('#pcap-search-qualifiers').press('Enter');
        await phone.waitForFunction(initial => (window as any).jQuery('#pcap-search').DataTable().rows({ search: 'applied' }).count() < initial, initial);
        await phone.locator('#pcap-search-qualifiers').fill('');
        await phone.locator('#pcap-search-qualifiers').press('Enter');
        await phone.locator('#pcap-search').focus();
        await phone.keyboard.press('ArrowRight');
        await phone.waitForFunction(() => (document.querySelector('.dataTables_scrollBody')?.scrollLeft ?? 0) > 0);
    });
    await mobile.close();
    return results;
}
