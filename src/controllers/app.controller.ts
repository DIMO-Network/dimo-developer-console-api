import { Attributes } from 'sequelize';

import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { App } from '@/models/app.model';

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

export const findMyApp = (workspaceId: string) => {
  return App.findOne({
    where: { workspace_id: workspaceId },
  });
};
