import { getTeamCollaborators } from '@/controllers/teamCollaborator.controller';
import { getPaginationFromParams } from '@/utils/paginateData';

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams.entries());
  const pagination = getPaginationFromParams(params);

  const teams = await getTeamCollaborators(params, pagination);
  return Response.json(teams);
}
