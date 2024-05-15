import _ from 'lodash';

import {
  getTeamInvitations,
  invitePersonToMyTeam,
} from '@/controllers/teamInvitation.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { isErrorWithMessage } from '@/utils/error.utils';
import { getPaginationFromParams } from '@/utils/paginateData';
import { User } from '@/models/user.model';

export const GET = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const pagination = getPaginationFromParams(params);

    const invitations = await getTeamInvitations(params, pagination);

    return Response.json(invitations);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team Invitations] Get team invitations by the logged user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request?.user?.user as User;

    const inputInvitation = _.pick(await request.json(), ['email']) as {
      email: string;
    };

    await invitePersonToMyTeam(loggedUser, inputInvitation.email);
    return Response.json(
      {
        message: `Invitation has been sent to ${inputInvitation.email}`,
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team Invitation] Get team invitations by the logged user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
