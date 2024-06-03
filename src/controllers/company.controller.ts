import { Attributes } from 'sequelize';

import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { Company } from '@/models/company.model';

export const getCompany = async (
  filter: FilterObject,
  pagination: PaginationOptions
) => {
  return Company.findAllPaginated(filter, pagination);
};

export const findCompanyById = async (id: string) => {
  return Company.findOne({ where: { id } });
};

export const createCompany = async (companyData: Attributes<Company>) => {
  return Company.create(companyData);
};

export const updateCompanyById = async (
  id: string,
  companyData: Attributes<Company>
) => {
  return Company.update(companyData, { where: { id } });
};

export const deleteCompanyById = async (id: string) => {
  return Company.update(
    { deleted: false, deleted_at: new Date() },
    { where: { id } }
  );
};

export const findMyCompany = (id: string) => {
  return Company.findOne({ where: { created_by: id } });
};

export const finishUpUserRegistration = async (
  userId: string,
  incomingData: Attributes<Company>
) => {
  const companyData: Attributes<Company> = {
    ...incomingData,
    created_by: userId,
  };

  return createCompany(companyData);
};
