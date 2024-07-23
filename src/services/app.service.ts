import { Attributes } from 'sequelize';

import { App } from '@/models/app.model';

export const createApp = async (appData: Attributes<App>) => {
  return App.create(appData);
};

export const findAppById = async (id: string) => {
  return App.findOne({ where: { id } });
};

export const findMyApp = async (workspace_id: string) => {
  return App.findOne({ where: { workspace_id: workspace_id } });
};
