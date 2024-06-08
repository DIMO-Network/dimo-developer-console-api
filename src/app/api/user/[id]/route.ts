import _ from 'lodash';
import { Attributes } from 'sequelize';

import {
  deleteUserById,
  findUserById,
  updateUserById,
} from '@/controllers/user.controller';
import { User } from '@/models/user.model';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params: { id } }: Params) {
  const user = await findUserById(id);
  return Response.json(user);
}

export async function PUT(request: Request, { params: { id } }: Params) {
  const userData = _.pick(await request.json(), [
    'name',
    'email',
    'role',
    'build_for',
    'build_for_text',
    'company_name',
    'company_region',
    'company_website',
    'crm_id',
  ]) as Partial<Attributes<User>>;
  const createdUser = await updateUserById(id, userData);

  return Response.json(createdUser);
}

export async function DELETE(_request: Request, { params: { id } }: Params) {
  const deletedUser = await deleteUserById(id);

  return Response.json(deletedUser);
}
