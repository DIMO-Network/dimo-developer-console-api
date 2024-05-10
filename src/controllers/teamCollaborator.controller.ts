import { TeamCollaborator } from '@/models/teamCollaborator.model';
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
