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

const GITHUB_AUTH = 'github';
const GOOGLE_AUTH = 'google';
const CREDENTIALS_AUTH = 'credentials';

const DEFAULT_ROLE = 'admin';

export const USER_MODIFIABLE_FIELDS = ['name', 'email', 'avatar_url', 'role'];

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id?: string;
  declare name: string;
  declare email: string;
  declare auth: string;
  declare auth_login: string;
  declare avatar_url?: string | null;
  declare role?: string;
  declare refresh_token?: string;
  declare refresh_token_expiration?: Date;
  declare deleted?: boolean;
  declare deleted_at?: Date;

  static findAllPaginated(
    findOptions: FilterObject,
    paginationOptions: PaginationOptions
  ) {
    const filter = transformObjectToSequelize(findOptions, {
      like: ['name', 'email', 'auth_login'],
      exact: ['role'],
    });
    return paginateData(User, { where: filter }, paginationOptions);
  }
}

User.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isEmail: true,
      },
    },
    auth: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        isIn: [[GITHUB_AUTH, GOOGLE_AUTH, CREDENTIALS_AUTH]],
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: DEFAULT_ROLE,
    },
    auth_login: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notNull: false,
        isUrl: true,
      },
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    refresh_token_expiration: {
      type: DataTypes.DATE,
      allowNull: true,
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
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
