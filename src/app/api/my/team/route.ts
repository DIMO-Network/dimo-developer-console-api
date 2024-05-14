import { findMyTeam } from '@/controllers/teamCollaborator.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { isErrorWithMessage } from '@/utils/error.utils';

export async function GET(request: NextRequest) {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user;
    const team = await findMyTeam(loggedUser?.user?.id ?? '');
    return Response.json(team?.dataValues);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team] Get team created by the logged user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
}
