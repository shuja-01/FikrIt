import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    // Try Bing first - safest for Vercel
    const bingUrl = `https://www.bing.com/search?q=site:sistani.org/english/qa+${encodeURIComponent(query)}`;
    const response = await fetch(bingUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    if (!response.ok) throw new Error('Bing failed');

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    $('.b_algo').each((i, element) => {
       const link = $(element).find('h2 a');
       const rawUrl = link.attr('href');
       if (rawUrl && rawUrl.includes('sistani.org')) {
         results.push({
           title: link.text().trim().replace(' - Sistani.org', ''),
           url: rawUrl,
           snippet: $(element).find('.b_caption p, .b_snippet').text().trim() || "Official ruling details...",
           source: 'sistani.org'
         });
       }
    });

    // If Bing returns 0 results (Vercel IP shadowban), try to crawl Sistani directly
    if (results.length === 0) {
       console.log('Bing returned 0 results, attempting direct crawl...');
       const directUrl = `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`;
       const directRes = await fetch(directUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }});
       if (directRes.ok) {
          const directHtml = await directRes.text();
          const $d = cheerio.load(directHtml);
          $d('.item_list_qa').each((i, el) => {
             const link = $d(el).find('a');
             const title = link.text().trim();
             const url = link.attr('href');
             if (title && url) {
               results.push({
                 title,
                 url: `https://www.sistani.org${url}`,
                 snippet: "Ruling result from Sistani.org search",
                 source: "sistani.org"
               });
             }
          });
       }
    }

    return NextResponse.json({ results: results.slice(0, 10) });
  } catch (error) {
    console.error('Sistani search error:', error);
    return NextResponse.json({ error: 'Search temporarily unavailable' }, { status: 500 });
  }
}
