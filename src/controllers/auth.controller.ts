import { JWT } from 'next-auth/jwt';

import { User } from '@/models/user.model';
import {
  handleErrorType,
  handleUniqueConstraintError,
} from '@/models/error.model';
import { UniqueConstraintError } from 'sequelize';

export const processOAuth = async (token: JWT) => {
  const { email, provider: auth } = token;
  const where = { email, auth };
  const [currentUser] = await User.findOrCreate({
    where,
    defaults: {
      name: token.name,
      email: token.email,
      auth,
      auth_login: token.email,
      avatar_url: token.picture,
    },
  }).catch(
    handleErrorType(UniqueConstraintError, handleUniqueConstraintError('email'))
  );

  return currentUser;
};
