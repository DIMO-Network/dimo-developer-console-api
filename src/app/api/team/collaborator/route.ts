import _ from 'lodash';
import { Attributes } from 'sequelize';

import {
  addTeamCollaborator,
  getTeamCollaborators,
} from '@/controllers/teamCollaborator.controller';
import { TeamCollaborator } from '@/models/teamCollaborator.model';
import { getPaginationFromParams } from '@/utils/paginateData';

export async function POST(request: Request) {
  const teamCollaboratorData = _.pick(await request.json(), [
    'team_id',
    'user_id',
    'role',
  ]) as Attributes<TeamCollaborator>;
  const createdCollaborator = await addTeamCollaborator(teamCollaboratorData);

  return Response.json(createdCollaborator);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const teams = await getTeamCollaborators(params, pagination);
  return Response.json(teams);
}
