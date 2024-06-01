import _ from 'lodash';

import { associateTeam } from '@/controllers/team.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { fleetGeneration } from '@/controllers/lead.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import {
  USER_COMPANY_MODIFIABLE_FIELDS,
  USER_MODIFIABLE_FIELDS,
  User,
} from '@/models/user.model';
import { findUserById, updateUserById } from '@/controllers/user.controller';
import { IUserCompany } from '@/types/user';
import { finishUpUserRegistration } from '@/controllers/company.controller';

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
  const { id: userId = '' } = request.user!.user as User;
  const incomingData = await request.json();
  const complete = Boolean(searchParams.get('complete'));

  let user = request.user!.user as User;

  if (complete) {
    const incomingCompany = _.pick(
      incomingData,
      USER_COMPANY_MODIFIABLE_FIELDS
    ) as IUserCompany;
    // fleetGeneration(user);
    const user = (await findUserById(userId)) as User;
    const company = await finishUpUserRegistration(userId, incomingCompany);
    await associateTeam(user, company);
  } else {
    const incomingUser = _.pick(incomingData, USER_MODIFIABLE_FIELDS) as User;
    user = (await updateUserById(userId, incomingUser)) as User;
  }

  return Response.json(user);
}
