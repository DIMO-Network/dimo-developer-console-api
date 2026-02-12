import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import DB from '@/services/db';
import { User } from '@/models/user.model';

export class Configuration extends Model<
  InferAttributes<Configuration>,
  InferCreationAttributes<Configuration>
> {
  declare id?: string;
  declare owner_id: string;
  declare client_id: string;
  declare configuration_name: string;
  declare configuration: Record<string, unknown>;
}

Configuration.init(
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
    client_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    configuration_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    configuration: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
  },
  {
    sequelize: DB.connection as Sequelize,
    modelName: 'Configuration',
    tableName: 'configurations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Configuration.belongsTo(User, { foreignKey: 'owner_id' });
