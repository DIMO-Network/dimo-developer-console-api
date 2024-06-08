import * as pg from 'pg';
import { Sequelize } from 'sequelize';

class DB {
  private static instance: DB;
  public connection: Sequelize | null = null;

  constructor() {
    if (DB.instance) {
      return DB.instance;
    }

    this.connection = this.connect();
    DB.instance = this;

    return DB.instance;
  }

  connect() {
    const {
      env: { VERCEL_ENV },
    } = process;
    const {
      PGUSER: user = '',
      PGPASSWORD: password = '',
      PGHOST: host = '',
      PGPORT: port = '',
      PGDATABASE: database = '',
    } = process.env;
    const postgresUrl = `postgres://${user}:${password}@${host}:${port}/${database}${
      VERCEL_ENV ? '?sslmode=require' : ''
    }`;

    return new Sequelize(postgresUrl, {
      dialectModule: pg,
    });
  }
}

export default new DB();
