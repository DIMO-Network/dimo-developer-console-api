import { Attributes } from 'sequelize';

import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { License } from '@/models/license.model';

export const getLicense = async (
  filter: FilterObject,
  pagination: PaginationOptions
) => {
  return License.findAllPaginated(filter, pagination);
};

export const findLicenseById = async (id: string) => {
  return License.findOne({ where: { id } });
};

export const createLicense = async (
  licenseData: Attributes<License>,
  companyId: string
) => {
  // One Developer License per user from the developer console
  const license = await findMyLicense(companyId);
  if (license) return license;

  return License.create({ ...licenseData, company_id: companyId });
};

export const findMyLicense = (companyId: string) => {
  return License.findOne({ where: { company_id: companyId } });
};
