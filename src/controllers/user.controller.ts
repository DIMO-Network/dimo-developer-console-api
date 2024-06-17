import { Attributes } from 'sequelize';

import { User } from '@/models/user.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { findMyCompany } from '@/controllers/company.controller';
import { findTeamCollaboratorByUserId } from '@/services/teamCollaborator.service';
import { findTeamById } from '@/controllers/team.controller';

export const getUsers = async (
  filter: FilterObject,
  pagination: PaginationOptions
) => {
  return User.findAllPaginated(filter, pagination);
};

export const findUserById = async (id: string) => {
  return User.findOne({ where: { id } });
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};

export const createUser = async (userData: Attributes<User>) => {
  return User.create(userData);
};

export const updateUserById = async (
  id: string,
  userData: Partial<Attributes<User>>
) => {
  console.log(userData);
  const [affectedRows, [updatedUser]] = await User.update(userData, {
    where: { id },
    returning: true,
  });
  if (affectedRows > 0) return updatedUser;
  else return null;
};

export const deleteUserById = async (id: string) => {
  return User.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
};

export const getCompanyAndTeam = async (user: User) => {
  const userId = user.id ?? '';
  const company = await findMyCompany(userId);
  const teamAssociated = await findTeamCollaboratorByUserId(userId);
  const team = await findTeamById(teamAssociated?.team_id ?? '');

  return {
    ...(user.dataValues || user),
    company: company?.dataValues,
    team: team?.dataValues,
  };
};
