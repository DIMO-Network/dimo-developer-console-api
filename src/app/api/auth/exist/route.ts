import { findUserByEmailOrAddress } from '@/controllers/user.controller';

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const address = searchParams.get('address') ?? null;

  const user = await findUserByEmailOrAddress(address);
  return Response.json({
    exist: !!user,
  });
};
