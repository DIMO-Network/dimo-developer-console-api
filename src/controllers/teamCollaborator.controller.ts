import { TeamCollaborator } from '@/models/teamCollaborator.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';

export function getTeamCollaborators(
  filter: FilterObject,
  pagination: PaginationOptions
) {
  return TeamCollaborator.findAllPaginated(filter, pagination);
}

export function findTeamCollaboratorById(id: string) {
  return TeamCollaborator.findOne({ where: { id } });
}

export function addTeamCollaborator(user: TeamCollaborator) {
  return TeamCollaborator.create(user);
}

export function updateTeamCollaboratorById(id: string, user: TeamCollaborator) {
  return TeamCollaborator.update(user, { where: { id } });
}

export function deleteTeamCollaboratorById(id: string) {
  return TeamCollaborator.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
}
