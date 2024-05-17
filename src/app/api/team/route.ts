import _ from 'lodash';
import { Attributes } from 'sequelize';

import { createTeam, getTeams } from '@/controllers/team.controller';
import { getPaginationFromParams } from '@/utils/paginateData';
import { Team } from '@/models/team.model';

export async function POST(request: Request) {
  const teamData = _.pick(await request.json(), [
    'name',
    'created_by',
  ]) as Attributes<Team>;
  const createdTeam = await createTeam(teamData);

  return Response.json(createdTeam);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const teams = await getTeams(params, pagination);
  return Response.json(teams);
}
