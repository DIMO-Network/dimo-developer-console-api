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
import { Company } from './company.model';

export const MODIFIABLE_FIELDS = ['token_id', 'owner', 'client_id'];

export class License extends Model<
  InferAttributes<License>,
  InferCreationAttributes<License>
> {
  declare id?: string;
  declare token_id: string;
  declare owner: string;
  declare client_id: string;
  declare company_id?: string;
  declare deleted?: boolean;
  declare deleted_at?: Date;

  static findAllPaginated(
    findOptions: FilterObject,
    paginationOptions: PaginationOptions
  ) {
    const filter = transformObjectToSequelize(findOptions, {
      like: [],
      exact: ['token_id', 'owner', 'client_id'],
    });
    return paginateData(License, { where: filter }, paginationOptions);
  }
}

License.init(
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
    token_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        notNull: true,
      },
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        notNull: true,
      },
    },
    client_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
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
    modelName: 'License',
    tableName: 'licenses',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

License.belongsTo(Company, { foreignKey: 'company_id' });
