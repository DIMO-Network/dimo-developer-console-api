import _ from 'lodash';

import { getToken } from 'next-auth/jwt';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { USER_MODIFIABLE_FIELDS, User } from '@/models/user.model';
import {
  getCompanyAndTeam,
  updateUserById,
} from '@/controllers/user.controller';
import { processOAuth } from '@/controllers/auth.controller';
import { Token } from '@/types/auth';

export const GET = async (request: NextRequest) => {
  try {
    const token = (await getToken({ req: request })) as Token;

    if (token) {
      const user = await processOAuth(token);
      const userCompleteInfo = await getCompanyAndTeam(user);
      return Response.json(userCompleteInfo);
    }

    return Response.json({});
  } catch (error: unknown) {
    console.error({
      error,
      step: '[OAuth] Get user information by token',
    });
    return Response.json({});
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
