import { DataSource } from 'typeorm/data-source';
import isUndefined from './utils/isundefined';

const entities = [];

export async function getDataSource(): Promise<DataSource> {
  const port = parseInt(process.env.DB_PORT) ?? 5432;
  const host = process.env.DB_HOST ?? 'localhost';
  const database = process.env.DB_DATABASE ?? 'polycode';
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;

  if (isUndefined(username, password))
    throw new Error('DB_USERNAME and DB_PASSWORD must be set');

  const dataSource = new DataSource({
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    synchronize: true,
    logging: true,
    entities,
    subscribers: [],
    migrations: [],
  });

  dataSource.initialize();

  return dataSource;
}
