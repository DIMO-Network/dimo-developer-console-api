import _ from 'lodash';
import { Attributes } from 'sequelize';

import {
  deleteTeamCollaboratorById,
  findTeamCollaboratorById,
  updateTeamCollaboratorById,
} from '@/controllers/teamCollaborator.controller';
import { TeamCollaborator } from '@/models/teamCollaborator.model';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params: { id } }: Params) {
  const team = await findTeamCollaboratorById(id);
  return Response.json(team);
}

export async function PUT(request: Request, { params: { id } }: Params) {
  const teamCollaboratorData = _.pick(await request.json(), [
    'team_id',
    'user_id',
    'role',
  ]) as Attributes<TeamCollaborator>;
  const updatedTeam = await updateTeamCollaboratorById(id, teamCollaboratorData);

  return Response.json(updatedTeam);
}

export async function DELETE(_request: Request, { params: { id } }: Params) {
  const deletedTeam = await deleteTeamCollaboratorById(id);

  return Response.json(deletedTeam);
}
