import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { IUserWithCompanyAndTeam } from '@/types/user';
import { deleteOwnSigner } from '@/controllers/signer.controller';

type Params = { params: { id: string } };

export const DELETE = async (
  request: NextRequest,
  { params: { id: signerId } }: Params
) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = (await getCompanyAndTeam(
      loggedUser
    )) as IUserWithCompanyAndTeam;

    const deletedSigner = await deleteOwnSigner(signerId, userCompleteInfo);

    return Response.json(deletedSigner);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Delete signer',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
