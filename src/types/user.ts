export interface IUser {
  id?: string;
  name: string;
  email: string;
  auth: string;
  role?: string;
  team?: string;
  refresh_token?: string;
  refresh_token_expiration?: Date;
  created_at?: Date;
  updated_at?: Date;
  deleted?: boolean;
  deleted_at?: Date;
}
