import _ from 'lodash';
import { Attributes } from 'sequelize';

import { App, MODIFIABLE_FIELDS } from '@/models/app.model';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { createApp, getMyApps } from '@/controllers/app.controller';
import { findMyWorkspace } from '@/controllers/workspace.controller';
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
    const workspace = await findMyWorkspace(
      userCompleteInfo?.company?.id ?? ''
    );

    if (!workspace)
      return Response.json({ data: [], totalItems: 0, totalPages: 0 });

    const apps = await getMyApps(params, pagination, workspace?.id ?? '');

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

export const POST = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const companyId = userCompleteInfo.company?.id ?? '';

    const appInput = _.pick(
      await request.json(),
      MODIFIABLE_FIELDS
    ) as Attributes<App>;

    const createdApp = await createApp(appInput, companyId);

    return Response.json(createdApp);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Create app',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
