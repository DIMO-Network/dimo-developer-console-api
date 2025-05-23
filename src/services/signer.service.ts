import { Signer } from '@/models/signer.model';
import { Attributes } from 'sequelize';

export const createSigner = async (
  apiKey: string,
  address: string,
  appId: string,
  companyId: string,
) => {
  return Signer.create({
    api_key: apiKey,
    address,
    company_id: companyId,
    app_id: appId,
  });
};

export const updateSigner = async (id: string, newData: Partial<Attributes<Signer>>) => {
  return Signer.update(newData, { where: { id } });
};

export const updateMySigner = async (
  id: string,
  companyId: string,
  newData: Partial<Attributes<Signer>>,
) => {
  const signer = await findMySignerById(id, companyId);
  if (signer) return updateSigner(id, newData);
  else throw new Error('User does not have permissions to modify the redirect URI');
};

export const deleteSigners = async (appId: string, companyId: string) => {
  return Signer.update(
    {
      deleted: true,
      deleted_at: new Date(),
    },
    { where: { app_id: appId, company_id: companyId } },
  );
};

export const findMySignerById = async (id: string, companyId: string) => {
  return Signer.findOne({
    where: { company_id: companyId, id },
  });
};
