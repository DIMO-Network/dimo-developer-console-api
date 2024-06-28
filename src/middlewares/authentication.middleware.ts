import { findUserById } from '@/controllers/user.controller';
import { getToken } from 'next-auth/jwt';
import { LoggedUser } from '@/utils/loggedUser';
import { Token } from '@/types/auth';
import { User } from '@/models/user.model';

export const logUser = async (request: NextRequest) => {
  const token = (await getToken({ req: request })) as Token;

  if (token) {
    const { dataValues } = (await findUserById(token?.userId ?? '')) as User;
    return dataValues;
  }

  return null;
};

export const AuthenticationMiddleware = async (request: NextRequest) => {
  try {
    const user = await logUser(request);
    request.user = new LoggedUser(user);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[OAuth] Get user information by token',
    });
  }
};

export default AuthenticationMiddleware;
