import { TeamCollaborator } from '@/models/teamCollaborator.model';

export const getTeamCollaborator = async (id: string) => {
  return TeamCollaborator.findOne({ where: { user_id: id } });
};

export const isTeamCollaborator = async (id: string) => {
  return Boolean(await getTeamCollaborator(id));
};
