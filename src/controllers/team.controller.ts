import { Attributes } from 'sequelize';

import { FilterObject } from '@/utils/filter';
import { initTeamInvitation } from '@/services/teamInvitation.service';
import { initTeamOwner, isTeamOwner } from '@/services/team.service';
import { isTeamCollaborator } from '@/services/teamCollaborator.service';
import { PaginationOptions } from '@/utils/paginateData';
import { Team } from '@/models/team.model';
import { User } from '@/models/user.model';
import { Company } from '@/models/company.model';

export function getTeams(filter: FilterObject, pagination: PaginationOptions) {
  return Team.findAllPaginated(filter, pagination);
}

export function findTeamById(id: string) {
  return Team.findOne({ where: { id } });
}

export function createTeam(teamData: Attributes<Team>) {
  return Team.create(teamData);
}

export function updateTeamById(id: string, teamData: Attributes<Team>) {
  return Team.update(teamData, { where: { id } });
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

export const associateTeam = async (teamData: User, companyData: Company) => {
  const isOwner = await isTeamOwner(teamData.id || '');
  const isCollaborator = await isTeamCollaborator(teamData.id || '');
  const hasTeam = isOwner && isCollaborator;

  const hadInvitation = await initTeamInvitation(hasTeam, teamData);
  await initTeamOwner(hasTeam, hadInvitation, teamData, companyData);
};
