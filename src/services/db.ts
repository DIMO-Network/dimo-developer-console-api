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
      PGUSER: user = '',
      PGPASSWORD: password = '',
      PGHOST: host = '',
      PGPORT: port = '',
      PGDATABASE: database = '',
    } = process.env;
    return new Sequelize(
      `postgres://${user}:${password}@${host}:${port}/${database}?sslmode=require`,
      {
        dialectModule: pg,
      }
    );
  }
}

export default new DB();
