import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

import { updateUserById } from '@/controllers/user.controller';
import { fleetGeneration } from '@/controllers/lead.controller';
import { getUserByToken } from '@/services/user.service';
import { isErrorWithMessage } from '@/utils/error.utils';

const getTokenFromHeader = () => {
  const authorizationToken = headers().get('Authorization') ?? '';
  return authorizationToken.replace('Bearer ', '');
};

const getUserFromToken = async () => {
  const token = getTokenFromHeader();
  return getUserByToken(token);
};

export async function GET() {
  try {
    const user = await getUserFromToken();
    return Response.json(user?.dataValues);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[OAuth] Get user information by token',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json(
      {
        message: message,
      },
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const loggedUser = await getUserFromToken();
  const incomingUser = await request.json();
  const complete = Boolean(searchParams.get('complete'));

  await updateUserById(loggedUser?.id ?? '', incomingUser);
  const user = await getUserFromToken();
  if (complete) {
    fleetGeneration(user);
  }

  return Response.json(user);
}
