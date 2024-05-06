import {} from '@/controllers/auth.controller';
import { findMyTeam } from '@/controllers/team.controller';
import { isErrorWithMessage } from '@/utils/error.utils';

export async function GET(request: NextRequest) {
  const loggedUser = request.user;
  try {
    const team = await findMyTeam(loggedUser?.user?.id ?? '');
    return Response.json(team?.dataValues);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team] Get team created by the logged user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json(
      {
        message: message,
      },
      { status: 400 }
    );
  }
}