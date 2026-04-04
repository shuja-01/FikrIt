import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // Hardcoded reliability mapper for the most common search terms to guarantee search results
  const termMapper: Record<string, any[]> = {
    'wudu': [
      { title: 'Ablution (Wudu) - General Rulings', url: 'https://www.sistani.org/english/book/48/2152/', snippet: 'Detailed acts of Wudu by Ayatollah Sistani.' },
      { title: 'Q&A on Wudu', url: 'https://www.sistani.org/english/qa/01126/', snippet: 'Doubts and frequently asked questions on wudu.' }
    ],
    'prayer': [
      { title: 'Rules of Namaz/Salat', url: 'https://www.sistani.org/english/qa/01292/', snippet: 'A detailed manual for prayer rulings.' },
      { title: 'Q&A on Daily Prayer', url: 'https://www.sistani.org/english/qa/01292/', snippet: 'Frequently asked questions on prayer validity.' }
    ],
    'khums': [
       { title: 'Rules of Khums Tax', url: 'https://www.sistani.org/english/book/48/2290/', snippet: 'Calculation and distribution rules.' }
    ],
    'fasting': [
       { title: 'Rules of Fasting (Sawm)', url: 'https://www.sistani.org/english/book/48/2264/', snippet: 'Rulings for the month of Ramadan.' }
    ],
    'hajj': [
       { title: 'Pilgrimage (Hajj) - Rulings', url: 'https://www.sistani.org/english/book/47/', snippet: 'Official guide to Hajj and Umrah.' }
    ]
  };

  try {
    // 1. Check if mapping exists
    for (const term in termMapper) {
       if (query.includes(term)) {
          return NextResponse.json({ 
            results: termMapper[term],
            moreLink: `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`
          });
       }
    }

    // 2. Try searching via Mojeek (very robust against IP blocking)
    const searchUrl = `https://www.mojeek.com/search?q=site:sistani.org/english/qa+${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      }
    });

    if (response.ok) {
       const html = await response.text();
       const $ = cheerio.load(html);
       const results: any[] = [];

       $('.results li').each((i, el) => {
          const link = $(el).find('a.t');
          const rawUrl = link.attr('href');
          if (rawUrl && rawUrl.includes('sistani.org')) {
             results.push({
                title: link.text().trim().replace(' - Sistani.org', ''),
                url: rawUrl,
                snippet: $(el).find('.s').text().trim(),
                source: 'sistani.org'
             });
          }
       });

       if (results.length > 0) {
          return NextResponse.json({ 
            results: results.slice(0, 5),
            moreLink: `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`
          });
       }
    }

    // 3. Last stand: Broad QA search - Hit sistani search with very basic browser headers
    const sistaniUrl = `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`;
    const sistaniRes = await fetch(sistaniUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });
    
    if (sistaniRes.ok) {
       const html = await sistaniRes.text();
       const $s = cheerio.load(html);
       const results: any[] = [];
       $s('.item_list_qa').each((i, el) => {
          const l = $s(el).find('a');
          results.push({
             title: l.text().trim(),
             url: `https://www.sistani.org${l.attr('href')}`,
             snippet: "Direct search result from Sistani.org database.",
             source: "sistani.org"
          });
       });
       if (results.length > 0) return NextResponse.json({ results: results.slice(0, 5), moreLink: sistaniUrl });
    }

    return NextResponse.json({ results: [], message: 'No rulings found matching this keyword' });

  } catch (error) {
    console.error('Sistani search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
