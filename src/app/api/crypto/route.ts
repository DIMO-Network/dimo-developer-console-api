import { NextResponse } from 'next/server';
import axios from 'axios';


const GET = async (_: NextRequest) => {
  const client = axios.create({
    baseURL: process.env.COINMARKET_API!
  });

  const { data } = await client.get('v2/cryptocurrency/quotes/latest?symbol=DIMO', {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY!,
    },
  });

  return NextResponse.json(data);
};

export { GET };