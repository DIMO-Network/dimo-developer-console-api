import { getCompanyAndTeam } from '@/controllers/user.controller';
import { getPaginationFromParams } from '@/utils/paginateData';
import { getMyTeamCollaborators } from '@/controllers/teamCollaborator.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import AuthenticationMiddleware from '@/middlewares/authentication.middleware';

export const GET = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const pagination = getPaginationFromParams(params);

    const user = request.user?.user as User;

    const userComplete = await getCompanyAndTeam(user);
    const invitations = await getMyTeamCollaborators(
      userComplete.team?.id ?? '',
      params,
      pagination
    );

    return Response.json(invitations);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team Collaborators] Get team collaborators by the logged user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
