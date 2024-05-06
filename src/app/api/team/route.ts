import { createTeam, getTeams } from '@/controllers/team.controller';

export async function POST(request: Request) {
  const team = await request.json();
  const createdTeam = await createTeam(team);

  return Response.json(createdTeam);
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const page = Number(params.get('page') || 1);
  const pageSize = Number(params.get('pageSize') || 10);
  const teams = await getTeams({ page, pageSize });
  return Response.json(teams);
}
