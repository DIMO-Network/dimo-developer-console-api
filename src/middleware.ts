import { createRemoteJWKSet, jwtVerify } from 'jose';
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
      { status: 401 },
    );
  }

  return NextResponse.next();
};

const getToken = async ({ req }: { req: NextRequest }) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }

  const jwks = createRemoteJWKSet(new URL(process.env.JWT_KEY_SET_URL!));
  const { payload } = await jwtVerify(token, jwks, {
    algorithms: ['RS256'],
    issuer: process.env.JWT_ISSUER,
  });

  return payload as Token;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
