import { User } from '@/models/user.model';
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

  return [currentUser!, false];
};
