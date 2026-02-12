import { ICompany } from './company';
import { ITeam } from './team';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  auth: string;
  role?: string;
  team?: string | ITeam;
  refresh_token?: string;
  refresh_token_expiration?: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted?: boolean;
  deleted_at?: Date;
}

export interface IUserWithCompanyAndTeam extends IUser {
  company: ICompany;
}

export interface IConfiguration {
  client_id?: string;
  configuration_name?: string;
  configuration: Record<string, unknown>;
}
