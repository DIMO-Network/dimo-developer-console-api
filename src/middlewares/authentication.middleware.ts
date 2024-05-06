import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { getUserByToken } from '@/services/user.service';
import LoggedUser from '@/utils/loggedUser';

export const AuthenticationMiddleware = async (request: NextRequest) => {
  const { value: token = '' } = cookies().get('token') ?? {};

  if (token) request.user = new LoggedUser(await getUserByToken(token));

  return NextResponse.next();
};

export default AuthenticationMiddleware;
