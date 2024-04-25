import { headers } from 'next/headers';

import Controller from '@/controllers/auth.controller';
import { updateUserById } from '@/controllers/user.controller';

const getTokenFromHeader = () => {
  const authorizationToken = headers().get('Authorization') ?? '';
  return authorizationToken.replace('Bearer ', '');
};

const getUserFromToken = async () => {
  const token = getTokenFromHeader();
  return Controller.getUserByToken(token);
};

export async function GET() {
  try {
    const user = await getUserFromToken();
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

export async function PUT(request: Request) {
  const loggedUser = await getUserFromToken();
  const incomingUser = await request.json();

  console.log({ incomingUser });

  const createdUser = await updateUserById(loggedUser?.id ?? '', incomingUser);

  return Response.json(createdUser);
}
