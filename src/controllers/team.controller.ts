import { Team } from '@/models/team.model';
import { PaginationOptions } from '@/utils/paginateData.utils';

export function getTeams(paginationOptions: PaginationOptions) {
  return Team.findAllPaginated({ where: {} }, paginationOptions);
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
