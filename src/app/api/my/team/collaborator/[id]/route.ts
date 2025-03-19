import { removeMyCollaboratorById } from '@/controllers/teamCollaborator.controller';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { User } from '@/models/user.model';
import { isErrorWithMessage } from '@/utils/error.utils';

type Params = { params: { id: string } };

export const DELETE = async (request: NextRequest, { params: { id } }: Params) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    await removeMyCollaboratorById(loggedUser, id);

    return Response.json(
      { message: 'The collaborator has been removed' },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Team Collaborators] Remove team collaborator by the owner user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
