import _ from 'lodash';
import { Attributes } from 'sequelize';

import {
  deleteTeamById,
  findTeamById,
  updateTeamById,
} from '@/controllers/team.controller';
import { Team } from '@/models/team.model';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params: { id } }: Params) {
  const team = await findTeamById(id);
  return Response.json(team);
}

export async function PUT(request: Request, { params: { id } }: Params) {
  const teamData = _.pick(await request.json(), ['name']) as Attributes<Team>;
  const updatedTeam = await updateTeamById(id, teamData);

  return Response.json(updatedTeam);
}

export async function DELETE(_request: Request, { params: { id } }: Params) {
  const deletedTeam = await deleteTeamById(id);

  return Response.json(deletedTeam);
}
