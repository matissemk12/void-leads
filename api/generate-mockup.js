function getAccent(service) {
  const s = (service || '').toLowerCase();
  if (/junk|haul|removal|dump|debris/.test(s))
    return { c: 'oklch(76% 0.18 65)', hex: '#e8a325', dim: 'oklch(76% 0.18 65 / 0.12)', border: 'oklch(76% 0.18 65 / 0.28)' };
  if (/garage|cleanout|clean/.test(s))
    return { c: 'oklch(67% 0.22 145)', hex: '#22c45e', dim: 'oklch(67% 0.22 145 / 0.12)', border: 'oklch(67% 0.22 145 / 0.28)' };
  if (/landscap|lawn|yard|mow/.test(s))
    return { c: 'oklch(70% 0.20 148)', hex: '#16a34a', dim: 'oklch(70% 0.20 148 / 0.12)', border: 'oklch(70% 0.20 148 / 0.28)' };
  return { c: 'oklch(76% 0.18 65)', hex: '#e8a325', dim: 'oklch(76% 0.18 65 / 0.12)', border: 'oklch(76% 0.18 65 / 0.28)' };
}

function getServices(service) {
  const s = (service || '').toLowerCase();
  if (/junk|haul|removal/.test(s)) return [
    'Full home & estate cleanouts',
    'Furniture & appliance removal',
    'Construction debris haul-away',
    'Yard waste & outdoor clutter',
    'Storage unit & garage clearing',
    'Same-day & weekend availability',
  ];
  if (/garage|cleanout/.test(s)) return [
    'Full garage & basement cleanouts',
    'Junk & old furniture removal',
    'Deep cleaning after clearing',
    'Donation & recycling drop-off',
    'Attic & storage unit clearing',
    'Same-day & weekend availability',
  ];
  return [
    'Residential home cleanouts',
    'Junk & debris removal',
    'Furniture & appliance haul-away',
    'Same-day service available',
    'Fully insured crew',
    'Weekend slots available',
  ];
}

function buildMockupHtml({ businessName, phone, city, service }) {
  const name = businessName || 'Your Business';
  const ph = phone || '(000) 000-0000';
  const loc = city || 'Your City';
  const svc = service || 'Junk Removal';
  const accent = getAccent(service);
  const services = getServices(service);
  const phRaw = ph.replace(/\D/g, '');

  const heroH1 = `${svc} in ${loc}. Done right.`;
  const checkSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;margin-top:2px"><circle cx="8" cy="8" r="8" fill="${accent.hex}" opacity=".15"/><path d="M5 8l2 2 4-4" stroke="${accent.hex}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  const serviceRows = services.map(s =>
    `<li style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid oklch(22% 0.015 264)">${checkSvg}<span style="font-size:0.95rem;color:oklch(88% 0.008 264);line-height:1.4">${s}</span></li>`
  ).join('');

  const marqueeSvcs = [svc, 'Same-Day Service', `${loc} &amp; Surrounding Areas`, 'Fully Insured', 'Free Quotes', 'No Hidden Fees', svc, 'Same-Day Service', `${loc} &amp; Surrounding Areas`, 'Fully Insured', 'Free Quotes', 'No Hidden Fees'];
  const marqueeItems = marqueeSvcs.map(s =>
    `<span style="white-space:nowrap;padding:0 32px;color:oklch(55% 0.01 264);font-size:0.78rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700">${s}<span style="margin-left:32px;color:${accent.hex}">✦</span></span>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --bg: oklch(9% 0.012 264);
  --surface: oklch(13% 0.015 264);
  --surface-2: oklch(17% 0.018 264);
  --ink: oklch(95% 0.006 95);
  --ink-dim: oklch(62% 0.01 264);
  --accent: ${accent.c};
  --accent-dim: ${accent.dim};
  --accent-border: ${accent.border};
  --border: oklch(22% 0.015 264);
}
html { background: var(--bg); scroll-behavior: smooth; }
body {
  font-family: 'Barlow', system-ui, sans-serif;
  background: var(--bg);
  color: var(--ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; }

/* NAV */
nav {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 48px; height: 64px;
  background: oklch(9% 0.012 264 / 0.92);
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(12px);
}
.nav-logo {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800; font-size: 1.2rem;
  letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--ink);
}
.nav-cta {
  display: flex; align-items: center; gap: 8px;
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  border-radius: 6px; padding: 9px 18px;
  color: var(--accent); font-weight: 600; font-size: 0.85rem;
  transition: background 180ms;
}
.nav-cta:hover { background: oklch(76% 0.18 65 / 0.2); }
.nav-cta svg { flex-shrink: 0; }

/* HERO */
.hero {
  display: grid; grid-template-columns: 1fr 420px;
  gap: 48px; align-items: center;
  padding: 80px 48px 72px; max-width: 1200px; margin: 0 auto;
  min-height: calc(100vh - 64px);
}
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; min-height: auto; padding: 56px 24px 48px; }
  .hero-card { display: none; }
  nav { padding: 0 24px; }
  .editorial { flex-direction: column; padding: 56px 24px; }
  .process-steps { flex-direction: column; }
  .cta-band { padding: 56px 24px; }
  footer { flex-direction: column; gap: 16px; padding: 28px 24px; }
  .marquee-inner { animation-duration: 20s; }
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 0.78rem; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: var(--accent);
  margin-bottom: 20px;
}
.hero-eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent); flex-shrink: 0;
}
h1 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: clamp(3.2rem, 6vw, 5.4rem);
  line-height: 0.96; letter-spacing: -0.01em;
  text-transform: uppercase; text-wrap: balance;
  margin-bottom: 24px; color: var(--ink);
}
h1 em { font-style: normal; color: var(--accent); }
.hero-sub {
  font-size: 1.1rem; color: var(--ink-dim);
  max-width: 480px; line-height: 1.65;
  margin-bottom: 36px; text-wrap: pretty;
}
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin-bottom: 32px; }
.btn-primary {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--accent); color: oklch(9% 0.012 264);
  font-weight: 700; font-size: 0.95rem; padding: 14px 24px;
  border-radius: 6px; border: none;
}
.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--ink-dim); font-weight: 500; font-size: 0.95rem;
  padding: 14px 24px; border-radius: 6px;
  transition: border-color 180ms, color 180ms;
}
.btn-ghost:hover { border-color: rgba(255,255,255,.3); color: var(--ink); }
.hero-trust {
  display: flex; align-items: center; gap: 16px;
  font-size: 0.82rem; color: var(--ink-dim);
}
.hero-trust-dot { width: 3px; height: 3px; border-radius: 50%; background: var(--border); }

/* HERO CARD */
.hero-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px; overflow: hidden;
}
.hero-card-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}
.hero-card-biz { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
.hero-card-loc { font-size: 0.8rem; color: var(--ink-dim); }
.hero-card-body { padding: 24px; }
.stat-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 0; border-bottom: 1px solid var(--border);
}
.stat-row:last-child { border-bottom: none; padding-bottom: 0; }
.stat-label { font-size: 0.82rem; color: var(--ink-dim); }
.stat-val {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700; font-size: 1.4rem; letter-spacing: -0.02em;
  color: var(--accent);
}
.hero-card-cta {
  margin: 20px 24px 24px;
  display: flex; align-items: center; justify-content: center;
  gap: 8px; background: var(--accent);
  color: oklch(9% 0.012 264); font-weight: 700;
  font-size: 0.9rem; padding: 14px; border-radius: 6px;
  text-align: center;
}

/* MARQUEE */
.marquee {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 14px 0; overflow: hidden;
  background: var(--surface);
}
.marquee-inner {
  display: flex; width: max-content;
  animation: marquee 30s linear infinite;
}
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .marquee-inner { animation: none; }
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

/* EDITORIAL */
.editorial {
  display: flex; gap: 80px; align-items: flex-start;
  padding: 96px 48px; max-width: 1200px; margin: 0 auto;
}
.editorial-left { flex: 0 0 420px; position: sticky; top: 80px; }
.editorial-kicker {
  display: inline-block; font-size: 0.75rem; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px;
}
.editorial-left h2 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800; font-size: clamp(2.4rem, 3.5vw, 3.4rem);
  line-height: 1.0; letter-spacing: -0.01em; text-transform: uppercase;
  margin-bottom: 20px; text-wrap: balance;
}
.editorial-left p {
  font-size: 1rem; color: var(--ink-dim); line-height: 1.7;
  max-width: 340px; text-wrap: pretty;
}
.editorial-left p + p { margin-top: 14px; }
.editorial-right { flex: 1; }
.editorial-right ul { list-style: none; }

/* PROCESS */
.process {
  border-top: 1px solid var(--border);
  padding: 80px 48px; max-width: 1200px; margin: 0 auto;
}
.process-heading {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800; font-size: clamp(1.8rem, 2.8vw, 2.8rem);
  letter-spacing: -0.01em; text-transform: uppercase;
  margin-bottom: 48px; text-wrap: balance;
}
.process-steps { display: flex; gap: 0; }
.process-step { flex: 1; position: relative; padding-right: 32px; }
.process-step:not(:last-child)::after {
  content: '';
  position: absolute; right: 16px; top: 10px;
  width: 1px; height: calc(100% - 10px);
  background: var(--border);
}
.process-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800; font-size: 0.75rem; letter-spacing: .1em;
  color: var(--accent); text-transform: uppercase; margin-bottom: 12px;
}
.process-step h3 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700; font-size: 1.3rem; letter-spacing: .01em;
  text-transform: uppercase; margin-bottom: 8px;
}
.process-step p { font-size: 0.88rem; color: var(--ink-dim); line-height: 1.6; }

/* TESTIMONIAL */
.testimonial-wrap {
  border-top: 1px solid var(--border);
  background: var(--surface);
  padding: 72px 48px;
}
.testimonial-inner { max-width: 720px; margin: 0 auto; }
.testimonial-stars { color: var(--accent); font-size: 1rem; margin-bottom: 24px; letter-spacing: 2px; }
.testimonial-quote {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700; font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  line-height: 1.25; letter-spacing: -0.01em; text-transform: uppercase;
  margin-bottom: 24px; color: var(--ink);
}
.testimonial-attr { font-size: 0.85rem; color: var(--ink-dim); }

/* CTA BAND */
.cta-band {
  border-top: 1px solid var(--border);
  padding: 96px 48px;
  text-align: center; background: var(--bg);
}
.cta-band h2 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800; font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 1.0; letter-spacing: -0.01em; text-transform: uppercase;
  margin-bottom: 16px;
}
.cta-band p { font-size: 1rem; color: var(--ink-dim); margin-bottom: 36px; }
.cta-band .btn-primary { font-size: 1rem; padding: 16px 32px; margin: 0 auto; }

/* FOOTER */
footer {
  border-top: 1px solid var(--border);
  padding: 28px 48px;
  display: flex; justify-content: space-between; align-items: center;
  color: var(--ink-dim); font-size: 0.8rem; background: var(--surface);
}
.footer-logo {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800; font-size: 0.9rem; letter-spacing: .08em;
  text-transform: uppercase; color: var(--ink);
}

/* PAGE LOAD ANIMATION */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-eyebrow { animation: fadeUp 0.5s ease-out 0.05s both; }
h1            { animation: fadeUp 0.55s ease-out 0.12s both; }
.hero-sub     { animation: fadeUp 0.5s ease-out 0.22s both; }
.hero-actions { animation: fadeUp 0.5s ease-out 0.30s both; }
.hero-trust   { animation: fadeUp 0.5s ease-out 0.38s both; }
.hero-card    { animation: fadeUp 0.6s ease-out 0.20s both; }
</style>
</head>
<body>

<nav>
  <div class="nav-logo">${name}</div>
  <a class="nav-cta" href="tel:${phRaw}">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z" fill="currentColor"/>
    </svg>
    ${ph}
  </a>
</nav>

<section class="hero">
  <div class="hero-left">
    <div class="hero-eyebrow">
      <div class="hero-eyebrow-dot"></div>
      Serving ${loc} &amp; surrounding areas
    </div>
    <h1>${heroH1.replace(svc, `<em>${svc}</em>`)}</h1>
    <p class="hero-sub">We show up on time, do the heavy lifting, and leave the space clean — all while you don't lift a finger. Call and we quote you in 60 seconds.</p>
    <div class="hero-actions">
      <a class="btn-primary" href="tel:${phRaw}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z" fill="currentColor"/></svg>
        Call ${ph}
      </a>
      <button class="btn-ghost">Get a Free Quote</button>
    </div>
    <div class="hero-trust">
      <span>⭐ 5.0 rated</span>
      <div class="hero-trust-dot"></div>
      <span>200+ jobs completed</span>
      <div class="hero-trust-dot"></div>
      <span>Fully insured</span>
    </div>
  </div>

  <div class="hero-card">
    <div class="hero-card-header">
      <div class="hero-card-biz">${name}</div>
      <div class="hero-card-loc">${loc}</div>
    </div>
    <div class="hero-card-body">
      <div class="stat-row">
        <span class="stat-label">Avg. response time</span>
        <span class="stat-val">60 sec</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Jobs this month</span>
        <span class="stat-val">34</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Customer rating</span>
        <span class="stat-val">5.0 ★</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Same-day availability</span>
        <span class="stat-val">Yes</span>
      </div>
    </div>
    <a class="hero-card-cta" href="tel:${phRaw}">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z" fill="currentColor"/></svg>
      Book Now — ${ph}
    </a>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-inner">${marqueeItems}</div>
</div>

<div class="editorial">
  <div class="editorial-left">
    <div class="editorial-kicker">What we do</div>
    <h2>We handle the heavy work.</h2>
    <p>Whether it's a single piece of furniture or an entire estate cleanout, we show up ready and leave the space clean.</p>
    <p>Most jobs in ${loc} are booked and completed the same week you call — no waiting, no surprises on the bill.</p>
  </div>
  <div class="editorial-right">
    <ul>${serviceRows}</ul>
  </div>
</div>

<div class="process" style="border-top:1px solid var(--border)">
  <div class="process-heading">How it works.</div>
  <div class="process-steps">
    <div class="process-step">
      <div class="process-num">Step one</div>
      <h3>Call or text</h3>
      <p>Tell us what you need gone. We give you an upfront price on the spot — no in-person visit required.</p>
    </div>
    <div class="process-step">
      <div class="process-num">Step two</div>
      <h3>We show up</h3>
      <p>Our crew arrives on time with a truck and does all the heavy lifting. You don't have to prep or move anything.</p>
    </div>
    <div class="process-step">
      <div class="process-num">Step three</div>
      <h3>Done &amp; gone</h3>
      <p>We leave the space swept clean. Pay when the job's done — no deposit, no card on file required.</p>
    </div>
  </div>
</div>

<div class="testimonial-wrap">
  <div class="testimonial-inner">
    <div class="testimonial-stars">★★★★★</div>
    <div class="testimonial-quote">"They came within two hours of calling. Cleared the whole garage in under 90 minutes. No hidden fees — space was spotless when they left."</div>
    <div class="testimonial-attr">— Sarah M., ${loc} · Google Review</div>
  </div>
</div>

<div class="cta-band">
  <h2>Ready to clear it out?</h2>
  <p>We're available today in ${loc}. Most jobs booked within 24 hours.</p>
  <a class="btn-primary" href="tel:${phRaw}" style="display:inline-flex">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.58.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02L6.6 10.8z" fill="currentColor"/></svg>
    Call ${ph}
  </a>
</div>

<footer>
  <span class="footer-logo">${name}</span>
  <span>${loc} · ${ph}</span>
  <span>Licensed &amp; Insured</span>
</footer>

</body>
</html>`;
}

function extractCity(address) {
  if (!address) return null;
  const parts = address.split(',');
  return parts.length >= 2 ? parts[parts.length - 2].trim() : null;
}

function inferService(name, url) {
  const text = ((name || '') + ' ' + (url || '')).toLowerCase();
  if (/junk|haul|removal|dump|debris/.test(text)) return 'Junk Removal';
  if (/garage|cleanout|clean.?out/.test(text)) return 'Garage Cleaning';
  if (/landscap|lawn|yard|mow/.test(text)) return 'Landscaping';
  if (/clean|maid|janitorial/.test(text)) return 'Cleaning Services';
  return 'Home Services';
}

function buildEmailText({ businessName }) {
  return `Hey,

I also just started a junk removal company and built my own site. Had some downtime and threw together a quick concept for ${businessName} — attaching it in case it's useful.

Took about an hour. No strings attached.

I do web design on the side. If you want it built out for real, it's $750 to lock in your spot — rest isn't due until it's live and you're happy with it. Only taking 2 more this month.

No pressure either way.

— Matisse`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { name, phone, url, address } = req.body || {};

  const businessName = name || 'Your Business';
  const displayPhone = Array.isArray(phone) ? phone[0] : (phone || '');
  const city = extractCity(address) || '';
  const service = inferService(name, url);

  const mockupHtml = buildMockupHtml({ businessName, phone: displayPhone, city, service });
  const emailSubject = `I made something for ${businessName}`;
  const emailText = buildEmailText({ businessName });

  res.json({ ok: true, mockupHtml, emailSubject, emailText });
};
