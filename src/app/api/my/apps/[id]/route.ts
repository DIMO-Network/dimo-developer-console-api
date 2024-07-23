import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { findMyApp } from '@/controllers/app.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';

type Params = { params: { id: string } };

export const GET = async (
  request: NextRequest,
  { params: { id: appId } }: Params
) => {
  try {
    await AuthenticationMiddleware(request);

    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const companyId = userCompleteInfo?.company?.id ?? '';

    const app = await findMyApp(appId, companyId);

    return Response.json(app);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Get app created by the logged user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
