import { RedirectUri } from '@/models/redirectUri.model';
import { Attributes } from 'sequelize';

export const createRedirectUri = async (
  uri: string,
  appId: string,
  companyId: string
) => {
  return RedirectUri.create({
    uri,
    company_id: companyId,
    app_id: appId,
    status: true,
  });
};

export const updateRedirectUri = async (
  id: string,
  newData: Partial<Attributes<RedirectUri>>
) => {
  return RedirectUri.update(newData, { where: { id } });
};

export const updateMyRedirectUri = async (
  id: string,
  companyId: string,
  newData: Partial<Attributes<RedirectUri>>
) => {
  const redirectUri = await findMyRedirectUriById(id, companyId);
  if (redirectUri) return updateRedirectUri(id, newData);
  else
    throw new Error(
      'User does not have permissions to modify the redirect URI'
    );
};

export const deleteRedirectUris = async (appId: string, companyId: string) => {
  return RedirectUri.update(
    {
      status: false,
      deleted: true,
      deleted_at: new Date(),
    },
    { where: { app_id: appId, company_id: companyId } }
  );
};

export const findMyRedirectUriById = async (id: string, companyId: string) => {
  return RedirectUri.findOne({
    where: { company_id: companyId, id },
  });
};
