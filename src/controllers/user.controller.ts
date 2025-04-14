import { Attributes } from 'sequelize';

import { User } from '@/models/user.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { findTeamCollaboratorByUserId } from '@/services/teamCollaborator.service';
import { findTeamById } from '@/controllers/team.controller';
import { findCompanyById } from '@/services/company.service';

export const getUsers = async (filter: FilterObject, pagination: PaginationOptions) => {
  return User.findAllPaginated(filter, pagination);
};

export const findUserById = async (id: string) => {
  return User.findOne({ where: { id } });
};

export const findUserByEmail = async (email: string) => {
  if (!email) return null;
  return User.findOne({ where: { email } });
};

export const findUserByWalletAddress = async (address: string) => {
  return User.findOne({ where: { address } });
};

export const findUserByEmailOrAddress = async (item: string | null) => {
  return User.findOne({
    where: {
      email: item ?? '',
    },
  });
};

export const createUser = async (userData: Attributes<User>) => {
  return User.create(userData);
};

export const updateUserById = async (id: string, userData: Partial<Attributes<User>>) => {
  const [affectedRows, [updatedUser]] = await User.update(userData, {
    where: { id },
    returning: true,
  });
  if (affectedRows > 0) return updatedUser;
  else return null;
};

export const deleteUserById = async (id: string) => {
  return User.update({ deleted: false, deleted_at: new Date() }, { where: { id } });
};

export const getCompanyAndTeam = async (user: User) => {
  const userId = user?.id ?? '';
  const teamAssociated = await findTeamCollaboratorByUserId(userId);
  const team = await findTeamById(teamAssociated?.team_id ?? '');
  const company = await findCompanyById(team?.company_id ?? '');
  const companyOwner = await findUserById(company?.created_by ?? '');

  return {
    ...(user.dataValues || user),
    role: teamAssociated?.role,
    company: company?.dataValues,
    team: team?.dataValues,
    company_email_owner: companyOwner?.dataValues.email,
  };
};
