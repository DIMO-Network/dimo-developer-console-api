import _ from 'lodash';

import { associateTeam } from '@/controllers/team.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { fleetGeneration } from '@/controllers/lead.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { updateUserById } from '@/controllers/user.controller';
import { User } from '@/models/user.model';

export async function GET(request: NextRequest) {
  try {
    await AuthenticationMiddleware(request);
    return Response.json(request.user?.user);
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
  await AuthenticationMiddleware(request);
  const searchParams = request.nextUrl.searchParams;
  const loggedUser = request.user?.user;
  const userId = loggedUser?.id ?? '';
  const incomingUser = _.pick(await request.json(), [
    'name',
    'email',
    'role',
    'build_for',
    'build_for_text',
    'company_name',
    'company_website',
    'company_region',
  ]) as User;
  const complete = Boolean(searchParams.get('complete'));

  const user = await updateUserById(userId, incomingUser);
  if (user && complete) {
    fleetGeneration(user);
    associateTeam(user);
  }

  return Response.json(user);
}
