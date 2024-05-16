import _ from 'lodash';

import {
  acceptTeamInvitation,
  getTeamInvitations,
  invitePersonToMyTeam,
} from '@/controllers/teamInvitation.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getPaginationFromParams } from '@/utils/paginateData';
import { isErrorWithMessage } from '@/utils/error.utils';
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

    const { email, role } = _.pick(await request.json(), ['email', 'role']) as {
      email: string;
      role: string;
    };

    await invitePersonToMyTeam(loggedUser, email, role);
    return Response.json(
      {
        message: `Invitation has been sent to ${email}`,
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

export const PUT = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request?.user?.user as User;

    const { invitation_code: invitationCode } = _.pick(await request.json(), [
      'invitation_code',
    ]) as {
      invitation_code: string;
    };

    await acceptTeamInvitation(loggedUser, invitationCode);

    return Response.json(
      { message: 'Invitation has been accepted' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team Invitation] Accept team invitation',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
