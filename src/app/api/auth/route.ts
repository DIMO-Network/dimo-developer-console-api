import { getUsers } from '@/controllers/user.controller';
import { GitHubAuthService, GoogleAuthService } from '@/services/auth';

interface IProps {
  code: string;
  app: string;
  process: 'sign-in' | 'sign-up';
}

export async function POST(request: Request) {
  const { code, app, process } = (await request.json()) as IProps;

  // const ProviderService = {
  //   github: GitHubAuthService,
  //   google: GoogleAuthService,
  // }[app];

  // if (ProviderService) {
  //   const providerService = new ProviderService();
  //   const token = await providerService.processCallback(code);
  //   const user = await providerService.getUser();
  // }

  // return Response.redirect('http://localhost:3000/');
}

export async function GET() {
  const users = await getUsers();
  return Response.json(users);
}
