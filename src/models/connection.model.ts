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
import { Company } from '@/models/company.model';

export const CONNECTION_MODIFIABLE_FIELDS = [
    'name',
    'connection_license_public_key',
    'connection_license_private_key',
    'device_issuance_key'
];

export class Connection extends Model<InferAttributes<Connection>, InferCreationAttributes<Connection>> {
    declare id?: string;
    declare name: string;
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
          exact: ['company_id'],
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
        company_id: {
            type: DataTypes.UUID,
            allowNull: false,
            validate: {
                notEmpty: true,
                notNull: true, 
            }
        },
        connection_license_public_key: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        connection_license_private_key: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        device_issuance_key: {
            type: DataTypes.TEXT,
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
        modelName: 'Connection',
        tableName: 'connections',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
);

Connection.belongsTo(Company, {foreignKey: 'company_id'});