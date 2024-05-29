import { Attributes } from 'sequelize';

import { User } from '@/models/user.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';

export function getUsers(filter: FilterObject, pagination: PaginationOptions) {
  return User.findAllPaginated(filter, pagination);
}

export function findUserById(id: string) {
  return User.findOne({ where: { id } });
}

export function createUser(userData: Attributes<User>) {
  return User.create(userData);
}

export async function updateUserById(id: string, userData: Attributes<User>) {
  const [affectedRows, [updatedUser]] = await User.update(userData, {
    where: { id },
    returning: true,
  });
  if (affectedRows > 0) return updatedUser;
  else return null;
}

export function deleteUserById(id: string) {
  return User.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
}
