import { Model, FindOptions, ModelStatic } from 'sequelize';

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export const getPaginationFromParams = (params: {
  [k: string]: string;
}): PaginationOptions => {
  const page = Number(params?.page || 1);
  const pageSize = Number(params?.pageSize || 10);
  return { page, pageSize };
};

export async function paginateData<T extends Model>(
  model: ModelStatic<T>,
  options: FindOptions,
  paginationOptions: PaginationOptions
): Promise<{ data: T[]; totalItems: number; totalPages: number }> {
  const { page, pageSize } = paginationOptions;

  // Calculate offset based on page and page size
  const offset = (page - 1) * pageSize;

  // Find total count of items without pagination
  const totalCount = await model.count({ where: options.where });

  // Find data with pagination
  const data = await model.findAll({
    ...options,
    limit: pageSize,
    offset,
  });

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data,
    totalItems: totalCount,
    totalPages,
  };
}
