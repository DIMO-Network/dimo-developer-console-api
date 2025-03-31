import { pick } from 'lodash';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { USER_MODIFIABLE_FIELDS, User } from '@/models/user.model';
import { getCompanyAndTeam, updateUserById } from '@/controllers/user.controller';
import { hasMandatoryInformation, processOAuth } from '@/controllers/auth.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { acceptTeamInvitation } from '@/controllers/teamCollaborator.controller';
import { getToken } from '@/utils/auth';
import { JwtPayload } from 'jsonwebtoken';

export const GET = async (request: NextRequest) => {
  try {
    const token = (await getToken({ req: request })) as JwtPayload;
    if (!hasMandatoryInformation(token)) return Response.json({});

    const invitationCode = request.nextUrl.searchParams.get('invitation_code');
    const [user, isNew] = await processOAuth(token);
    await acceptTeamInvitation(user, isNew, invitationCode).catch((error) =>
      console.error(error.message),
    );
    const userCompleteInfo = await getCompanyAndTeam(user);
    return Response.json(userCompleteInfo);
  } catch (error: unknown) {
    console.error(error);
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json(
      {
        message: message,
      },
      { status: 400 },
    );
  }
};

export async function PUT(request: NextRequest) {
  await AuthenticationMiddleware(request);
  const { id: userId = '' } = request.user!.user as User;
  const incomingData = await request.json();

  const incomingUser = pick(incomingData, USER_MODIFIABLE_FIELDS) as User;
  const user = (await updateUserById(userId, incomingUser)) as User;
  return Response.json(user);
}
