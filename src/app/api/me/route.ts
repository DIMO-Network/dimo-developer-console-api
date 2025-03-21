import _ from 'lodash';

import { getToken } from 'next-auth/jwt';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { USER_MODIFIABLE_FIELDS, User } from '@/models/user.model';
import {
  getCompanyAndTeam,
  updateUserById,
} from '@/controllers/user.controller';
import {
  hasMandatoryInformation,
  processOAuth,
} from '@/controllers/auth.controller';
import { Token } from '@/types/auth';
import { isErrorWithMessage } from '@/utils/error.utils';
import { acceptTeamInvitation } from '@/controllers/teamCollaborator.controller';

export const GET = async (request: NextRequest) => {
  try {
    const token = (await getToken({ req: request })) as Token;
    if (!hasMandatoryInformation(token)) return Response.json({});

    const invitationCode = request.nextUrl.searchParams.get('invitation_code');
    const [user, isNew] = await processOAuth(token);
    await acceptTeamInvitation(user, isNew, invitationCode).catch((error) =>
      console.error(error.message)
    );
    const userCompleteInfo = await getCompanyAndTeam(user);
    return Response.json(userCompleteInfo);
  } catch (error: unknown) {
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
