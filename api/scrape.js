function flattenJsonLd(data) {
  const out = [];
  const walk = (d) => {
    if (Array.isArray(d)) { d.forEach(walk); return; }
    if (!d || typeof d !== 'object') return;
    if (d['@graph']) { walk(d['@graph']); return; }
    out.push(d);
  };
  walk(data);
  return out;
}

function extractName(html, hostname) {
  let m;

  // og:site_name
  m = html.match(/<meta[^>]+property=["']og:site_name["'][^>]+content=["']([^"']+)["']/i)
   || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:site_name["']/i);
  if (m && m[1].trim().length > 1) return m[1].trim();

  // JSON-LD — flatten @graph, prefer business/org types then WebSite
  const ldItems = [];
  for (const [, raw] of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { ldItems.push(...flattenJsonLd(JSON.parse(raw))); } catch {}
  }
  for (const d of ldItems) {
    if (d.name && d['@type'] && /business|organization|service|company|local|store|professional/i.test(String(d['@type'])))
      return Array.isArray(d.name) ? d.name[0] : d.name;
  }
  for (const d of ldItems) {
    if (d.name && d['@type'] && /website/i.test(String(d['@type'])))
      return Array.isArray(d.name) ? d.name[0] : d.name;
  }

  // application-name meta
  m = html.match(/<meta[^>]+name=["']application-name["'][^>]+content=["']([^"']{2,60})["']/i)
   || html.match(/<meta[^>]+content=["']([^"']{2,60})["'][^>]+name=["']application-name["']/i);
  if (m) return m[1].trim();

  // Title — pick the longest segment (business names beat "Home" / "Services")
  m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (m) {
    const raw = m[1].replace(/&amp;/g,'&').replace(/&#039;/g,"'").trim();
    const parts = raw.split(/\s*[|–\-—:·•»]\s*/);
    const best = parts.reduce((a, b) => b.length > a.length ? b : a, '').trim();
    if (best.length > 1) return best;
  }

  // H1
  m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (m) { const t = m[1].replace(/<[^>]+>/g,'').trim(); if (t.length > 1 && t.length < 80) return t; }

  return hostname.replace(/^www\./,'');
}

function extractPhones(html) {
  const found = new Set();

  for (const [, raw] of html.matchAll(/href=["']tel:([^"']+)["']/gi)) {
    const d = raw.replace(/\D/g,'');
    if (d.length >= 10) found.add(d.slice(-10));
  }

  for (const [, raw] of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      for (const d of [].concat(JSON.parse(raw))) {
        if (d.telephone) { const n = d.telephone.replace(/\D/g,'').slice(-10); if (n.length===10) found.add(n); }
      }
    } catch {}
  }

  const text = html.replace(/<[^>]+>/g,' ');
  for (const m of text.matchAll(/\b(?:\+?1[\s.\-]?)?\(?(\d{3})\)?[\s.\-](\d{3})[\s.\-](\d{4})\b/g)) {
    const d = (m[1]+m[2]+m[3]);
    if (d.length===10) found.add(d);
  }

  return [...found].slice(0,3).map(d=>`(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`);
}

function extractEmails(html) {
  const found = new Set();

  for (const [, raw] of html.matchAll(/href=["']mailto:([^"'?\s]+)/gi)) found.add(raw.toLowerCase());

  for (const [, raw] of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      for (const d of [].concat(JSON.parse(raw))) {
        if (d.email) found.add(d.email.toLowerCase().trim());
      }
    } catch {}
  }

  const text = html.replace(/<[^>]+>/g,' ');
  for (const [m] of text.matchAll(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g)) {
    const e = m.toLowerCase();
    if (!/\.(png|jpg|gif|svg|webp|pdf)$/.test(e) && !e.includes('example') && !e.includes('sentry') && !e.includes('wix')) {
      found.add(e);
    }
  }

  return [...found].slice(0,3);
}

function extractOwner(html) {
  for (const [, raw] of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      for (const d of [].concat(JSON.parse(raw))) {
        if (d.founder) {
          const f = Array.isArray(d.founder) ? d.founder[0] : d.founder;
          if (typeof f === 'string' && f.length > 1) return f;
          if (f && f.name) return f.name;
        }
        for (const key of ['member','employee','personnel']) {
          if (d[key]) {
            const m = Array.isArray(d[key]) ? d[key][0] : d[key];
            if (m && m.name && /^[A-Z][a-z]/.test(m.name)) return m.name;
          }
        }
      }
    } catch {}
  }
  const metaM = html.match(/<meta[^>]+name=["']author["'][^>]+content=["']([^"']{3,50})["']/i)
             || html.match(/<meta[^>]+content=["']([^"']{3,50})["'][^>]+name=["']author["']/i);
  if (metaM && /[A-Z][a-z]+ [A-Z]/.test(metaM[1])) return metaM[1].trim();

  const text = html.replace(/<[^>]+>/g, ' ');
  const ownerM = text.match(/\b(?:owner|owned by|founder|proprietor|operated by)[\s:–-]+([A-Z][a-z]+ (?:[A-Z][a-z]+ )?[A-Z][a-z]+)/i);
  if (ownerM) return ownerM[1].trim();

  return null;
}

function extractAddress(html) {
  for (const [, raw] of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      for (const d of [].concat(JSON.parse(raw))) {
        if (d.address) {
          const a = d.address;
          if (typeof a === 'string') return a;
          return [a.streetAddress, a.addressLocality, a.addressRegion, a.postalCode].filter(Boolean).join(', ');
        }
      }
    } catch {}
  }
  return null;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL required' });

  let target;
  try { target = new URL(url.startsWith('http') ? url : 'https://' + url); }
  catch { return res.status(400).json({ error: 'Invalid URL' }); }

  try {
    const r = await fetch(target.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(9000),
      redirect: 'follow',
    });
    if (!r.ok) throw new Error(`Site returned ${r.status}`);
    const html = await r.text();

    res.json({
      name:    extractName(html, target.hostname),
      owner:   extractOwner(html),
      phones:  extractPhones(html),
      emails:  extractEmails(html),
      address: extractAddress(html),
      url:     target.toString(),
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Could not reach site' });
  }
};
