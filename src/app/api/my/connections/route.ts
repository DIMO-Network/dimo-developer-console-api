import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { getMyConnections } from '@/controllers/connection.controller'; 
import { getCompanyAndTeam } from '@/controllers/user.controller';
import { getPaginationFromParams } from '@/utils/paginateData';
import { isErrorWithMessage } from '@/utils/error.utils';
import { User } from '@/models/user.model';

export const GET = async (request: NextRequest) => {
    try {
        await AuthenticationMiddleware(request);

        const params = Object.fromEntries(request.nextUrl.searchParams.entries());
        const pagingation = getPaginationFromParams(params);

        const loggedUser = request.user?.user as User;
        const userCompleteInfo = await getCompanyAndTeam(loggedUser);
        const companyId = userCompleteInfo?.company?.id ?? '';

        const connections = await getMyConnections(params, pagingation, companyId);
        return Response.json(connections);
    } catch (error: unknown) {
        console.error({
            error,
            step: '[My Connection] Get connection created by the logged user',
        });
        const message = isErrorWithMessage(error) ? error?.message : '';
        return Response.json({ message }, { status: 400});
    }
};