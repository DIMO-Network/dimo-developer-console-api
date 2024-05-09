import { Team } from '@/models/team.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';

export function getTeams(filter: FilterObject, pagination: PaginationOptions) {
  return Team.findAllPaginated(filter, pagination);
}

export function findTeamById(id: string) {
  return Team.findOne({ where: { id } });
}

export function createTeam(user: Team) {
  return Team.create(user);
}

export function updateTeamById(id: string, user: Team) {
  return Team.update(user, { where: { id } });
}

export function deleteTeamById(id: string) {
  return Team.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
}

export function findMyTeam(id: string) {
  return Team.findOne({ where: { created_by: id } });
}
