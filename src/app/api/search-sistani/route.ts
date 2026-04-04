import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    // Switching to Bing which is significantly more lenient with Vercel/Cloud-provider IPs than DDG
    const searchUrl = `https://www.bing.com/search?q=site:sistani.org/english/qa+${encodeURIComponent(query)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.bing.com/',
      }
    });

    if (!response.ok) {
        // Ultimate Fallback: Try a different search provider (Ask.com or similar)
        const alternateUrl = `https://www.ask.com/web?q=site%3Asistani.org%20${encodeURIComponent(query)}`;
        const altRes = await fetch(alternateUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }});
        if (altRes.ok) {
           const html = await altRes.text();
           const $ = cheerio.load(html);
           const results: any[] = [];
           $('.PartialSearchResults-item').each((i, el) => {
              const link = $(el).find('a.PartialSearchResults-item-title-link');
              if (link.attr('href')?.includes('sistani.org')) {
                results.push({
                   title: link.text().trim(),
                   url: link.attr('href'),
                   snippet: $(el).find('.PartialSearchResults-item-abstract').text().trim(),
                   source: 'sistani.org'
                });
              }
           });
           if (results.length > 0) return NextResponse.json({ results });
        }
        
        throw new Error(`All search proxies blocked. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    // Parse Bing Results
    $('.b_algo').each((i, element) => {
       const link = $(element).find('h2 a');
       const title = link.text().trim();
       const rawUrl = link.attr('href');
       const snippet = $(element).find('.b_caption p, .b_snippet').text().trim();

       if (title && rawUrl && rawUrl.toLowerCase().includes('sistani.org')) {
         results.push({
           title: title.replace(' - Sistani.org', '').replace(' | Sistani.org', ''),
           url: rawUrl,
           snippet: snippet || "Official ruling from Ayatollah Sistani's QA database.",
           source: 'sistani.org'
         });
       }
    });

    // If still no results, try to fetch the first few QA items from sistani.org directly as a best-effort
    if (results.length === 0) {
       const directRes = await fetch(`https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`, {
         headers: { 'User-Agent': 'Mozilla/5.0' }
       });
       if (directRes.ok) {
          const directHtml = await directRes.text();
          const $d = cheerio.load(directHtml);
          $d('.item_list_qa').each((i, el) => {
             const link = $d(el).find('a');
             results.push({
                title: link.text().trim(),
                url: `https://www.sistani.org${link.attr('href')}`,
                snippet: "Direct ruling search result from Sistani.org",
                source: "sistani.org"
             });
          });
       }
    }

    return NextResponse.json({ results: results.slice(0, 10) });
  } catch (error) {
    console.error('Sistani search error:', error);
    return NextResponse.json({ error: 'Failed to search Sistani.org' }, { status: 500 });
  }
}
