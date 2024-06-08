import AuthService from '@/services/auth';
import AuthUtils from '@/utils/auth';
import { User } from '@/models/user.model';
import {
  handleErrorType,
  handleUniqueConstraintError,
} from '@/models/error.model';
import { UniqueConstraintError } from 'sequelize';

export const processOAuth = async (code: string, app: string, url: string) => {
  const { token, user } = await AuthService.processOAuth(code, app, url);

  const where = { email: user.email, auth: app };
  const [currentUser] = await User.findOrCreate({
    where,
    defaults: {
      name: user.name,
      email: user.email,
      auth: app,
      auth_login: user.authLogin,
      avatar_url: user.avatarUrl,
      refresh_token: token.refreshToken || '',
      refresh_token_expiration: new Date(token.expiryDate),
    },
  }).catch(
    handleErrorType(UniqueConstraintError, handleUniqueConstraintError('email'))
  );

  return currentUser;
};

export const generateToken = ({ id = '' }: User) => {
  return AuthUtils.generateToken({ id });
};
