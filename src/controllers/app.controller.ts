import { Attributes } from 'sequelize';

import { App } from '@/models/app.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { RedirectUri } from '@/models/redirectUri.model';
import { Signer } from '@/models/signer.model';
import { Workspace } from '@/models/workspace.model';

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
