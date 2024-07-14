import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getMyApps } from '@/controllers/app.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { getPaginationFromParams } from '@/utils/paginateData';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';

export const GET = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);

    const params = Object.fromEntries(request.nextUrl.searchParams.entries());
    const pagination = getPaginationFromParams(params);

    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const companyId = userCompleteInfo?.company?.id ?? '';

    const apps = await getMyApps(params, pagination, companyId);

    return Response.json(apps);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Get app created by the logged user',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
