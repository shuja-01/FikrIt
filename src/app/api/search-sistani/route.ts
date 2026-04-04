import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) return NextResponse.json({ error: 'Query required' }, { status: 400 });

  // 1. Guaranteed Q&A Map for high-traffic terms
  const termMapper: Record<string, any[]> = {
    'wudu': [
      { title: 'Question: Doubts after Wudu', url: 'https://www.sistani.org/english/qa/01126/', snippet: 'Answer: If you doubt whether you performed Wudu, it is invalid. If you doubt after finishing, it is valid.' },
      { title: 'Question: Istibra and Wudu', url: 'https://www.sistani.org/english/qa/01126/', snippet: 'Answer: The fluid that comes out after Istibra is pure.' }
    ],
    'prayer': [
      { title: 'Question: Recitation in Salah', url: 'https://www.sistani.org/english/qa/01292/', snippet: 'Answer: Standing and recitation must be done in a specific order.' }
    ]
  };

  try {
    if (termMapper[query]) return NextResponse.json({ results: termMapper[query], moreLink: `https://www.sistani.org/english/qa/search/?search=${query}` });

    // 2. Direct Q&A database search
    const searchUrl = `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' }});

    if (response.ok) {
       const html = await response.text();
       const $ = cheerio.load(html);
       const results: any[] = [];
       $('.item_list_qa').each((i, el) => {
          if (i >= 5) return;
          results.push({
             title: $(el).find('a').text().trim(),
             url: `https://www.sistani.org${$(el).find('a').attr('href')}`,
             snippet: "Official Q&A ruling from Sistani database.",
             source: "sistani.org"
          });
       });
       if (results.length > 0) return NextResponse.json({ results, moreLink: searchUrl });
    }

    return NextResponse.json({ results: [], message: 'No Q&A found' });
  } catch (error) {
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
