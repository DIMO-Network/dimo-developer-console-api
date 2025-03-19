import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import DB from '@/services/db';
import { PaginationOptions, paginateData } from '@/utils/paginateData';
import { FilterObject, transformObjectToSequelize } from '@/utils/filter';

export const MODIFIABLE_FIELDS = ['uri', 'app_id', 'status'];

export class RedirectUri extends Model<
  InferAttributes<RedirectUri>,
  InferCreationAttributes<RedirectUri>
> {
  declare id?: string;
  declare uri: string;
  declare app_id: string;
  declare status: boolean;
  declare company_id: string;
  declare deleted?: boolean;
  declare deleted_at?: Date;

  static findAllPaginated(
    findOptions: FilterObject,
    paginationOptions: PaginationOptions,
  ) {
    const filter = transformObjectToSequelize(findOptions, {
      like: ['uri'],
      exact: ['company_id', 'app_id', 'status'],
    });
    return paginateData(RedirectUri, { where: filter }, paginationOptions);
  }
}

RedirectUri.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notNull: true,
      },
      primaryKey: true,
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    app_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: DB.connection as Sequelize,
    modelName: 'RedirectUri',
    tableName: 'redirect_uris',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
