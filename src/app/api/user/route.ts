import { pick } from 'lodash';
import { Attributes } from 'sequelize';

import { createUser, getUsers } from '@/controllers/user.controller';
import { getPaginationFromParams } from '@/utils/paginateData';
import { USER_MODIFIABLE_FIELDS, User } from '@/models/user.model';

export async function POST(request: Request) {
  const userData = pick(await request.json(), USER_MODIFIABLE_FIELDS) as Attributes<User>;
  const createdUSer = await createUser(userData);

  return Response.json(createdUSer);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const users = await getUsers(params, pagination);

  return Response.json(users);
}
