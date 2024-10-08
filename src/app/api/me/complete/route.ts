import _ from 'lodash';
import { getToken } from 'next-auth/jwt';

import { associateTeam } from '@/controllers/team.controller';
import { COMPANY_MODIFIABLE_FIELDS, Company } from '@/models/company.model';
import { findUserById, getCompanyAndTeam } from '@/controllers/user.controller';
import { finishUpUserRegistration } from '@/controllers/company.controller';
// import { fleetGeneration } from '@/controllers/lead.controller';
import { User } from '@/models/user.model';
import { Attributes } from 'sequelize';
import { Token } from '@/types/auth';
import { fleetGeneration } from '@/controllers/lead.controller';

export async function PUT(request: NextRequest) {
  const token = (await getToken({ req: request })) as Token;
  const { userId = '' } = token;
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

  return Response.json(userCompleteInfo);
}
