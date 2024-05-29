import { Attributes } from 'sequelize';

import { Company } from '@/models/company.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';

export const createCompany = async (
  userId: string,
  companyData: Attributes<Company>
) => {
  return Company.create({ ...companyData, created_by: userId });
};

export const findCompanyById = async (id: string) => {
  return Company.findOne({ where: { id } });
};

export const findMyCompany = async (userId: string) => {
  return Company.findOne({ where: { created_by: userId } });
};

export const updateCompanyById = async (
  id: string,
  companyData: Attributes<Company>
) => {
  return Company.update(companyData, { where: { id } });
};

export const updateMyCompany = async (
  userId: string,
  companyData: Attributes<Company>
) => {
  return Company.update(companyData, { where: { created_by: userId } });
};

export const deleteCompanyById = async (id: string) => {
  return Company.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
};

export const deleteMyCompany = async (userId: string) => {
  return Company.update(
    { deleted: false, deleted_at: new Date() },
    { where: { created_by: userId } }
  );
};

export function getCompanies(
  filter: FilterObject,
  pagination: PaginationOptions
) {
  return Company.findAllPaginated(filter, pagination);
}
