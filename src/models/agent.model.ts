import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import DB from '@/services/db';
import { User } from '@/models/user.model';

export class Agent extends Model<
  InferAttributes<Agent>,
  InferCreationAttributes<Agent>
> {
  declare id?: string;
  declare owner_id: string;
  declare agent_name: string;
  declare fleet_mode: boolean;
  declare vehicle_ids: string[];
}

Agent.init(
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
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    agent_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    fleet_mode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true,
      },
    },
    vehicle_ids: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      validate: {
        notNull: false,
      },
    },
  },
  {
    sequelize: DB.connection as Sequelize,
    modelName: 'Agent',
    tableName: 'Agents',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

Agent.belongsTo(User, { foreignKey: 'owner_id' });
