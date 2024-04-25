import Controller from '@/controllers/auth.controller';

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
