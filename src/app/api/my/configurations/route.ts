import { NextResponse } from 'next/server';
import { IConfiguration } from '@/types/user';
import { User } from '@/models/user.model';
import { AuthenticationMiddleware } from '@/middlewares/authentication.middleware';
import { checkConfigurationByClientId, saveConfiguration } from '@/services/configuration.service';

const GET = async (request: NextRequest) => {
  try {
    // validate token
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;

    const clientId = request.nextUrl.searchParams.get('clientId');

    if (!loggedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (!clientId) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    const configuration = await checkConfigurationByClientId({ client_id: clientId });

    if (!configuration) {
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
    }

    return NextResponse.json({ id: configuration.id }, { status: 200 });
  }  catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

const POST = async (request: NextRequest) => {
  try {
    // validate token
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;

    if (!loggedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // get payload
    const payload: IConfiguration = await request.json();

    // save configurations
    const configuration = await saveConfiguration({
      owner_id: loggedUser.id!,
      client_id: payload.client_id!,
      configuration_name: payload.configuration_name!,
      configuration: payload.configuration!,
    });

    // return
    return NextResponse.json({ id: configuration.id }, { status: 201 });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

export { GET, POST };
