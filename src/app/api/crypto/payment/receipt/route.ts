import { NextResponse } from 'next/server';
import { RegisterPayment } from '@/types/crypto';
import { findUserByWalletAddress } from '@/controllers/user.controller';
import { createPaymentReceipt } from '@/services/paymentReceipt.service';

const POST = async (request: NextRequest) => {
  try {
    const payload: RegisterPayment = await request.json();

    const owner = await findUserByWalletAddress(payload.owner_wallet);

    if (!owner) {
      return NextResponse.json({ message: 'Owner wallet not found' }, { status: 404 });
    }

    await createPaymentReceipt(
      payload.receipt_link,
      owner.id!,
      payload.beneficiary_wallet,
      payload.amount,
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
