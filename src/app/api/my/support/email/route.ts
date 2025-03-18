import { NextResponse } from 'next/server';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { sendSupportEmail } from '@/controllers/email.controller';
import { User } from '@/models/user.model';

export const POST = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const { walletAddress, inquiryType, message } = await request.json();

    await sendSupportEmail({
      userName: loggedUser.name,
      userEmail: loggedUser.email,
      walletAddress,
      inquiryType,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Error sending support email:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 400 }
    );
  }
};
