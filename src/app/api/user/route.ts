import { createUser, getUsers } from '@/controllers/user.controller';
import { getPaginationFromParams } from '@/utils/paginateData';

export async function POST(request: Request) {
  const user = await request.json();
  const createdUSer = await createUser(user);

  return Response.json(createdUSer);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const users = await getUsers(params, pagination);

  return Response.json(users);
}
