import _ from 'lodash';
import { Attributes } from 'sequelize';

import { createUser, getUsers } from '@/controllers/user.controller';
import { getPaginationFromParams } from '@/utils/paginateData';
import { User } from '@/models/user.model';

export async function POST(request: Request) {
  const userData = _.pick(await request.json(), [
    'name',
    'email',
    'auth',
    'role',
    'build_for',
    'build_for_text',
    'company_name',
    'company_region',
    'company_website',
    'crm_id',
  ]) as Attributes<User>;
  const createdUSer = await createUser(userData);

  return Response.json(createdUSer);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const users = await getUsers(params, pagination);

  return Response.json(users);
}
