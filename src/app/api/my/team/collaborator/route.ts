import { getTeamCollaborators } from '@/controllers/teamCollaborator.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { isErrorWithMessage } from '@/utils/error.utils';
import { getPaginationFromParams } from '@/utils/paginateData';

export const GET = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const pagination = getPaginationFromParams(params);

    const invitations = await getTeamCollaborators(params, pagination);

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
