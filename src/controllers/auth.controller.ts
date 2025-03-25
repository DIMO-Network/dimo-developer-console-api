import { User } from '@/models/user.model';
import { handleErrorType, handleUniqueConstraintError } from '@/models/error.model';
import { UniqueConstraintError } from 'sequelize';
import { Token } from '@/types/auth';
import { JwtPayload } from 'jsonwebtoken';

export const hasMandatoryInformation = (user: Token) => {
  return (Boolean(user?.email) || Boolean(user?.address)) && Boolean(user?.provider);
};

export const processOAuth = async (token: JwtPayload | null): Promise<[User, boolean]> => {

  if (!token) {
    throw new Error('Token is required');
  }

  const { ethereum_address = '' } = token;

  const currentUser = await User.findOne({
    where: {
      address: ethereum_address,
    },
  });

  // const [currentUser, isNew] = await User.findOrCreate({
  //   where: { email },
  //   defaults: {
  //     name: token.name,
  //     email: token.email,
  //     address: address,
  //     auth,
  //     auth_login: token.email,
  //     avatar_url: token.picture,
  //   },
  // }).catch(handleErrorType(UniqueConstraintError, handleUniqueConstraintError('email')));
  return [currentUser!, false];
};
