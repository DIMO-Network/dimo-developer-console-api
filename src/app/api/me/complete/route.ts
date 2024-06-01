import _ from 'lodash';

import { associateTeam } from '@/controllers/team.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { USER_COMPANY_MODIFIABLE_FIELDS, User } from '@/models/user.model';
import { findUserById } from '@/controllers/user.controller';
import { IUserCompany } from '@/types/user';
import { finishUpUserRegistration } from '@/controllers/company.controller';

export async function PUT(request: NextRequest) {
  await AuthenticationMiddleware(request);
  const { id: userId = '' } = request.user!.user as User;
  const incomingData = await request.json();

  const incomingCompany = _.pick(
    incomingData,
    USER_COMPANY_MODIFIABLE_FIELDS
  ) as IUserCompany;
  // fleetGeneration(user);
  const user = (await findUserById(userId)) as User;
  const company = await finishUpUserRegistration(userId, incomingCompany);
  await associateTeam(user, company);

  return Response.json(user);
}
