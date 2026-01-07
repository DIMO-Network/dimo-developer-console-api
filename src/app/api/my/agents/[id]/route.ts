import { NextResponse } from 'next/server';
import AuthenticationMiddleware from '@/middlewares/authentication.middleware';
import { User } from '@/models/user.model';

const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    // validate token
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;

    const params : { fleet_mode: boolean; vehicle_ids: string[]; agent_name: string; } = await request.json();

    // save the agent configuration (?)

  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

const PUT = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    // validate token
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;

    const params : { fleet_mode: boolean; vehicle_ids: string[]; agent_name: string; } = await request.json();

    // save the agent configuration (?)

  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

const DELETE = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    // validate token
    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;

    const params : { fleet_mode: boolean; vehicle_ids: string[]; agent_name: string; } = await request.json();

    // save the agent configuration (?)

  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

export { GET, PUT, DELETE };