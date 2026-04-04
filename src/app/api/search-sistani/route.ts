import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    // DuckDuckGo LITE is much more stable and less likely to 403 on Vercel
    const liteUrl = `https://lite.duckduckgo.com/lite/?q=site:sistani.org/english/qa/+${encodeURIComponent(query)}`;
    
    const response = await fetch(liteUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Search Engine: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    // DuckDuckGo Lite selectors
    $('tr').each((i, element) => {
       const link = $(element).find('a.result-link');
       const title = link.text().trim();
       const rawUrl = link.attr('href');
       const snippet = $(element).next().find('.result-snippet').text().trim();

       if (title && rawUrl && rawUrl.includes('sistani.org')) {
         results.push({
           title: title.replace(' - Sistani.org', '').replace(' | Sistani.org', ''),
           url: rawUrl,
           snippet: snippet || "Click to view ruling details on Sistani.org",
           source: 'sistani.org'
         });
       }
    });

    // If results are still empty, try parsing alternate DDG Lite structure
    if (results.length === 0) {
      $('.result-link').each((i, el) => {
        const title = $(el).text();
        const url = $(el).attr('href');
        if (title && url && url.includes('sistani.org')) {
           results.push({ title, url, snippet: "Ruling from Sistani.org", source: "sistani.org" });
        }
      });
    }

    console.log(`Search for "${query}" returned ${results.length} results.`);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Sistani search error:', error);
    return NextResponse.json({ error: 'Failed to search Sistani.org' }, { status: 500 });
  }
}
