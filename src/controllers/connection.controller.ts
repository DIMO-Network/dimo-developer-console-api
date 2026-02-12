import { Attributes } from 'sequelize';

import { Connection } from '@/models/connection.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';

export const getConnections = async (
  filter: FilterObject,
  pagination: PaginationOptions,
) => {
  return Connection.findAllPaginated(filter, pagination);
};

export const getMyConnections = async (
  filter: FilterObject,
  pagination: PaginationOptions,
  companyId: string,
) => {
  return Connection.findAllPaginated({ ...filter, company_id: companyId }, pagination);
};

export const findConnectionById = async (id: string) => {
  return Connection.findOne({ where: { id } });
};

export const createConnection = async (
  connectionData: Attributes<Connection>,
  companyId: string,
) => {
  return Connection.create({
    ...connectionData,
    company_id: companyId,
  });
};

export const findMyConnection = (id: string, companyId: string) => {
  return Connection.findOne({
    where: { id, company_id: companyId },
  });
};

export const updateMyConnection = async (
  id: string,
  companyId: string,
  updateData: Attributes<Connection>,
) => {
  return Connection.update(updateData, {
    where: { id, company_id: companyId },
    returning: true,
  });
};

export const deleteMyConnection = async (id: string, companyId: string) => {
  return Connection.update(
    { deleted: true, deleted_at: new Date() },
    { where: { id, company_id: companyId } },
  );
};
