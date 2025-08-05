import { Attributes } from 'sequelize';

import { Connection } from '@/models/connection.model';
import { FilterObject } from '@/utils/filter';
import { PaginationOptions } from '@/utils/paginateData';
import { Workspace } from '@/models/workspace.model';

export const getConnections = async (filter: FilterObject, pagination: PaginationOptions) => {
    return Connection.findAllPaginated(filter, pagination);
};

export const getMyConnections = async (
    filter: FilterObject, 
    pagination: PaginationOptions,
    companyId: string, 
) => {
    return Connection.findAllPaginated({...filter, company_id: companyId}, pagination);
};

export const findConnectionById = async (id: string) => {
    return Connection.findOne({ where: { id } });
};

export const createConnection = async (
    connectionData: Attributes<Connection>,
    workspaceId: string,
    companyId: string,
) => {
    return Connection.create({
        ...connectionData,
        workspace_id: workspaceId,
        company_id: companyId,
    });
};

export const findMyConnection = (id: string, companyId: string) => {
    return Connection.findOne({
        where: { id, company_id: companyId },
        // TODO BARRETT: need to include connectionLicense Key, PK, and Device Issuance Key
        include: [Workspace],
    });
};

// updateConnection 

// updateMyConnection

// deleteOwnApp

