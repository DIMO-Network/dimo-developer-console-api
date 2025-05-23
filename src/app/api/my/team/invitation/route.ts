import _ from 'lodash';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { invitePersonToMyTeam } from '@/controllers/teamCollaborator.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';

export const POST = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request?.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);

    const { email, role } = _.pick(await request.json(), ['email', 'role']) as {
      email: string;
      role: string;
    };

    await invitePersonToMyTeam(
      loggedUser,
      userCompleteInfo?.company?.name ?? '',
      email,
      role,
    );
    return Response.json(
      {
        message: `Invitation has been sent to ${email}`,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team Invitation] Send team invitation',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
