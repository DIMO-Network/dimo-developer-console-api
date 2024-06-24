import { findUserByEmailOrAddress } from '@/controllers/user.controller';

export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl;
  const item = searchParams.get('item') ?? null;
  const provider = searchParams.get('provider') ?? null;

  const user = await findUserByEmailOrAddress(item, provider);
  return Response.json({
    existItem: !!user,
    existAssociation: user?.auth === provider,
  });
};
