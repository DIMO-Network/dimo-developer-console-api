import { GoogleAuthService } from './google';
import { GitHubAuthService } from './github';

class OAuthError extends Error {}

const handleError = (err: unknown) => {
  console.error(err);
  throw new OAuthError('Something went wrong');
};

export const processOAuth = async (code: string, app: string) => {
  const ProviderService = {
    github: GitHubAuthService,
    google: GoogleAuthService,
  }[app];

  if (ProviderService) {
    const providerService = new ProviderService();
    const token = await providerService
      .processCallback(code)
      .catch(handleError);
    const user = await providerService.getUser();

    return { token, user };
  }

  throw new OAuthError('The provider is not supported');
};

export * from './google';
export * from './github';

export default {
  processOAuth,
};
