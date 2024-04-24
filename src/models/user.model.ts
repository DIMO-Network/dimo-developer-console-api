import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import DB from '@/services/db';

const GITHUB_AUTH = 'github';
const GOOGLE_AUTH = 'google';

const DEFAULT_ROLE = 'admin';

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id?: string;
  declare name: string;
  declare email: string;
  declare auth: string;
  declare role?: string;
  declare company_name?: string;
  declare company_website?: string;
  declare company_region?: string;
  declare team?: string;
  declare crm_id?: string;
  declare refresh_token?: string;
  declare refresh_token_expiration?: Date;
  declare deleted?: boolean;
  declare deleted_at?: Date;
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
        isIn: [[GITHUB_AUTH, GOOGLE_AUTH]],
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: DEFAULT_ROLE,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,

      validate: {
        isAlpha: true,
      },
    },
    company_website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    company_region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    team: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    crm_id: {
      type: DataTypes.STRING,
      allowNull: true,
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
