import { Attributes } from 'sequelize';

import { License } from '@/models/license.model';

export const createLicense = async (licenseData: Attributes<License>) => {
  return License.create(licenseData);
};

export const findLicenseById = async (id: string) => {
  return License.findOne({ where: { id } });
};

export const findMyLicense = async (companyId: string) => {
  return License.findOne({ where: { company_id: companyId } });
};
