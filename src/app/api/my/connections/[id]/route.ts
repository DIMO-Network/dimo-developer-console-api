import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { findMyConnection } from '@/controllers/connection.controller';
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';

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
            step: '[My Connection] Get connection created byu the logged in user',
        });
        const message = isErrorWithMessage(error) ? error?.message: '';
        return Response.json({ message }, { status: 400 });
    }
};