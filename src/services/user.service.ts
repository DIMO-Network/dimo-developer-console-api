import { JwtPayload } from 'jsonwebtoken';

import AuthUtils from '@/utils/auth';
import { User } from '@/models/user.model';

export const getUserByToken = async (token: string) => {
  const { id: userId } = AuthUtils.verifyAuth(token) as JwtPayload;
  return User.findOne({ where: { id: userId } });
};
