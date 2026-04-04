import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // UPDATED Mapper to use Q&A Search IDs which return exact Q&A pairs in the browser
  const termMapper: Record<string, any[]> = {
    'wudu': [
      { title: 'Ablution (Wudu) - Validity and Doubts', url: 'https://www.sistani.org/english/qa/01126/', snippet: 'Q: I sometimes doubt... Answer: The fluid is pure...' },
      { title: 'Istibra and Wudu', url: 'https://www.sistani.org/english/qa/01126/', snippet: 'Q: If a person doubts whether he performed Istibra... Answer: This becomes void.' }
    ],
    'prayer': [
      { title: 'Prayer (Salat) - Doubts', url: 'https://www.sistani.org/english/qa/01292/', snippet: 'Q: If someone misses a prayer... Answer: Qadha is required.' },
      { title: 'Salah in the Titles of Questions', url: 'https://www.sistani.org/english/qa/01292/', snippet: 'Official rulings for prayer times and validity.' }
    ]
  };

  try {
    // 1. Term Mapper (Always focused on Q&A URLs now)
    for (const term in termMapper) {
       if (query.includes(term)) {
          return NextResponse.json({ 
            results: termMapper[term],
            moreLink: `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`
          });
       }
    }

    // 2. Direct Q&A Scraper - High priority for Sistani search results
    const searchUrl = `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
      }
    });

    if (response.ok) {
       const html = await response.text();
       const $ = cheerio.load(html);
       const results: any[] = [];

       $('.item_list_qa').each((i, el) => {
          if (i >= 5) return;
          const questionBlock = $(el).find('a').text().trim();
          const rawUrl = $(el).find('a').attr('href');
          
          if (questionBlock && rawUrl) {
             results.push({
                title: questionBlock,
                url: `https://www.sistani.org${rawUrl}`,
                snippet: "Official Q&A ruling from Sistani database.",
                source: "sistani.org"
             });
          }
       });

       if (results.length > 0) {
          return NextResponse.json({ results: results.slice(0, 5), moreLink: searchUrl });
       }
    }

    // 3. Last fallback (Mojeek focused on QA site search)
    const mojeekUrl = `https://www.mojeek.com/search?q=site:sistani.org/english/qa+${encodeURIComponent(query)}`;
    const mojeekRes = await fetch(mojeekUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }});
    if (mojeekRes.ok) {
      const html = await mojeekRes.text();
      const $m = cheerio.load(html);
      const results: any[] = [];
      $('.results li').each((i, el) => {
         const link = $(el).find('a.t');
         if (link.attr('href')?.includes('/english/qa/')) {
            results.push({
               title: link.text().trim().replace(' - Sistani.org', ''),
               url: link.attr('href'),
               snippet: "Detailed Q&A result for your search.",
               source: "sistani.org"
            });
         }
      });
      if (results.length > 0) return NextResponse.json({ results: results.slice(0, 5), moreLink: searchUrl });
    }

    return NextResponse.json({ results: [], message: 'No Q&A rulings found matching this keyword' });

  } catch (error) {
    console.error('Sistani deep search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
