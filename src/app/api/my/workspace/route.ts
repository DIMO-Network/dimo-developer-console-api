import _ from 'lodash';
import { Attributes } from 'sequelize';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { createWorkspace, findMyWorkspace } from '@/controllers/workspace.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { Workspace, MODIFIABLE_FIELDS } from '@/models/workspace.model';
import { User } from '@/models/user.model';

export const GET = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const workspace = await findMyWorkspace(userCompleteInfo.company?.id ?? '');

    return Response.json(workspace?.dataValues ?? {});
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Workspace] Get workspace created by the logged user',
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

    const workspaceInput = _.pick(
      await request.json(),
      MODIFIABLE_FIELDS
    ) as Attributes<Workspace>;

    const createdWorkspace = await createWorkspace(workspaceInput, companyId);

    return Response.json(createdWorkspace);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My Workspace] Create workspace',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
