import { Op, WhereOptions } from 'sequelize';
import _ from 'lodash';

export interface FilterObject {
  [key: string]: string;
}

export interface FilterConfig {
  like?: string[];
  exact?: string[];
}

export const transformObject = (
  keys: string[] | undefined,
  filter: FilterObject,
  transformFn: (k: string, v: string) => WhereOptions
) => {
  return keys?.reduce((acc, key) => {
    const value = filter[key];
    if (_.isEmpty(value)) return acc;
    else return transformFn(key, value);
  }, {}) ?? {};
};

export const buildLikeObject = (key: string, value: string | number) => ({
  [key]: { [Op.like]: `%${value}%` },
});

export const buildExactObject = (key: string, value: string | number) => ({
  [key]: value,
});

export const transformObjectToSequelize = (
  filter: FilterObject,
  filterConfig: FilterConfig
): WhereOptions => {
  // Transform the filter object into Sequelize filter criteria
  const sequelizeFilter: WhereOptions = {
    ...transformObject(filterConfig.like, filter, buildLikeObject),
    ...transformObject(filterConfig.exact, filter, buildExactObject),
  };
  return sequelizeFilter;
};
