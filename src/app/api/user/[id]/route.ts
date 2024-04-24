import {
  deleteUserById,
  findUserById,
  updateUserById,
} from '@/controllers/user.controller';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params: { id } }: Params) {
  const user = await findUserById(id);
  return Response.json(user);
}

export async function PUT(request: Request, { params: { id } }: Params) {
  const user = await request.json();
  const createdUser = await updateUserById(id, user);

  return Response.json(createdUser);
}

export async function DELETE(_request: Request, { params: { id } }: Params) {
  const deletedUser = await deleteUserById(id);

  return Response.json(deletedUser);
}
