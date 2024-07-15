import { Attributes } from 'sequelize';

import { RedirectUri } from '@/models/redirectUri.model';
import {
  createRedirectUri,
  updateMyRedirectUri,
  deleteRedirectUri,
} from '@/services/redirectUri.service';
import { IUserWithCompanyAndTeam } from '@/types/user';

export const createOwnRedirectUri = async (
  { uri = '' }: Partial<Attributes<RedirectUri>>,
  appId: string,
  user: IUserWithCompanyAndTeam
) => {
  const companyId = user?.company?.id ?? '';
  return createRedirectUri(uri, appId, companyId);
};

export const updateOwnRedirectUri = async (
  id: string,
  newData: Partial<Attributes<RedirectUri>>,
  user: IUserWithCompanyAndTeam
) => {
  const companyId = user?.company?.id ?? '';
  return updateMyRedirectUri(id, companyId, newData);
};

export const deleteOwnRedirectUri = async (
  id: string,
  user: IUserWithCompanyAndTeam
) => {
  const companyId = user?.company?.id ?? '';
  return deleteRedirectUri(id, companyId);
};
