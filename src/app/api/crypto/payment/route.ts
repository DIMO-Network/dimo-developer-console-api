import axios, { AxiosError } from 'axios';
import { StripeLinkCreateResponse, TokenPurchaseTransaction } from '@/types/crypto';
import config from '@/config';
import { getToken } from '@/utils/auth';
import { JwtPayload } from 'jsonwebtoken';
import { findUserByWalletAddress } from '@/controllers/user.controller';
import { User } from '@/models/user.model';
import { NextResponse } from 'next/server';
const { DCX_IN_USD = 0.001 } = process.env;
const DCX_PRICE = Number(DCX_IN_USD);

const POST = async (request: NextRequest) => {
  try {
    const token = (await getToken({ req: request })) as JwtPayload;

    if (!token) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { STRIPE_API_KEY, STRIPE_API, STRIPE_PRODUCT_PRICE } = process.env;
    const payload: TokenPurchaseTransaction = await request.json();

    const client = axios.create({
      baseURL: STRIPE_API,
      headers: {
        'Authorization': `Bearer ${STRIPE_API_KEY!}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const dcxAmount = Math.ceil(+payload.amount / DCX_PRICE);

    const user = (await findUserByWalletAddress(token.ethereum_address)) as User;

    const targetWallet = payload.wallet ?? user?.address;

    const paymentLinPayload = {
      line_items: [
        {
          price: STRIPE_PRODUCT_PRICE!,
          quantity: dcxAmount,
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      customer_creation: 'always',
      restrictions: {
        completed_sessions: {
          limit: 1,
        },
      },
      after_completion: {
        type: 'redirect',
        redirect: {
          url: `${config.frontendUrl}/app`,
        },
      },
      inactive_message:
        "You've already paid this. Please return to DIMO and continue with building with your credits.",
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `For the purchase of ${payload.amount} worth of Developer Credits`,
          custom_fields: [
            {
              name: 'DIMO Global Account',
              value: targetWallet,
            },
            {
              name: 'Name',
              value: user!.name,
            },
          ],
          metadata: {
            destination_wallet: targetWallet,
            dcx_amount: dcxAmount,
            owner_wallet: user.address,
          },
        },
      },
    };

    const { data } = await client.post<StripeLinkCreateResponse>(
      '/v1/payment_links',
      paymentLinPayload,
    );

    const { url } = data;

    return NextResponse.json({ url }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      console.error(e.response?.data?.error);
    } else {
      console.error(e);
    }

    return NextResponse.json({ message: 'Error creating payment link' }, { status: 500 });
  }
};

export { POST };
