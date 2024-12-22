import { generateTokenBoughtTemplate } from '@/templates/dcx';
import { TokenPurchaseTransaction } from '@/types/crypto';
import { User } from '@/models/user.model';

import config from '@/config';
import Mailer from '@/utils/mailer';

export const sentTokenBoughtEmail = async (
  user: User,
  token: string,
  transactionData: TokenPurchaseTransaction
) => {
  const template = generateTokenBoughtTemplate(
    user.name,
    user.email,
    token,
    transactionData
  );
  await Mailer.sendMail({
    to: config.purchaseEmailReceiver,
    subject: 'Token Purchase Notification',
    html: template,
  });
};
