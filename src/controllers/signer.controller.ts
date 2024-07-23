import { Attributes } from 'sequelize';

import { Signer } from '@/models/signer.model';
import {
  createSigner,
  deleteSigner,
} from '@/services/signer.service';
import { IUserWithCompanyAndTeam } from '@/types/user';

export const createOwnSigner = async (
  { api_key: apiKey = '' }: Partial<Attributes<Signer>>,
  appId: string,
  user: IUserWithCompanyAndTeam
) => {
  const companyId = user?.company?.id ?? '';
  return createSigner(apiKey, appId, companyId);
};

export const deleteOwnSigner = async (
  id: string,
  user: IUserWithCompanyAndTeam
) => {
  const companyId = user?.company?.id ?? '';
  return deleteSigner(id, companyId);
};
