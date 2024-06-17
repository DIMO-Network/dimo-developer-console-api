import _ from 'lodash';

import { NextRequest } from 'next/server';
import { JWT, getToken } from 'next-auth/jwt';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { isErrorWithMessage } from '@/utils/error.utils';
import { USER_MODIFIABLE_FIELDS, User } from '@/models/user.model';
import {
  getCompanyAndTeam,
  updateUserById,
} from '@/controllers/user.controller';
import { processOAuth } from '@/controllers/auth.controller';

export const GET = async (request: NextRequest) => {
  try {
    const token = (await getToken({ req: request })) as JWT;
    const user = await processOAuth(token);
    const userCompleteInfo = await getCompanyAndTeam(user);
    return Response.json(userCompleteInfo);
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
};

export async function PUT(request: NextRequest) {
  await AuthenticationMiddleware(request);
  const { id: userId = '' } = request.user!.user as User;
  const incomingData = await request.json();

  const incomingUser = _.pick(incomingData, USER_MODIFIABLE_FIELDS) as User;
  const user = (await updateUserById(userId, incomingUser)) as User;
  return Response.json(user);
}
