import { Attributes } from 'sequelize';

import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { Workspace } from '@/models/workspace.model';

export const getWorkspace = async (
  filter: FilterObject,
  pagination: PaginationOptions
) => {
  return Workspace.findAllPaginated(filter, pagination);
};

export const findWorkspaceById = async (id: string) => {
  return Workspace.findOne({ where: { id } });
};

export const createWorkspace = async (
  workspaceData: Attributes<Workspace>,
  companyId: string
) => {
  // One Developer Workspace per user from the developer console
  const workspace = await findMyWorkspace(companyId);
  if (workspace) return workspace;

  return Workspace.create({ ...workspaceData, company_id: companyId });
};

export const findMyWorkspace = (companyId: string) => {
  return Workspace.findOne({ where: { company_id: companyId } });
};
