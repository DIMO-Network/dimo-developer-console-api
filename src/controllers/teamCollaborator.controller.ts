import { Attributes } from 'sequelize';

import { FilterObject } from '@/utils/filter';
import { findTeamCollaboratorByUserId } from '@/services/teamCollaborator.service';
import { PaginationOptions } from '@/utils/paginateData';
import { TeamCollaborator, TeamRoles } from '@/models/teamCollaborator.model';
import { User } from '@/models/user.model';
import { ValidatorError } from '@/utils/error.utils';

export async function getTeamCollaborators(
  filter: FilterObject,
  pagination: PaginationOptions
) {
  return TeamCollaborator.findAllPaginated(filter, pagination);
}

export async function getMyTeamCollaborators(
  teamId: string,
  filter: FilterObject,
  pagination: PaginationOptions
) {
  return getTeamCollaborators(
    {
      ...filter,
      team_id: teamId,
    },
    pagination
  );
}

export async function findTeamCollaboratorById(id: string) {
  return TeamCollaborator.findOne({ where: { id } });
}

export async function addTeamCollaborator(
  teamCollaboratorData: Attributes<TeamCollaborator>
) {
  return TeamCollaborator.create(teamCollaboratorData);
}

export async function updateTeamCollaboratorById(
  id: string,
  teamCollaboratorData: Attributes<TeamCollaborator>
) {
  return TeamCollaborator.update(teamCollaboratorData, { where: { id } });
}

export const deleteTeamCollaboratorById = async (id: string) => {
  return TeamCollaborator.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
};

export const removeMyCollaboratorById = async (
  { id: userId }: User,
  id: string
) => {
  const { role: currentUserRole } =
    (await findTeamCollaboratorByUserId(userId ?? '')) ?? {};

  if (currentUserRole !== TeamRoles.OWNER)
    throw new ValidatorError(
      'Do not have enough permissions to remove a collaborator'
    );

  const { user_id: collaboratorId } =
    (await findTeamCollaboratorById(id ?? '')) ?? {};
  const { totalItems: totalOwners } = await getTeamCollaborators(
    { role: TeamRoles.OWNER, deleted: 'false' },
    { page: 1, pageSize: 10 }
  );
  if (totalOwners === 1 && userId === collaboratorId)
    throw new ValidatorError(
      'Cannot remove the only administrator from the group.'
    );

  return deleteTeamCollaboratorById(id);
};

export const findMyTeam = async (userId: string) => {
  return TeamCollaborator.findOne({ where: { user_id: userId } });
};
