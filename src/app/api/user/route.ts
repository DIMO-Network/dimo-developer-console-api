import { createUser, getUsers } from '@/controllers/user.controller';

export async function POST(request: Request) {
  const user = await request.json();
  const createdUSer = await createUser(user);

  return Response.json(createdUSer);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const page = Number(params.get('page') || 1);
  const pageSize = Number(params.get('pageSize') || 10);
  console.log({ page, pageSize });
  const users = await getUsers({
    page,
    pageSize,
  });
  return Response.json(users);
}
