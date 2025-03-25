import { getToken } from '@/utils/auth';
import { NextResponse } from 'next/server';

import { isIn } from '@/utils/middlewareUtils';
import configuration from '@/config';
import { JwtPayload } from 'jsonwebtoken';

const { UNPROTECTED_PATHS } = configuration;

const mustBeAuthorize = (request: NextRequest, token: JwtPayload | null) => {
  const url = request.nextUrl.pathname;
  const isPublicAPIPath = UNPROTECTED_PATHS.some(isIn(url));
  return !isPublicAPIPath && !token;
};

export const middleware = async (request: NextRequest) => {
  const token = await getToken({ req: request });

  // Setting the user up
  if (!token && mustBeAuthorize(request, token)) {
    return NextResponse.json(
      {
        message: 'Unauthorized Access',
      },
      { status: 401 },
    );
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
