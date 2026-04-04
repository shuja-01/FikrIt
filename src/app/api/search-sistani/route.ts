import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    // Switching to the /html/ endpoint of DuckDuckGo which is often more lenient than /lite/ on Vercel
    const searchUrl = `https://duckduckgo.com/html/?q=site:sistani.org/english/qa/+${encodeURIComponent(query)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      }
    });

    if (!response.ok) {
        // Fallback for 403: If DDG blocks us, we attempt a direct search on sistani.org
        const sistaniSearchUrl = `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`;
        const sistaniRes = await fetch(sistaniSearchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }});
        
        if (sistaniRes.ok) {
           const html = await sistaniRes.text();
           const $ = cheerio.load(html);
           const results: any[] = [];
           
           $('.item_list_qa').each((i, el) => {
              const link = $(el).find('a');
              results.push({
                title: link.text().trim(),
                url: `https://www.sistani.org${link.attr('href')}`,
                snippet: "Direct ruling from Sistani.org",
                source: 'sistani.org'
              });
           });
           
           return NextResponse.json({ results: results.slice(0, 5) });
        }
        
        throw new Error(`Primary and Fallback search failed. Status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    // Parse DDG HTML results
    $('.result__body').each((i, element) => {
       const link = $(element).find('.result__a');
       const title = link.text().trim();
       const rawUrl = link.attr('href');
       const snippet = $(element).find('.result__snippet').text().trim();

       if (title && rawUrl && rawUrl.toLowerCase().includes('sistani.org')) {
         results.push({
           title: title.replace(' - Sistani.org', '').replace(' | Sistani.org', ''),
           url: rawUrl,
           snippet: snippet || "View official ruling on Sistani.org",
           source: 'sistani.org'
         });
       }
    });

    return NextResponse.json({ results: results.slice(0, 10) });
  } catch (error) {
    console.error('Sistani search error:', error);
    return NextResponse.json({ error: 'Failed to search Sistani.org' }, { status: 500 });
  }
}
