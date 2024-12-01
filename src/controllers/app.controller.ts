import { Attributes } from 'sequelize';

import { App } from '@/models/app.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { RedirectUri } from '@/models/redirectUri.model';
import { Signer } from '@/models/signer.model';
import { Workspace } from '@/models/workspace.model';
import { deleteSigners } from '@/services/signer.service';
import { deleteRedirectUris } from '@/services/redirectUri.service';

export const getApps = async (
  filter: FilterObject,
  pagination: PaginationOptions
) => {
  return App.findAllPaginated(filter, pagination);
};

export const getMyApps = async (
  filter: FilterObject,
  pagination: PaginationOptions,
  companyId: string
) => {
  return App.findAllPaginated({ ...filter, company_id: companyId }, pagination);
};

export const findAppById = async (id: string) => {
  return App.findOne({ where: { id } });
};

export const createApp = async (
  appData: Attributes<App>,
  workspaceId: string,
  companyId: string
) => {
  return App.create({
    ...appData,
    workspace_id: workspaceId,
    company_id: companyId,
  });
};

export const findMyApp = (id: string, companyId: string) => {
  return App.findOne({
    where: { id, company_id: companyId },
    include: [Workspace, RedirectUri, Signer],
  });
};

export const updateApp = async (
  id: string,
  newData: Partial<Attributes<App>>
) => {
  return App.update(newData, { where: { id } });
};

export const updateMyApp = async (
  id: string,
  companyId: string,
  newData: Partial<Attributes<App>>
) => {
  const app = await findMyApp(id, companyId);
  if (app) return updateApp(id, newData);
  else
    throw new Error('User does not have permissions to modify the application');
};

export const deleteOwnApp = async (id: string, companyId: string) => {
  await updateMyApp(id, companyId, {
    deleted: true,
    deleted_at: new Date(),
  });
  await deleteSigners(id, companyId);
  await deleteRedirectUris(id, companyId);
};
