import mailer from '@/utils/mailer';
import { generateSupportEmailTemplate } from '@/templates/support';

interface SupportEmailData {
  userName: string;
  userEmail: string;
  walletAddress: string;
  inquiryType: string;
  message: string;
}

const validateSupportEmailData = (data: SupportEmailData) => {
  const { walletAddress, inquiryType, message } = data;

  if (!walletAddress || typeof walletAddress !== 'string') {
    throw new Error('Invalid walletAddress');
  }
  if (!inquiryType || typeof inquiryType !== 'string') {
    throw new Error('Invalid inquiryType');
  }
  if (!message || typeof message !== 'string') {
    throw new Error('Invalid message');
  }
};

export const sendSupportEmail = async (data: SupportEmailData) => {
  validateSupportEmailData(data);

  const { userName, userEmail, walletAddress, inquiryType, message } = data;
  const emailTemplate = generateSupportEmailTemplate(
    userName,
    userEmail,
    walletAddress,
    inquiryType,
    message,
  );

  try {
    const supportEmail = process.env.DEVELOPER_SUPPORT_EMAIL;
    if (!supportEmail) {
      throw new Error('Support email is not defined in environment variables');
    }

    await mailer.sendMail({
      to: supportEmail,
      subject: 'New Support Inquiry',
      html: emailTemplate,
    });
    console.log('Support email sent successfully');
  } catch (error) {
    console.error('Error sending support email:', error);
    throw new Error('Error sending support email');
  }
};
