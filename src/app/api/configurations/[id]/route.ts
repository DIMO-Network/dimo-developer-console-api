import { NextResponse } from 'next/server';
import { getConfiguration } from '@/services/configuration.service';

const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const configuration = await getConfiguration({ configuration_id: params.id  });

    if (!configuration) {
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
    }

    return NextResponse.json({ configuration }, { status: 200 });
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Error processing receipt' }, { status: 500 });
  }
};

export { GET };