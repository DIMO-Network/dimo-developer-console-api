import type { IUser, IToken } from './base';

import axios, { AxiosInstance } from 'axios';
import _ from 'lodash';

import { AuthService } from './base';

export class GitHubAuthService extends AuthService {
  private apiClient: AxiosInstance;
  private client: AxiosInstance;

  constructor(baseUrl: string) {
    const {
      env: {
        GITHUB_CLIENT_ID: clientId = '',
        GITHUB_CLIENT_SECRET: clientSecret = '',
      },
    } = process;
    super(clientId, clientSecret, baseUrl);

    this.client = axios.create({
      baseURL: 'https://github.com',
      headers: {
        Accept: 'application/json',
      },
    });

    this.apiClient = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getOauthURL() {
    return `https://github.com/login/oauth/authorize?client_id=${this.clientId}`;
  }

  static transformTokenData(token = {}): IToken {
    const today = new Date();
    const expiresIn = _.get(token, 'expires_in', 0);

    today.setSeconds(today.getSeconds() + expiresIn);

    return {
      accessToken: _.get(token, 'access_token', ''),
      refreshToken: _.get(token, 'refresh_token', null),
      expiryDate: _.get(token, 'expiry_date', today.getTime()),
    };
  }

  async processCallback(code: string) {
    const { data } = await this.client.post(
      '/login/oauth/access_token',
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
      },
      {
        headers: {
          'X-OAuth-Scopes': 'user:email',
        },
      }
    );

    this.apiClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${data.access_token}`;

    return GitHubAuthService.transformTokenData(data);
  }

  static transformUserData(user = {}, email: string): IUser {
    return {
      name: _.get(user, 'name', ''),
      email,
      authLogin: _.get(user, 'login', ''),
      avatarUrl: _.get(user, 'avatar_url', ''),
    };
  }

  async getUser() {
    const { data: user } = await this.apiClient.get('/user');
    const email = await this.getEmail();

    return GitHubAuthService.transformUserData(user, email);
  }

  async getEmail() {
    const {
      data: [{ email = '' }],
    } = await this.apiClient.get('/user/emails');

    return email;
  }
}

export default GitHubAuthService;
