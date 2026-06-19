function buildMockupHtml({ businessName, phone, city, service }) {
  const displayName = businessName || 'Your Business';
  const displayPhone = phone || '(000) 000-0000';
  const displayCity = city || 'Your City';
  const displayService = service || 'Junk Removal';
  const heroLine = `${displayService} in ${displayCity}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${displayName}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: oklch(13% 0.018 264);
    --surface: oklch(18% 0.022 264);
    --ink: oklch(94% 0.008 264);
    --ink-dim: oklch(65% 0.012 264);
    --accent: oklch(72% 0.18 158);
    --border: oklch(22% 0.018 264);
    --radius: 10px;
  }
  html { background: var(--bg); }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--bg);
    color: var(--ink);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  a { color: inherit; text-decoration: none; }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 68px;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
  }
  .nav-logo { font-weight: 700; font-size: 1.05rem; letter-spacing: -0.02em; }
  .nav-phone {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.9rem; color: var(--accent); font-weight: 700;
    background: oklch(72% 0.18 158 / 0.1);
    border: 1px solid oklch(72% 0.18 158 / 0.3);
    border-radius: 999px; padding: 8px 18px;
  }
  .hero { padding: 96px 48px 80px; max-width: 1100px; margin: 0 auto; }
  .hero-label {
    display: inline-block; font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 24px;
  }
  .hero h1 {
    font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 700;
    letter-spacing: -0.03em; line-height: 1.06;
    max-width: 700px; margin-bottom: 20px;
  }
  .hero-sub {
    font-size: 1.15rem; color: var(--ink-dim);
    max-width: 520px; margin-bottom: 36px;
  }
  .hero-cta {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--accent); color: oklch(13% 0.018 264);
    font-weight: 700; font-size: 1rem; padding: 14px 28px;
    border-radius: var(--radius); border: none; cursor: pointer;
  }
  .value-strip {
    display: flex; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  }
  .value-item {
    flex: 1; padding: 32px 48px; border-right: 1px solid var(--border);
  }
  .value-item:last-child { border-right: none; }
  .value-num { font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 4px; }
  .value-desc { font-size: 0.85rem; color: var(--ink-dim); }
  .how { max-width: 1100px; margin: 0 auto; padding: 80px 48px; }
  .how h2 {
    font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700;
    letter-spacing: -0.025em; margin-bottom: 48px;
  }
  .steps {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; background: var(--border);
    border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;
  }
  .step { background: var(--surface); padding: 32px; }
  .step-number { font-size: 0.8rem; font-weight: 700; color: var(--accent); margin-bottom: 12px; }
  .step h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
  .step p { font-size: 0.85rem; color: var(--ink-dim); line-height: 1.55; }
  .cta-band {
    margin: 0 48px 80px; border: 1px solid var(--border); border-radius: 16px;
    padding: 56px 48px; text-align: center; background: var(--surface);
  }
  .cta-band h2 {
    font-size: clamp(1.4rem, 2.5vw, 2rem); font-weight: 700;
    letter-spacing: -0.02em; margin-bottom: 12px;
  }
  .cta-band p { color: var(--ink-dim); margin-bottom: 28px; }
  footer {
    border-top: 1px solid var(--border); padding: 28px 48px;
    display: flex; justify-content: space-between; align-items: center;
    color: var(--ink-dim); font-size: 0.82rem;
  }
</style>
</head>
<body>
<nav>
  <div class="nav-logo">${displayName}</div>
  <a class="nav-phone" href="tel:${displayPhone.replace(/\D/g, '')}">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="currentColor"/></svg>
    ${displayPhone}
  </a>
</nav>
<section class="hero">
  <div class="hero-label">Same-Day Service Available</div>
  <h1>Professional ${heroLine}, Done Right.</h1>
  <p class="hero-sub">Fast, reliable, and fully insured. We haul everything away so you don't have to lift a finger — same week, every time.</p>
  <button class="hero-cta">Get a Free Quote →</button>
</section>
<div class="value-strip">
  <div class="value-item"><div class="value-num">Same Day</div><div class="value-desc">Availability on most bookings</div></div>
  <div class="value-item"><div class="value-num">5★</div><div class="value-desc">Average customer rating</div></div>
  <div class="value-item"><div class="value-num">Fully</div><div class="value-desc">Licensed &amp; insured</div></div>
</div>
<section class="how">
  <h2>Book in three steps.</h2>
  <div class="steps">
    <div class="step"><div class="step-number">Step 1</div><h3>Call or text us</h3><p>Tell us what you need hauled and when. We'll give you an upfront quote on the spot.</p></div>
    <div class="step"><div class="step-number">Step 2</div><h3>We show up</h3><p>Our team arrives on time with a truck and handles all the heavy lifting — no prep needed on your end.</p></div>
    <div class="step"><div class="step-number">Step 3</div><h3>Done and gone</h3><p>We leave the space clean. Pay when the job's done — no deposits, no surprises.</p></div>
  </div>
</section>
<div class="cta-band">
  <h2>Ready to clear it out?</h2>
  <p>We serve ${displayCity} and surrounding areas. Give us a call — we usually book within 24 hours.</p>
  <button class="hero-cta">Call ${displayPhone}</button>
</div>
<footer>
  <span>${displayName} · ${displayCity}</span>
  <span>${displayPhone}</span>
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
  if (/clean|maid|janitorial/.test(text)) return 'Cleaning';
  return 'Home Services';
}

function buildEmailText({ businessName, city }) {
  return `Hey,

I also just started a junk removal company and built my own site. Had a bit of downtime and threw together a quick concept for ${businessName} — attaching it in case it's useful.

Took about an hour. No strings attached.

I do web design on the side. If you ever want it built out for real, it's $750 to lock in your spot — rest isn't due until it's live and you're happy with it. Only taking 2 more this month.

No pressure either way — just thought it looked like a solid fit.

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
  const emailText = buildEmailText({ businessName, city });

  res.json({ ok: true, mockupHtml, emailSubject, emailText });
};
