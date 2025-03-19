import { InvitationStatuses, TeamCollaborator } from '@/models/teamCollaborator.model';
import { User } from '@/models/user.model';
import { Attributes } from 'sequelize';

export const getTeamCollaborator = async (id: string) => {
  return TeamCollaborator.findOne({ where: { user_id: id } });
};

export const findTeamCollaboratorByUserId = async (id: string) => {
  return TeamCollaborator.findOne({ where: { user_id: id } });
};

export const isTeamCollaborator = async (id: string) => {
  return Boolean(await getTeamCollaborator(id));
};

export const addTeamCollaborator = async (
  teamCollaborator: Attributes<TeamCollaborator>,
) => {
  return TeamCollaborator.create(teamCollaborator);
};

export const markAsAccepted = async (id: string, user: User) => {
  return TeamCollaborator.update(
    {
      status: InvitationStatuses.ACCEPTED,
      user_id: user?.id ?? '',
    },
    {
      where: { id: id },
    },
  );
};
