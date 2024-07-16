import { Attributes } from 'sequelize';

import { Workspace } from '@/models/workspace.model';

export const createWorkspace = async (workspaceData: Attributes<Workspace>) => {
  return Workspace.create(workspaceData);
};

export const findWorkspaceById = async (id: string) => {
  return Workspace.findOne({ where: { id } });
};

export const findWorkspaceByIdAndCompany = async (
  id: string,
  companyId: string
) => {
  return Workspace.findOne({ where: { id, company_id: companyId } });
};

export const findMyWorkspace = async (companyId: string) => {
  return Workspace.findOne({ where: { company_id: companyId } });
};
