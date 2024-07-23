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
import { Workspace } from '@/models/workspace.model';
import { RedirectUri } from '@/models/redirectUri.model';
import { Signer } from '@/models/signer.model';

export const MODIFIABLE_FIELDS = ['name', 'scope', 'workspace_id'];

export class App extends Model<
  InferAttributes<App>,
  InferCreationAttributes<App>
> {
  declare id?: string;
  declare name: string;
  declare scope: string;
  declare workspace_id: string;
  declare company_id: string;
  declare deleted?: boolean;
  declare deleted_at?: Date;

  static findAllPaginated(
    findOptions: FilterObject,
    paginationOptions: PaginationOptions
  ) {
    const filter = transformObjectToSequelize(findOptions, {
      like: ['name', 'scope'],
      exact: ['workspace_id', 'company_id'],
    });
    return paginateData(App, { where: filter }, paginationOptions, [Workspace]);
  }
}

App.init(
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
    scope: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    workspace_id: {
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
    modelName: 'App',
    tableName: 'apps',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

App.belongsTo(Workspace, { foreignKey: 'workspace_id' });
App.hasMany(RedirectUri, { foreignKey: 'app_id' });
App.hasMany(Signer, { foreignKey: 'app_id' });
