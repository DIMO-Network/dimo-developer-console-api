import { NextResponse } from 'next/server';
import { RegisterPayment } from '@/types/crypto';
import { findUserByWalletAddress } from '@/controllers/user.controller';
import { createPaymentReceipt } from '@/services/paymentReceipt.service';
const { DCX_IN_USD = 0.001 } = process.env;
const DCX_PRICE = Number(DCX_IN_USD);

const POST = async (request: NextRequest) => {
  try {
    const payload: RegisterPayment = await request.json();

    const owner = await findUserByWalletAddress(payload.owner_wallet);

    if (!owner) {
      return NextResponse.json({ message: 'Owner wallet not found' }, { status: 404 });
    }

    const amountInUSD = +payload.amount * DCX_PRICE;

    await createPaymentReceipt(
      payload.receipt_link,
      owner.id!,
      payload.beneficiary_wallet,
      amountInUSD,
    );

    return NextResponse.json(
      { message: 'Receipt processed successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing receipt:', error);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

export { POST };
