import {
  deleteTeamInvitationById,
  findTeamInvitationById,
} from '@/controllers/teamInvitation.controller';

type Params = { params: { id: string } };

export async function GET(_request: Request, { params: { id } }: Params) {
  const team = await findTeamInvitationById(id);
  return Response.json(team);
}

export async function DELETE(_request: Request, { params: { id } }: Params) {
  const deletedTeam = await deleteTeamInvitationById(id);

  return Response.json(deletedTeam);
}
