import { User } from '@/models/user.model';

export function getUsers() {
  return User.findAll();
}
