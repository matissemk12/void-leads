const SKIP = /yelp\.com|google\.|facebook\.com|instagram\.com|twitter\.com|linkedin\.com|angi\.com|houzz\.com|homeadvisor\.com|thumbtack\.com|bbb\.org|yellowpages\.com|wikipedia\.org|amazon\.com|angieslist\.com|porch\.com|bark\.com|nextdoor\.com|mapquest\.com|bing\.com/i;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'q required' });

  const key = process.env.BRAVE_SEARCH_KEY;
  if (!key) return res.status(500).json({ error: 'BRAVE_SEARCH_KEY not configured' });

  try {
    const r = await fetch(`https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(q)}&count=20`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip',
        'X-Subscription-Token': key,
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!r.ok) throw new Error(`Search returned ${r.status}`);
    const data = await r.json();

    const urls = [];
    const seen = new Set();

    for (const result of (data.web?.results || [])) {
      try {
        const url = result.url;
        if (!url) continue;
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
