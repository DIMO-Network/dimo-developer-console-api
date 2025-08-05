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


export const CONNECTION_MODIFIABLE_FIELDS = ['name'];

export class Connection extends Model<InferAttributes<Connection>, InferCreationAttributes<Connection>> {
    declare id?: string;
    declare name: string;
    declare workspace_id: string;
    declare company_id: string;
    declare connection_license_public_key: string;
    declare connection_license_private_key: string;
    declare device_issuance_key: string;
    declare deleted?: boolean;
    declare deleted_at?: Date;

    static findAllPaginated(
        findOptions: FilterObject,
        paginationOptions: PaginationOptions,
      ) {
        const filter = transformObjectToSequelize(findOptions, {
          like: ['name'],
          exact: ['workspace_id', 'company_id'],
        });
        return paginateData(Connection, { where: filter }, paginationOptions);
      }
}

Connection.init(
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
        workspace_id: {
            type: DataTypes.UUID,
            allowNull: false, 
            validate: {
                notEmpty: true,
                notNull: true,
            },
        },
        comapny_id: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true, 
            }
        },
        connection_license_public_key: '',
        connection_license_private_key: '',
        device_issuance_key: '',
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
        modelName: 'Connection',
        tableName: 'connections',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
);

Connection.belongsTo(Workspace, { foreignKey: 'workspace_Id'});