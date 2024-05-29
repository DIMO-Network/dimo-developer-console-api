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

export function createUser(user: Attributes<User>) {
  return User.create(user);
}

export function updateUserById(id: string, user: User) {
  return User.update(user, { where: { id } });
}

export function deleteUserById(id: string) {
  return User.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
}
