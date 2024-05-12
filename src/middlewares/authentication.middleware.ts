import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

import { getUserByToken } from '@/services/user.service';
import { isErrorWithMessage } from '@/utils/error.utils';
import { isIn } from '@/utils/middlewareUtils';
import { LoggedUser } from '@/utils/loggedUser';

const PROTECTED_PATHS = ['/api/me', '/api/my'];

const mustLogin = (request: NextRequest) => {
  const url = request.nextUrl.pathname;

  const isProtected = PROTECTED_PATHS.some(isIn(url));
  return isProtected;
};

export const logUser = async () => {
  const { value: tokenByCookie = '' } = cookies().get('token') ?? {};
  const completeTokenByHeader = headers().get('Authorization') ?? '';
  const [, tokenByHeader = ''] = completeTokenByHeader.split(' ');
  const token = tokenByCookie || tokenByHeader;

  if (token) {
    return getUserByToken(token);
  }

  return null;
};

export const AuthenticationMiddleware = async (request: NextRequest) => {
  if (!mustLogin(request)) return NextResponse.next();

  try {
    const user = await logUser();
    request.user = new LoggedUser(user);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[OAuth] Get user information by token',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json(
      {
        message: message,
      },
      { status: 400 }
    );
  }
};

export default AuthenticationMiddleware;
