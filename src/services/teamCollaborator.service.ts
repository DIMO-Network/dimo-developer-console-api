import { TeamCollaborator } from '@/models/teamCollaborator.model';
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
  teamCollaborator: Attributes<TeamCollaborator>
) => {
  return TeamCollaborator.create(teamCollaborator);
};
