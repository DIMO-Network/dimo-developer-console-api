import _ from 'lodash';
import { Attributes } from 'sequelize';

import { RedirectUri, MODIFIABLE_FIELDS } from '@/models/redirectUri.model';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { createOwnRedirectUri } from '@/controllers/redirectUri.controller';
import { IUserWithCompanyAndTeam } from '@/types/user';

type Params = { params: { id: string } };

export const POST = async (request: NextRequest, { params: { id: appId } }: Params) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = (await getCompanyAndTeam(
      loggedUser,
    )) as IUserWithCompanyAndTeam;

    const redirectUriInput = _.pick(await request.json(), MODIFIABLE_FIELDS) as Partial<
      Attributes<RedirectUri>
    >;

    const createdRedirectUri = await createOwnRedirectUri(
      redirectUriInput,
      appId,
      userCompleteInfo,
    );

    return Response.json(createdRedirectUri);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Create redirect uri',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
