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
import { User } from './user.model';
import { Team } from './team.model';

export enum TeamRoles {
  OWNER = 'OWNER',
  COLLABORATOR = 'COLLABORATOR',
}

export class TeamCollaborator extends Model<
  InferAttributes<TeamCollaborator>,
  InferCreationAttributes<TeamCollaborator>
> {
  declare id?: string;
  declare team_id: string;
  declare user_id: string;
  declare role: string;
  declare deleted?: boolean;
  declare deleted_at?: Date;

  static findAllPaginated(
    findOptions: FilterObject,
    paginationOptions: PaginationOptions
  ) {
    const filter = transformObjectToSequelize(findOptions, {
      like: ['role'],
      exact: ['team_id', 'user_id', 'id'],
    });

    return paginateData(
      TeamCollaborator,
      { where: filter },
      paginationOptions,
      [User, Team]
    );
  }
}

TeamCollaborator.init(
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
    team_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isIn: [[TeamRoles.OWNER, TeamRoles.COLLABORATOR]],
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
    modelName: 'TeamCollaborator',
    tableName: 'team_collaborators',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

TeamCollaborator.belongsTo(User, { foreignKey: 'user_id' });
TeamCollaborator.belongsTo(Team, { foreignKey: 'team_id' });
