import { User } from '@/models/user.model';
import { PaginationOptions } from '@/utils/paginateData.utils';

export function getUsers({ pageSize, page }: PaginationOptions) {
  return User.findAllPaginated({ where: {} }, { pageSize, page });
}

export function findUserById(id: string) {
  return User.findOne({ where: { id } });
}

export function createUser(user: User) {
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
