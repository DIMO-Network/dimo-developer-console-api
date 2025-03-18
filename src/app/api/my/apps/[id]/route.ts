import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import {
  deleteOwnApp,
  findMyApp,
  updateMyApp,
} from '@/controllers/app.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { updateWorkspace } from '@/controllers/workspace.controller';

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

export const DELETE = async (
  request: NextRequest,
  { params: { id: appId } }: Params
) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const companyId = userCompleteInfo?.company?.id ?? '';

    await deleteOwnApp(appId, companyId);

    return Response.json({});
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Delete app',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params: { id: appId } }: Params
) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const companyId = userCompleteInfo?.company?.id ?? '';

    const newData = await request.json();
    const app = await findMyApp(appId, companyId);
    await updateMyApp(appId, companyId, newData);

    if (newData.Workspace?.name) {
      await updateWorkspace(app!.workspace_id, {
        name: newData.Workspace.name,
      });
    }

    return Response.json({});
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Update app',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
