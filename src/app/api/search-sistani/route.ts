import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    // Scrape DuckDuckGo HTML version for Sistani.org results to avoid blocks from Google
    const ddgUrl = `https://html.duckduckgo.com/html/?q=site:sistani.org/english/qa/+${encodeURIComponent(query)}`;
    
    const response = await fetch(ddgUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch search results: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    $('.result').each((i, element) => {
      const title = $(element).find('.result__title a').text();
      const url = $(element).find('.result__snippet').attr('href');
      const snippet = $(element).find('.result__snippet').text();

      if (title && snippet) {
        results.push({
          title,
          url: url?.startsWith('http') ? url : `https://duckduckgo.com${url}`,
          snippet,
          source: 'sistani.org'
        });
      }
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Sistani search error:', error);
    return NextResponse.json({ error: 'Failed to search Sistani.org' }, { status: 500 });
  }
}
