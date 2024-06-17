/* eslint-disable @typescript-eslint/no-unused-vars */
import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    userId: string;
    name: string;
    email: string;
    provider: string;
  }
}
