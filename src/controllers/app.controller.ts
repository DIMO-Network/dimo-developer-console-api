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
  workspaceId: string
) => {
  return App.findAllPaginated(
    { ...filter, workspace_id: workspaceId },
    pagination
  );
};

export const findAppById = async (id: string) => {
  return App.findOne({ where: { id } });
};

export const createApp = async (
  appData: Attributes<App>,
  workspaceId: string
) => {
  return App.create({ ...appData, workspace_id: workspaceId });
};

export const findMyApp = (workspaceId: string) => {
  return App.findOne({ where: { workspace_id: workspaceId } });
};
