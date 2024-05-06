import {
  deleteTeamById,
  findTeamById,
  updateTeamById,
} from '@/controllers/team.controller';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params: { id } }: Params) {
  const team = await findTeamById(id);
  return Response.json(team);
}

export async function PUT(request: Request, { params: { id } }: Params) {
  const user = await request.json();
  const updatedTeam = await updateTeamById(id, user);

  return Response.json(updatedTeam);
}

export async function DELETE(_request: Request, { params: { id } }: Params) {
  const deletedTeam = await deleteTeamById(id);

  return Response.json(deletedTeam);
}
