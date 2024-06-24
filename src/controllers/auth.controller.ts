import { User } from '@/models/user.model';
import {
  handleErrorType,
  handleUniqueConstraintError,
} from '@/models/error.model';
import { Op, UniqueConstraintError } from 'sequelize';
import { Token } from '@/types/auth';

export const hasMandatoryInformation = (user: Token) => {
  return (
    (Boolean(user?.email) || Boolean(user?.address)) && Boolean(user?.provider)
  );
};

export const processOAuth = async (token: Token) => {
  const { email = '', provider: auth = '', address = '' } = token;
  const where = { [Op.or]: [{ email }, { address }], auth };

  const [currentUser] = await User.findOrCreate({
    where,
    defaults: {
      name: token.name,
      email: token.email,
      address: token.address,
      auth,
      auth_login: token.email,
      avatar_url: token.picture,
    },
  }).catch(
    handleErrorType(UniqueConstraintError, handleUniqueConstraintError('email'))
  );
  return currentUser;
};
