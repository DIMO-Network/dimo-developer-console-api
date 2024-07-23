import _ from 'lodash';
import { Attributes } from 'sequelize';

import { App, MODIFIABLE_FIELDS } from '@/models/app.model';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { createApp } from '@/controllers/app.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { findWorkspaceByIdAndCompany } from '@/services/workspace.service';

type Params = { params: { id: string } };

export const POST = async (
  request: NextRequest,
  { params: { id: workspaceId } }: Params
) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const companyId = userCompleteInfo?.company?.id ?? '';
    const workspace = await findWorkspaceByIdAndCompany(workspaceId, companyId);

    if (!workspace) {
      return Response.json({ message: 'Forbidden' }, { status: 403 });
    }

    const appInput = _.pick(
      await request.json(),
      MODIFIABLE_FIELDS
    ) as Attributes<App>;

    const createdApp = await createApp(appInput, workspaceId, companyId);

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
