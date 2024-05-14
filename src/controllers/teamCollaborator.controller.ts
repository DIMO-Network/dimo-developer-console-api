import { TeamCollaborator, TeamRoles } from '@/models/teamCollaborator.model';
import { User } from '@/models/user.model';
import { findTeamCollaboratorByUserId } from '@/services/teamCollaborator.service';
import { ValidatorError } from '@/utils/error.utils';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';

export async function getTeamCollaborators(
  filter: FilterObject,
  pagination: PaginationOptions
) {
  return TeamCollaborator.findAllPaginated(filter, pagination);
}

export async function findTeamCollaboratorById(id: string) {
  return TeamCollaborator.findOne({ where: { id } });
}

export async function addTeamCollaborator(user: TeamCollaborator) {
  return TeamCollaborator.create(user);
}

export async function updateTeamCollaboratorById(
  id: string,
  user: TeamCollaborator
) {
  return TeamCollaborator.update(user, { where: { id } });
}

export async function deleteTeamCollaboratorById(id: string) {
  return TeamCollaborator.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
}

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
