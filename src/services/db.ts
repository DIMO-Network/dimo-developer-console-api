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
    const { PG_URL } = process.env;

    return new Sequelize(PG_URL!, {
      dialectModule: pg,
    });
  }
}

export default new DB();
