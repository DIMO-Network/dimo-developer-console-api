import _ from 'lodash';
import { Attributes } from 'sequelize';

import { RedirectUri, MODIFIABLE_FIELDS } from '@/models/redirectUri.model';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { IUserWithCompanyAndTeam } from '@/types/user';
import {
  deleteOwnRedirectUri,
  updateOwnRedirectUri,
} from '@/controllers/redirectUri.controller';

type Params = { params: { id: string } };

export const PUT = async (
  request: NextRequest,
  { params: { id: redirectUriId } }: Params
) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = (await getCompanyAndTeam(
      loggedUser
    )) as IUserWithCompanyAndTeam;

    const redirectUriInput = _.pick(
      await request.json(),
      MODIFIABLE_FIELDS
    ) as Partial<Attributes<RedirectUri>>;

    const updatedRedirectUri = await updateOwnRedirectUri(
      redirectUriId,
      redirectUriInput,
      userCompleteInfo
    );

    return Response.json(updatedRedirectUri);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Update redirect uri',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params: { id: redirectUriId } }: Params
) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = (await getCompanyAndTeam(
      loggedUser
    )) as IUserWithCompanyAndTeam;

    const deletedRedirectUri = await deleteOwnRedirectUri(
      redirectUriId,
      userCompleteInfo
    );

    return Response.json(deletedRedirectUri);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Delete redirect uri',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
