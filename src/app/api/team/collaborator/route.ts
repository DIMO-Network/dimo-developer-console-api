import {
  addTeamCollaborator,
  getTeamCollaborators,
} from '@/controllers/teamCollaborator.controller';
import { getPaginationFromParams } from '@/utils/paginateData';

export async function POST(request: Request) {
  const team = await request.json();
  const createdCollaborator = await addTeamCollaborator(team);

  return Response.json(createdCollaborator);
}

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const teams = await getTeamCollaborators(params, pagination);
  return Response.json(teams);
}
