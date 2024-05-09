import {
  deleteTeamCollaboratorById,
  findTeamCollaboratorById,
  updateTeamCollaboratorById,
} from '@/controllers/teamCollaborator.controller';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params: { id } }: Params) {
  const team = await findTeamCollaboratorById(id);
  return Response.json(team);
}

export async function PUT(request: Request, { params: { id } }: Params) {
  const user = await request.json();
  const updatedTeam = await updateTeamCollaboratorById(id, user);

  return Response.json(updatedTeam);
}

export async function DELETE(_request: Request, { params: { id } }: Params) {
  const deletedTeam = await deleteTeamCollaboratorById(id);

  return Response.json(deletedTeam);
}
