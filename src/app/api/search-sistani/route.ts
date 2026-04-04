import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  try {
    // We hit Sistani's direct search portal which the user showed is working in browser
    const searchUrl = `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer': 'https://www.sistani.org/english/qa/',
      }
    });

    if (!response.ok) {
       throw new Error(`Sistani.org connection failed: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const results: any[] = [];

    // Sistani.org search results are contained in .item_list_qa or similar
    // We extract the top 2-3 most relevant Q&A snippets
    $('.item_list_qa').each((i, el) => {
       if (i >= 5) return; // Limit to top 5 candidates

       const link = $(el).find('a');
       const questionText = link.text().trim();
       const url = `https://www.sistani.org${link.attr('href')}`;
       
       if (questionText && url) {
         results.push({
           title: questionText,
           url: url,
           snippet: "Official ruling from Ayatollah Sistani's database.",
           isQA: true
         });
       }
    });

    // If no direct search results, fallback to a more broad search or informative message
    if (results.length === 0) {
       return NextResponse.json({ 
         results: [], 
         message: "Direct keyword search returned no results. Please try a broader term like 'prayer' or 'wudu'.",
         externalLink: `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`
       });
    }

    // Limit to top 2 for the 'featured' view as requested
    return NextResponse.json({ 
        results: results.slice(0, 5),
        moreLink: `https://www.sistani.org/english/qa/search/?search=${encodeURIComponent(query)}`
    });

  } catch (error) {
    console.error('Sistani deep search error:', error);
    return NextResponse.json({ error: 'Failed to extract rulings from Sistani.org' }, { status: 500 });
  }
}
