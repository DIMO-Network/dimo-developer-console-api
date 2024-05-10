import { TeamCollaborator, TeamRoles } from '@/models/teamCollaborator.model';
import { TeamInvitation } from '@/models/teamInvitation.model';
import { User } from '@/models/user.model';

export const getTeamInvitation = async (email: string) => {
  return TeamInvitation.findOne({ where: { email } });
};

export const initTeamInvitation = async (
  hasTeam: boolean,
  { id = '', email }: User
) => {
  const invitation = await getTeamInvitation(email);
  const hasInvitation = Boolean(invitation);

  if (hasTeam || !(hasInvitation && invitation)) return false;

  await TeamCollaborator.create({
    team_id: invitation.team_id,
    user_id: id,
    role: TeamRoles.COLLABORATOR,
  });

  return true;
};
