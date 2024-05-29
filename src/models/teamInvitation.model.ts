import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import DB from '@/services/db';
import { PaginationOptions, paginateData } from '@/utils/paginateData';
import { FilterObject } from '@/utils/filter';
import { TeamRoles } from './teamCollaborator.model';

export enum InvitationStatuses {
  PENDING = 'PENDING',
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
}

export class TeamInvitation extends Model<
  InferAttributes<TeamInvitation>,
  InferCreationAttributes<TeamInvitation>
> {
  declare id?: string;
  declare team_id: string;
  declare email: string;
  declare role: string;
  declare expires_at: Date;
  declare status: string;
  declare deleted?: boolean;
  declare deleted_at?: Date;

  static findAllPaginated(
    findOptions: FilterObject,
    paginationOptions: PaginationOptions
  ) {
    return paginateData(TeamInvitation, findOptions, paginationOptions);
  }
}

TeamInvitation.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        isEmail: true,
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
    status: {
      type: DataTypes.STRING,
      defaultValue: InvitationStatuses.PENDING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    expires_at: {
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
    modelName: 'TeamInvitation',
    tableName: 'team_invitations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);
