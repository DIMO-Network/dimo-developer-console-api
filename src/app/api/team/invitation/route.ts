import {
  addTeamInvitation,
  getTeamInvitations,
} from '@/controllers/teamInvitation.controller';
import { getPaginationFromParams } from '@/utils/paginateData';

export async function POST(request: Request) {
  const team = await request.json();
  const createdCollaborator = await addTeamInvitation(team);

  return Response.json(createdCollaborator);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const teams = await getTeamInvitations(params, pagination);
  return Response.json(teams);
}
