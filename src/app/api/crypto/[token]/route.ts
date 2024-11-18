import axios from 'axios';
import { NextResponse } from 'next/server';

const GET = async (_: NextRequest,{ params }: { params: { token: string; }}) => {  
  const { token } = params;
  const client = axios.create({
    baseURL: process.env.COINMARKET_API!
  });

  const { data } = await client.get(`v2/cryptocurrency/quotes/latest?symbol=${token}`, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY!,
    },
  });

  return NextResponse.json(data);
};

export { GET };