import { LoggedUser } from '@/utils/loggedUser';
import { processOAuth } from '@/controllers/auth.controller';
import { getToken } from '@/utils/auth';

export const AuthenticationMiddleware = async (request: NextRequest) => {
  try {
    const token = await getToken({ req: request });
    const user = await processOAuth(token);
    request.user = new LoggedUser(user);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[OAuth] Get user information by token',
    });
  }
};

export default AuthenticationMiddleware;
