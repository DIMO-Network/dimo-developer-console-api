import _ from 'lodash';
import { Attributes } from 'sequelize';

import { Signer, MODIFIABLE_FIELDS } from '@/models/signer.model';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { createOwnSigner } from '@/controllers/signer.controller';
import { IUserWithCompanyAndTeam } from '@/types/user';

type Params = { params: { id: string } };

export const POST = async (request: NextRequest, { params: { id: appId } }: Params) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = (await getCompanyAndTeam(
      loggedUser,
    )) as IUserWithCompanyAndTeam;

    const signerInput = _.pick(await request.json(), MODIFIABLE_FIELDS) as Partial<
      Attributes<Signer>
    >;

    const createdSigner = await createOwnSigner(signerInput, appId, userCompleteInfo);

    return Response.json(createdSigner);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My App] Create signer',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
