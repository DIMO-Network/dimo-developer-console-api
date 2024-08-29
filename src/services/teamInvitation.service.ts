import { TeamCollaborator, TeamRoles } from '@/models/teamCollaborator.model';
import {
  InvitationStatuses,
  TeamInvitation,
} from '@/models/teamInvitation.model';
import { User } from '@/models/user.model';
import { ValidatorError } from '@/utils/error.utils';

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

export const isActiveInvitation = (teamInvitation: TeamInvitation | null) => {
  const { team_id: teamId, status } = teamInvitation ?? {};

  if (!teamId) throw new ValidatorError('The invitation was not found');
  if (status === InvitationStatuses.ACCEPTED) return false;

  return true;
};

export const markAsAccepted = async (invitationId: string) => {
  return TeamInvitation.update(
    {
      status: InvitationStatuses.ACCEPTED,
    },
    {
      where: { id: invitationId },
    }
  );
};
