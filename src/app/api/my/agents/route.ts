import { NextResponse } from 'next/server';
import AuthenticationMiddleware from '@/middlewares/authentication.middleware';
import { User } from '@/models/user.model';

const GET = async (request: NextRequest) => {
  try {

    await AuthenticationMiddleware(request);
    const loggedUser = request.user?.user as User;

    // read all agents based on owner_id

  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

const POST = async (request: NextRequest) => {
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

export { GET, POST };