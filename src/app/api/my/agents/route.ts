import { NextResponse } from 'next/server';

const GET = (request: NextRequest) => {
  try{

  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

const POST = () => {};

const PUT = () => {};

const DELETE = () => {};

export { GET, POST, PUT, DELETE };