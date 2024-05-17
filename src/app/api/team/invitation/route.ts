import _ from 'lodash';
import { Attributes } from 'sequelize';

import {
  addTeamInvitation,
  getTeamInvitations,
} from '@/controllers/teamInvitation.controller';
import { TeamInvitation } from '@/models/teamInvitation.model';
import { getPaginationFromParams } from '@/utils/paginateData';

export async function POST(request: Request) {
  const teamInvitation = _.pick(await request.json(), [
    'team_id',
    'email',
    'role',
  ]) as Attributes<TeamInvitation>;
  const createdInvitation = await addTeamInvitation(teamInvitation);

  return Response.json(createdInvitation);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const teamInvitations = await getTeamInvitations(params, pagination);
  return Response.json(teamInvitations);
}
