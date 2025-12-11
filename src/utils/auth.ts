import { createRemoteJWKSet, jwtVerify } from 'jose';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface IProps {
  id: string;
}

const { JWT_PRIVATE_KEY: privateKey = '' } = process.env;

export class JWTError extends Error {}

/**
 * Verifies the user's JWT token and returns its payload if it's valid.
 */
export const verifyAuth = (token: string) => {
  try {
    return jwt.verify(token, privateKey);
  } catch (err) {
    console.error(err);
    throw new JWTError('Your token has expired.');
  }
};

export const generateToken = (payload: IProps) => {
  return jwt.sign(payload, privateKey);
};

export default {
  generateToken,
  verifyAuth,
};

export const getToken = async ({
  req,
}: {
  req: NextRequest;
}): Promise<JwtPayload | null> => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return null;
  }
  const jwks = createRemoteJWKSet(new URL(process.env.JWT_KEY_SET_URL!));
  const { payload } = await jwtVerify(token, jwks, {
    algorithms: ['RS256'],
    issuer: process.env.JWT_ISSUER,
  });

  return payload as JwtPayload;
};
