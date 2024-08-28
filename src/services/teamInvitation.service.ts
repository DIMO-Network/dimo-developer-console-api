import { cookies } from 'next/headers';

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

export const getInvitationId = () => {
  const invitationCode = cookies().get('invitation');
  if (!invitationCode?.value) return null;

  return Buffer.from(invitationCode.value, 'base64').toString('utf8');
};

export const isActiveInvitation = (teamInvitation: TeamInvitation | null) => {
  const {
    team_id: teamId,
    expires_at: expiresAt = new Date(),
    status,
  } = teamInvitation ?? {};

  if (!teamId) throw new ValidatorError('The invitation was not found');
  if (status === InvitationStatuses.ACCEPTED)
    throw new ValidatorError('The invitation was already accepted');

  const now = new Date();
  const isAvailable = now < expiresAt;
  if (!isAvailable) throw new ValidatorError('The invitation has expired');

  return true;
};

export const isMyTeamInvitation = (
  teamInvitation: TeamInvitation | null,
  user: User
) => {
  const isMyInvitation = teamInvitation?.email === user.email;
  if (!isMyInvitation) throw new ValidatorError('The invitation was not found');

  return teamInvitation?.email === user.email;
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
