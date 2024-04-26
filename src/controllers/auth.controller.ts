import AuthService from '@/services/auth';
import AuthUtils from '@/utils/auth';
import { User } from '@/models/user.model';
import { JwtPayload } from 'jsonwebtoken';

export const processOAuth = async (code: string, app: string) => {
  const { token, user } = await AuthService.processOAuth(code, app);

  const where = { email: user.email, auth: app };
  const [currentUser] = await User.findOrCreate({
    where,
    defaults: {
      name: user.name,
      email: user.email,
      auth: app,
      refresh_token: token.refreshToken || '',
      refresh_token_expiration: new Date(token.expiryDate),
    },
  });

  return currentUser;
};

export const generateToken = ({ id = '' }: User) => {
  return AuthUtils.generateToken({ id });
};

export const getUserByToken = async (token: string) => {
  const { id: userId } = AuthUtils.verifyAuth(token) as JwtPayload;
  return User.findOne({ where: { id: userId } });
};

export default {
  processOAuth,
  generateToken,
  getUserByToken,
};
