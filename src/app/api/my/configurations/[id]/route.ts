import { NextResponse } from 'next/server';
import { User } from '@/models/user.model';
import { IConfiguration } from '@/types/user';
import { getConfiguration, updateConfiguration } from '@/services/configuration.service';
import AuthenticationMiddleware from '@/middlewares/authentication.middleware';

const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    // validate token
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;

    if (!loggedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const configuration = await getConfiguration({ configuration_id: params.id  });

    if (!configuration) {
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
    }

    // return
    return NextResponse.json({ configuration }, { status: 200 });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    await AuthenticationMiddleware(request);

    const configuration = await getConfiguration({ configuration_id: params.id  });

    if (!configuration) {
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
    }

    const payload: IConfiguration = await request.json();

    await updateConfiguration({ configuration_id: params.id, configuration_name: payload.configuration_name!, configuration: payload.configuration! });

    return new Response(null, { status: 204 });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

export { GET, PUT };
