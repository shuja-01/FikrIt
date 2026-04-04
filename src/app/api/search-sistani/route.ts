import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // Hardcoded reliability mapper for the most common search terms to guarantee search results even during API outages
  const termMapper: Record<string, any[]> = {
    'wudu': [
      { title: 'Ablution (Wudu) - Rules and Acts', url: 'https://www.sistani.org/english/book/48/2152/', snippet: 'Detailed rulings on the obligatory acts and conditions of Wudu by Ayatollah Sistani.' },
      { title: 'Q&A on Wudu', url: 'https://www.sistani.org/english/qa/01126/', snippet: 'Frequently asked questions regarding the validity of wudu and specific doubts.' }
    ],
    'prayer': [
      { title: 'Salat (Prayer) - The Pillars and Rulings', url: 'https://www.sistani.org/english/book/48/2210/', snippet: 'Comprehensive guide to the daily prayers, their parts, and conditions of validity.' },
      { title: 'Q&A on Prayer (Salat)', url: 'https://www.sistani.org/english/qa/01292/', snippet: 'Official rulings on prayer times, doubts, and congregational salat.' }
    ],
    'khums': [
       { title: 'Khums - The One-Fifth Tax', url: 'https://www.sistani.org/english/book/48/2290/', snippet: 'Jurisprudential rules regarding the calculation and distribution of Khums.' }
    ]
  };

  try {
    // If it's a common term, return the guaranteed results immediately
    for (const term in termMapper) {
       if (query.includes(term)) {
          return NextResponse.json({ results: termMapper[term] });
       }
    }

    // Otherwise, try to search via Ask.com (which is very stable for Vercel)
    const searchUrl = `https://www.ask.com/web?q=site%3Asistani.org%20${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      }
    });

    if (!response.ok) throw new Error('Search provider failed');

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    $('.PartialSearchResults-item').each((i, el) => {
       const link = $(el).find('a.PartialSearchResults-item-title-link');
       const rawUrl = link.attr('href');
       if (rawUrl && rawUrl.toLowerCase().includes('sistani.org')) {
         results.push({
           title: link.text().trim().replace(' - Sistani.org', ''),
           url: rawUrl,
           snippet: $(el).find('.PartialSearchResults-item-abstract').text().trim() || "View official ruling detail",
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
