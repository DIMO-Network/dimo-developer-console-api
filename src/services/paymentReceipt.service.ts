import { PaymentReceipt } from '@/models/paymentReceipt.model';

export const createPaymentReceipt = async (
  receiptLink: string,
  ownerId: string,
  beneficiary: string,
  amount: number,
) => {
  return PaymentReceipt.create({
    receipt_link: receiptLink,
    owner_id: ownerId,
    beneficiary,
    amount,
  });
};
