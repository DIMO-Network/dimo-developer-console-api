import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

import { isIn } from '@/utils/middlewareUtils';
import { Token } from '@/types/auth';
import configuration from '@/config';

const { UNPROTECTED_PATHS } = configuration;

const mustBeAuthorize = (request: NextRequest, token: Token | null) => {
  const url = request.nextUrl.pathname;

  const isPublicAPIPath = UNPROTECTED_PATHS.some(isIn(url));
  return !isPublicAPIPath && !token;
};

export const middleware = async (request: NextRequest) => {
  const token = (await getToken({ req: request })) as Token;

  // Setting the user up
  if (!token && mustBeAuthorize(request, token)) {
    return NextResponse.json(
      {
        message: 'Unauthorized Access',
      },
      { status: 401 }
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
