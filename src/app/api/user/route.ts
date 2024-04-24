import { createUser, getUsers } from '@/controllers/user.controller';

export async function POST(request: Request) {
  const user = await request.json();
  const createdUSer = await createUser(user);

  return Response.json(createdUSer);
}

export async function GET() {
  const users = await getUsers();
  return Response.json(users);
}
