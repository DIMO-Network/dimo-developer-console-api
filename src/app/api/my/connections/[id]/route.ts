import _ from 'lodash';
import { Attributes } from 'sequelize';

import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { findMyConnection, updateMyConnection, deleteMyConnection } from '@/controllers/connection.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';
import { Connection, CONNECTION_MODIFIABLE_FIELDS } from '@/models/connection.model';

type Params = { params: { id: string } };

export const GET = async (request: NextRequest, { params: { id: connectionId } }: Params) => {
    try {
        await AuthenticationMiddleware(request);

        const loggedUser = request.user?.user as User;
        const userCompleteInfo = await getCompanyAndTeam(loggedUser);
        const companyId = userCompleteInfo?.company?.id ?? '';

        const connection = await findMyConnection(connectionId, companyId);

        return Response.json(connection);
    } catch (error: unknown) {
        console.error({
            error, 
            step: '[My Connection] Get connection created by the logged in user',
        });
        const message = isErrorWithMessage(error) ? error?.message: '';
        return Response.json({ message }, { status: 400 });
    }
};

export const PUT = async (request: NextRequest, { params: { id: connectionId } }: Params) => {
    try {
        await AuthenticationMiddleware(request);

        const loggedUser = request.user?.user as User;
        const userCompleteInfo = await getCompanyAndTeam(loggedUser);
        const companyId = userCompleteInfo?.company?.id ?? '';

        const existingConnection = await findMyConnection(connectionId, companyId);
        if (!existingConnection) {
            return Response.json({ message: 'Connection not found' }, { status: 404 });
        }

        const updateData = _.pick(
            await request.json(),
            CONNECTION_MODIFIABLE_FIELDS
        ) as Attributes<Connection>;

        const [affectedCount, updatedConnections] = await updateMyConnection(
            connectionId, 
            companyId, 
            updateData
        );

        if (affectedCount === 0) {
            return Response.json({ message: 'Connection not found' }, { status: 404 });
        }

        return Response.json(updatedConnections[0]);
    } catch (error: unknown) {
        console.error({
            error,
            step: '[My Connection] Update connection',
        });
        const message = isErrorWithMessage(error) ? error?.message : '';
        return Response.json({ message }, { status: 400 });
    }
};

export const DELETE = async (request: NextRequest, { params: { id: connectionId } }: Params) => {
    try {
        await AuthenticationMiddleware(request);

        const loggedUser = request.user?.user as User;
        const userCompleteInfo = await getCompanyAndTeam(loggedUser);
        const companyId = userCompleteInfo?.company?.id ?? '';

        const existingConnection = await findMyConnection(connectionId, companyId);
        if (!existingConnection) {
            return Response.json({ message: 'Connection not found' }, { status: 404 });
        }

        const [affectedCount] = await deleteMyConnection(connectionId, companyId);

        if (affectedCount === 0) {
            return Response.json({ message: 'Connection not found' }, { status: 404 });
        }

        return Response.json({ message: 'Connection deleted successfully' });
    } catch (error: unknown) {
        console.error({
            error,
            step: '[My Connection] Delete connection',
        });
        const message = isErrorWithMessage(error) ? error?.message : '';
        return Response.json({ message }, { status: 400 });
    }
};