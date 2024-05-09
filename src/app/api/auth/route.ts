import Controller from '@/controllers/auth.controller';
import { isErrorWithMessage } from '@/utils/error.utils';

interface IProps {
  code: string;
  app: string;
  process: 'sign-in' | 'sign-up';
}

export async function POST(request: Request) {
  const { code, app } = (await request.json()) as IProps;
  try {
    const user = await Controller.processOAuth(code, app);
    const token = Controller.generateToken(user);

    return Response.json({
      token,
    });
  } catch (error: unknown) {
    console.error({
      error,
      step: '[OAuth] Sign In/Up process',
      code,
      app,
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
}
