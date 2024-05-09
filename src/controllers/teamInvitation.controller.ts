import { TeamInvitation } from '@/models/teamInvitation.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';

export function getTeamInvitations(
  filter: FilterObject,
  pagination: PaginationOptions
) {
  return TeamInvitation.findAllPaginated(filter, pagination);
}

export function findTeamInvitationById(id: string) {
  return TeamInvitation.findOne({ where: { id } });
}

export function addTeamInvitation(user: TeamInvitation) {
  return TeamInvitation.create(user);
}

export function deleteTeamInvitationById(id: string) {
  return TeamInvitation.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
}
