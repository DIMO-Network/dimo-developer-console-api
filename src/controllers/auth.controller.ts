import { User } from '@/models/user.model';
import { JwtPayload } from 'jsonwebtoken';

export const hasMandatoryInformation = (user: JwtPayload) => {
  return (Boolean(user?.ethereum_address));
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
