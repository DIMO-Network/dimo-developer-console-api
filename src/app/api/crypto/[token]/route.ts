import { sentTokenBoughtEmail } from '@/controllers/crypto.controller';
import AuthenticationMiddleware from '@/middlewares/authentication.middleware';
import { User } from '@/models/user.model';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: { params: { token: string } }
) => {
  const { token } = params;
  const client = axios.create({
    baseURL: process.env.COINMARKET_API!,
  });

  const { data } = await client.get(
    `v2/cryptocurrency/quotes/latest?symbol=${token}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY!,
      },
    }
  );

  return NextResponse.json(data);
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { token: string } }
) => {
  await AuthenticationMiddleware(request);

  const loggedUser = request.user?.user as User;
  const { token } = params;
  const transactionData = (await request.json()) as { amount: number };
  let success = false;

  try {
    await sentTokenBoughtEmail(loggedUser, token, transactionData);
    success = true;
  } catch (error) {
    console.error('Error sending the token purchase email:', {
      user: loggedUser.email,
      transactionData,
      error,
    });
  }

  return NextResponse.json({ success });
};
