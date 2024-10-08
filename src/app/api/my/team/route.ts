import { findMyTeam } from '@/controllers/teamCollaborator.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { User } from '@/models/user.model';
import { isErrorWithMessage } from '@/utils/error.utils';

export async function GET(request: NextRequest) {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const team = await findMyTeam(loggedUser?.id ?? '');
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
