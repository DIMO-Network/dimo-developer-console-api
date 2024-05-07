import { Op, WhereOptions } from 'sequelize';

export interface FilterObject {
  [key: string]: string | number;
}

export interface FilterConfig {
  like?: string[];
  exact?: string[];
}

export const transformObjectToSequelize = (
  filter: FilterObject,
  filterConfig: FilterConfig
): WhereOptions => {
  // Transform the filter object into Sequelize filter criteria
  const sequelizeFilter: WhereOptions = {};
  for (const key in filter) {
    if (filterConfig.like && filterConfig.like.includes(key)) {
      sequelizeFilter[key] = { [Op.like]: `%${filter[key]}%` };
    } else if (filterConfig.exact && filterConfig.exact.includes(key)) {
      sequelizeFilter[key] = filter[key];
    }
  }
  return sequelizeFilter;
};
