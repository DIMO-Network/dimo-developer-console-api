import { pick } from 'lodash';

import { associateTeam } from '@/controllers/team.controller';
import { COMPANY_MODIFIABLE_FIELDS, Company } from '@/models/company.model';
import {
  findUserByEmail,
  findUserById,
  getCompanyAndTeam,
  updateUserById,
} from '@/controllers/user.controller';
import { finishUpUserRegistration } from '@/controllers/company.controller';
// import { fleetGeneration } from '@/controllers/lead.controller';
import { User, USER_MODIFIABLE_FIELDS } from '@/models/user.model';
import { Attributes } from 'sequelize';
import { Token } from '@/types/auth';
import { fleetGeneration } from '@/controllers/lead.controller';
import { getToken } from '@/utils/auth';
import { JwtPayload } from 'jsonwebtoken';

export async function PUT(request: NextRequest) {
  const token = (await getToken({ req: request })) as JwtPayload;

  const incomingData = await request.json();
  const user = (await findUserByEmail(incomingData.email)) as User;

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 });
  }
  const incommingUser = pick(incomingData, USER_MODIFIABLE_FIELDS) as User;

  const userId = user.id!;
  const updatedUser = await updateUserById(userId, incommingUser);

  if (incomingData.company) {
    const incomingCompany = pick(
      incomingData.company,
      COMPANY_MODIFIABLE_FIELDS,
    ) as Attributes<Company>;
    const company = await finishUpUserRegistration(userId, incomingCompany);
    await associateTeam(user, company);
  }

  const userCompleteInfo = await getCompanyAndTeam(user);
  fleetGeneration(userCompleteInfo);

  return Response.json(userCompleteInfo);
}
