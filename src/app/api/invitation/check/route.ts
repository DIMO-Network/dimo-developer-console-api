import _ from 'lodash';

import { cookies } from 'next/headers';

import { checkTeamInvitation } from '@/controllers/teamInvitation.controller';
import { isErrorWithMessage } from '@/utils/error.utils';

export const POST = async (request: NextRequest) => {
  try {
    const { invitation_code: invitationCode } = _.pick(await request.json(), [
      'invitation_code',
    ]) as {
      invitation_code: string;
    };

    await checkTeamInvitation(invitationCode);
    cookies().set('invitation', invitationCode);

    return Response.json({ message: 'The invitation is valid' }, { status: 200 });
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team Invitation] Accept team invitation',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
