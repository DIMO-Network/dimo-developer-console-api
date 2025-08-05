import _ from 'lodash';
import { Attributes } from 'sequelize';

import { Connection, CONNECTION_MODIFIABLE_FIELDS } from '@/models/connection.model';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { createConnection } from '@/controllers/connection.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { findWorkspaceByIdAndCompany } from '@/services/workspace.service';

type Params = { params: { id: string} };

export const POST = async (
    request: NextRequest, 
    { params: { id: workspaceId } } : Params,
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

        const connectionInput = _.pick(await request.json(), CONNECTION_MODIFIABLE_FIELDS) as Attributes<Connection>;

        const createdConnection = await createConnection(connectionInput, workspaceId, companyId);

        return Response.json(createdConnection);
    } catch (error: unknown) {
        console.error({
            error, 
            step: '[My Connection] Create connection'
        });
        const message = isErrorWithMessage(error) ? error?.message: '';
        return Response.json({ message }, { status: 400 });
    }
};