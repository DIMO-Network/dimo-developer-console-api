import { User } from '@/models/user.model';
import { generateTokenBoughtTemplate } from '@/templates/dcx';

import config from '@/config';
import Mailer from '@/utils/mailer';

export const sentTokenBoughtEmail = async (
  user: User,
  token: string,
  transactionData: { amount: number }
) => {
  const template = generateTokenBoughtTemplate(
    user.name,
    user.email,
    token,
    transactionData.amount
  );
  await Mailer.sendMail({
    to: config.purchaseEmailReceiver,
    subject: 'Token Purchase Notification',
    html: template,
  });
};
