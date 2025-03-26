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

export const MODIFIABLE_FIELDS = ['api_key', 'app_id', 'address'];

export class Signer extends Model<
  InferAttributes<Signer>,
  InferCreationAttributes<Signer>
> {
  declare id?: string;
  declare api_key: string;
  declare address: string;
  declare app_id: string;
  declare company_id: string;
  declare deleted?: boolean;
  declare deleted_at?: Date;

  static findAllPaginated(
    findOptions: FilterObject,
    paginationOptions: PaginationOptions,
  ) {
    const filter = transformObjectToSequelize(findOptions, {
      like: [],
      exact: ['company_id', 'app_id', 'api_key'],
    });
    return paginateData(Signer, { where: filter }, paginationOptions);
  }
}

Signer.init(
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
    api_key: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    address: {
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
    modelName: 'Signer',
    tableName: 'signers',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);
