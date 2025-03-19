import { Company } from '@/models/company.model';
import { Team } from '@/models/team.model';
import {
  InvitationStatuses,
  TeamCollaborator,
  TeamRoles,
} from '@/models/teamCollaborator.model';
import { User } from '@/models/user.model';

export const getTeamById = async (id: string) => {
  return Team.findOne({ where: { id } });
};

export const getTeamOwner = async (id: string) => {
  return Team.findOne({ where: { created_by: id } });
};

export const isTeamOwner = async (id: string) => {
  return Boolean(await getTeamOwner(id));
};

export const initTeamOwner = async (
  hasTeam: boolean,
  { id = '' }: User,
  { id: companyId = '', name: companyName }: Company,
) => {
  if (hasTeam) return false;

  const team = await Team.create({
    name: companyName,
    company_id: companyId,
    created_by: id,
  });

  await TeamCollaborator.create({
    team_id: team.id ?? '',
    user_id: id,
    role: TeamRoles.OWNER,
    status: InvitationStatuses.ACCEPTED,
  });

  return true;
};
