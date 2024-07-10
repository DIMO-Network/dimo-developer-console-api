import _ from 'lodash';
import { Attributes } from 'sequelize';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { createLicense, findMyLicense } from '@/controllers/license.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { License, MODIFIABLE_FIELDS } from '@/models/license.model';
import { User } from '@/models/user.model';

export const GET = async (request: NextRequest) => {
  try {
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;
    const userCompleteInfo = await getCompanyAndTeam(loggedUser);
    const license = await findMyLicense(userCompleteInfo.company?.id ?? '');

    return Response.json(license?.dataValues ?? {});
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My License] Get license created by the logged user',
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

    const licenseInput = _.pick(
      await request.json(),
      MODIFIABLE_FIELDS
    ) as Attributes<License>;

    const createdLicense = await createLicense(licenseInput, companyId);

    return Response.json(createdLicense);
  } catch (error: unknown) {
    console.error({
      error,
      step: '[My License] Create license',
    });
    const message = isErrorWithMessage(error) ? error?.message : '';
    return Response.json({ message }, { status: 400 });
  }
};
