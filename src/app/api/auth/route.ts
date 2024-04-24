import Controller from '@/controllers/auth.controller';
import { headers } from 'next/headers';

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
  } catch (error: any) {
    console.error({
      error,
      step: '[OAuth] Sign In/Up process',
      code,
      app,
    });
    return Response.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const token = headers().get('Authorization') ?? '';

  try {
    const user = await Controller.getUserByToken(token);
    return Response.json(user);
  } catch (error: any) {
    console.error({
      error,
      step: '[OAuth] Get user information by token',
    });
    return Response.json(
      {
        message: error.message,
      },
      { status: 400 }
    );
  }
}
