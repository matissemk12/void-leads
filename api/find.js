const SKIP = /yelp\.com|google\.|facebook\.com|instagram\.com|twitter\.com|linkedin\.com|angi\.com|houzz\.com|homeadvisor\.com|thumbtack\.com|bbb\.org|yellowpages\.com|wikipedia\.org|amazon\.com|angieslist\.com|porch\.com|bark\.com|nextdoor\.com|mapquest\.com|bing\.com/i;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });

  try {
    const r = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!r.ok) throw new Error(`Search returned ${r.status}`);
    const html = await r.text();

    const urls = [];
    const seen = new Set();

    for (const [, uddg] of html.matchAll(/uddg=([^&"'\s]+)/g)) {
      try {
        const url = decodeURIComponent(uddg);
        if (!url.startsWith('http')) continue;
        const host = new URL(url).hostname.replace(/^www\./, '');
        if (SKIP.test(host)) continue;
        if (seen.has(host)) continue;
        seen.add(host);
        urls.push(url);
        if (urls.length >= 12) break;
      } catch {}
    }

    res.json({ urls });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Search failed' });
  }
};
