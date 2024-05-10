import { Team } from '@/models/team.model';
import { TeamCollaborator, TeamRoles } from '@/models/teamCollaborator.model';
import { User } from '@/models/user.model';

export const getTeamOwner = async (id: string) => {
  return Team.findOne({ where: { created_by: id } });
};

export const isTeamOwner = async (id: string) => {
  return Boolean(await getTeamOwner(id));
};

export const initTeamOwner = async (
  hasTeam: boolean,
  hadInvitation: boolean,
  { id = '', company_name = '' }: User
) => {
  if (hasTeam || hadInvitation) return false;

  const team = await Team.create({
    name: company_name,
    created_by: id,
  });

  await TeamCollaborator.create({
    team_id: team.id ?? '',
    user_id: id,
    role: TeamRoles.OWNER,
  });

  return true;
};
