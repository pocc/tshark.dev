import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { resolve, extname, relative, join } from 'node:path';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { runInteractionChecks } from './audit_interactions.mts';

const root = resolve(process.argv[2] ?? 'public');
const output = resolve(process.argv[3] ?? 'artifacts/accessibility');
await mkdir(output, { recursive: true });
const types: Record<string, string> = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
let origin = '';
let redirects: string[][] = [];
try { redirects = (await readFile(join(root, '_redirects'), 'utf8')).split('\n').filter(line => line.trim() && !line.trim().startsWith('#')).map(line => line.trim().split(/\s+/)); } catch {}
const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://localhost');
    const pathname = decodeURIComponent(url.pathname);
    for (const [from, destination, status] of redirects) {
      const prefix = from.endsWith('*') ? from.slice(0, -1) : from;
      if ((from.endsWith('*') && pathname.startsWith(prefix)) || pathname === from) {
        response.writeHead(Number(status) || 301, { Location: destination.replace(':splat', pathname.slice(prefix.length)) + url.search }).end();
        return;
      }
    }
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + '/')) { response.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    let body: Buffer | string = await readFile(file);
    if (file.endsWith('.html')) body = body.toString().replaceAll('https://tshark.dev', origin);
    response.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
    response.end(body);
  } catch { response.writeHead(404).end('Not found'); }
});
await new Promise<void>(done => server.listen(0, '127.0.0.1', done));
const address = server.address();
if (!address || typeof address === 'string') throw new Error('Server unavailable');
origin = `http://127.0.0.1:${address.port}`;
const files: string[] = [];
async function visit(folder: string) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const path = join(folder, entry.name);
    if (entry.isDirectory()) await visit(path);
    else if (entry.name.endsWith('.html')) files.push(path);
  }
}
await visit(root);
const inventory = await Promise.all(files.sort().map(async file => {
  const html = await readFile(file, 'utf8');
  return { path: '/' + relative(root, file).replace(/index\.html$/, ''), title: html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '', redirect: /http-equiv=["']?refresh/i.test(html) };
}));
await writeFile(join(output, 'inventory.json'), JSON.stringify(inventory, null, 2));
const modes = [
  { name: 'desktop-light', width: 1365, height: 900, colorScheme: 'light' as const },
  { name: 'desktop-dark', width: 1365, height: 900, colorScheme: 'dark' as const },
  { name: 'mobile', width: 375, height: 812, colorScheme: 'light' as const },
  { name: 'reflow', width: 320, height: 900, colorScheme: 'light' as const }
];
const selectedPaths = process.env.AUDIT_PATHS?.split(',');
const selectedModes = process.env.AUDIT_MODES?.split(',');
const tasks = inventory.filter(page => !page.redirect && (!selectedPaths || selectedPaths.includes(page.path))).flatMap(page => modes.filter(mode => !selectedModes || selectedModes.includes(mode.name)).map(mode => ({ page, mode })));
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH, headless: true });
const results: unknown[] = [];
let cursor = 0;
async function worker() {
  while (cursor < tasks.length) {
    const task = tasks[cursor++];
    const context = await browser.newContext({ viewport: { width: task.mode.width, height: task.mode.height }, colorScheme: task.mode.colorScheme, serviceWorkers: 'block' });
    await context.route(/(?:disqus|google-analytics|googletagmanager|doubleclick)/, route => route.abort());
    await context.addInitScript(dark => { if (dark) localStorage.setItem('theme', 'dark'); else localStorage.removeItem('theme'); }, task.mode.name === 'desktop-dark');
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    try {
      await page.goto(origin + task.page.path, { waitUntil: 'load', timeout: 30000 });
      await page.waitForTimeout(150);
      const analysis = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
      const measurements = await page.evaluate(() => {
        const content = document.querySelector('#body') ?? document.body;
        const search = document.querySelector('.pagefind-ui__search-input');
        const searchBox = search?.getBoundingClientRect();
        const elements = [...content.querySelectorAll('a[href]')];
        const links = elements.map(element => ({ href: element.getAttribute('href'), text: element.textContent?.trim().slice(0, 80) }));
        const headings = [...content.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(element => ({ level: Number(element.tagName[1]), text: element.textContent?.trim() }));
        const images = [...content.querySelectorAll('img')].map(image => ({ src: image.getAttribute('src'), alt: image.getAttribute('alt'), width: image.naturalWidth }));
        const overflowing = [...document.querySelectorAll('body *')].filter(element => { const rectangle = element.getBoundingClientRect(); const style = getComputedStyle(element); return rectangle.width > 0 && rectangle.right > innerWidth + 3 && rectangle.left >= 0 && style.position !== 'fixed' && !element.closest('#sidebar,pre,.mermaid-map,.dataTables_scroll'); }).slice(0, 12).map(element => ({ tag: element.tagName, class: element.className?.toString(), text: element.textContent?.trim().slice(0, 50) }));
        return { theme: document.documentElement.dataset.theme, main: document.querySelectorAll('main,[role="main"]').length, skipLink: Boolean(document.querySelector('a[href="#body"]')), width: innerWidth, scrollWidth: document.documentElement.scrollWidth, search: searchBox && { width: searchBox.width, height: searchBox.height, label: search?.getAttribute('aria-labelledby') ?? search?.getAttribute('aria-label') }, headings, images, links, overflowing };
      });
      const broken: unknown[] = [];
      for (const link of measurements.links) {
        if (!link.href || /^(mailto:|tel:|javascript:|data:)/.test(link.href)) continue;
        const target = new URL(link.href, origin + task.page.path);
        if (![origin, 'https://tshark.dev'].includes(target.origin)) continue;
        try {
          let file = resolve(root, '.' + decodeURIComponent(target.pathname));
          const info = await stat(file);
          if (info.isDirectory()) { file = join(file, 'index.html'); await stat(file); }
          else if (target.pathname.endsWith('/')) { broken.push({ ...link, kind: 'file-trailing-slash' }); continue; }
          if (target.hash && file.endsWith('.html')) {
            const html = await readFile(file, 'utf8');
            const fragment = decodeURIComponent(target.hash.slice(1));
            if (!html.includes(`id="${fragment}"`) && !html.includes(`id='${fragment}'`) && !html.includes(`name="${fragment}"`)) broken.push({ ...link, kind: 'fragment' });
          }
        } catch { broken.push({ ...link, kind: 'path' }); }
      }
      const violations = analysis.violations.map(rule => ({ id: rule.id, impact: rule.impact, description: rule.description, help: rule.help, helpUrl: rule.helpUrl, count: rule.nodes.length, nodes: rule.nodes.slice(0, 30).map(node => ({ target: node.target, html: node.html.slice(0, 400), failure: node.failureSummary, related: node.any.flatMap(check => check.relatedNodes ?? []).map(related => related.target) })) }));
      results.push({ path: task.page.path, title: task.page.title, mode: task.mode.name, violations, incomplete: analysis.incomplete.map(rule => ({ id: rule.id, count: rule.nodes.length, nodes: rule.nodes.slice(0, 8).map(node => ({ target: node.target, html: node.html.slice(0, 400), messages: [...node.any, ...node.all, ...node.none].map(check => check.message) })) })), measurements, broken, errors });
      if (['/', '/setup/install/', '/search/pcaptable/'].includes(task.page.path) && task.mode.name !== 'reflow') await page.screenshot({ path: join(output, `${task.page.path.replaceAll('/', '_')}-${task.mode.name}.png`), fullPage: true, timeout: 30000 });
    } catch (error) { results.push({ path: task.page.path, mode: task.mode.name, error: String(error) }); }
    await context.close();
    if (results.length % 12 === 0) console.log(`Audited ${results.length}/${tasks.length} page/view combinations`);
  }
}
try {
  await Promise.all(Array.from({ length: 4 }, worker));
  const interactions = await runInteractionChecks(browser, origin, output);
  await writeFile(join(output, 'interactions.json'), JSON.stringify(interactions, null, 2));
  await writeFile(join(output, 'results.json'), JSON.stringify(results, null, 2));
  const summary: Record<string, { pages: Set<string>, occurrences: number }> = {};
  for (const result of results as any[]) for (const rule of result.violations ?? []) { summary[rule.id] ??= { pages: new Set(), occurrences: 0 }; summary[rule.id].pages.add(result.path); summary[rule.id].occurrences += rule.count; }
  const failures = (results as any[]).filter(result => result.error || result.violations?.length || result.broken?.length || result.errors?.length || result.measurements?.main !== 1 || !result.measurements?.skipLink || result.measurements?.theme !== 'light' || (result.measurements?.search && result.measurements.search.height > 44));
  const report = { pages: inventory.length, combinations: results.length, interactions, failures: failures.map(result => ({ path: result.path, mode: result.mode, error: result.error, rules: result.violations?.map((rule: any) => rule.id), broken: result.broken, errors: result.errors })), rules: Object.fromEntries(Object.entries(summary).map(([name, data]) => [name, { pages: data.pages.size, occurrences: data.occurrences }])) };
  await writeFile(join(output, 'summary.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (failures.length || interactions.some(result => !result.passed)) process.exitCode = 1;
} finally { await browser.close(); server.close(); }
