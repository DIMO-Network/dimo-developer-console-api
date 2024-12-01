import { getToken } from 'next-auth/jwt';
import { LoggedUser } from '@/utils/loggedUser';
import { Token } from '@/types/auth';
import { processOAuth } from '@/controllers/auth.controller';

export const AuthenticationMiddleware = async (request: NextRequest) => {
  try {
    const token = (await getToken({ req: request })) as Token;
    const [user] = await processOAuth(token);
    request.user = new LoggedUser(user);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[OAuth] Get user information by token',
    });
  }
};

export default AuthenticationMiddleware;
