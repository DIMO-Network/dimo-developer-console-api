import _ from 'lodash';

import { associateTeam } from '@/controllers/team.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { COMPANY_MODIFIABLE_FIELDS, Company } from '@/models/company.model';
import { findUserById, getCompanyAndTeam } from '@/controllers/user.controller';
import { finishUpUserRegistration } from '@/controllers/company.controller';
import { fleetGeneration } from '@/controllers/lead.controller';
import { User } from '@/models/user.model';
import { Attributes } from 'sequelize';

export async function PUT(request: NextRequest) {
  await AuthenticationMiddleware(request);
  const { id: userId = '' } = request.user!.user as User;
  const incomingData = await request.json();

  const incomingCompany = _.pick(
    incomingData.company,
    COMPANY_MODIFIABLE_FIELDS
  ) as Attributes<Company>;
  const user = (await findUserById(userId)) as User;
  const company = await finishUpUserRegistration(userId, incomingCompany);
  await associateTeam(user, company);
  const userCompleteInfo = await getCompanyAndTeam(user);
  fleetGeneration(userCompleteInfo);

  return Response.json(user);
}
