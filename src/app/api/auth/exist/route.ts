import { findUserByEmailOrAddress } from '@/controllers/user.controller';

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const item = searchParams.get('item') ?? null;

  const user = await findUserByEmailOrAddress(item);
  return Response.json({
    existItem: !!user,
  });
};
