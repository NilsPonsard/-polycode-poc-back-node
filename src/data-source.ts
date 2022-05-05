import { DataSource } from 'typeorm';
import { AccessToken } from './entities/Token.entity';
import { Completion } from './entities/completion.entity';
import { Email } from './entities/email.entity';
import { RefreshToken } from './entities/refreshToken.entity';
import { User } from './entities/user.entity';
import isUndefined from './utils/isundefined';

const entities = [User, Email, RefreshToken, AccessToken, Completion];

export let dataSource: DataSource;

export async function getDataSource(): Promise<DataSource> {
  const port = parseInt(process.env.DB_PORT) ?? 5432;
  const host = process.env.DB_HOST ?? 'localhost';
  const database = process.env.DB_DATABASE ?? 'polycode';
  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;

  if (isUndefined(username, password))
    throw new Error('DB_USERNAME and DB_PASSWORD must be set');

  dataSource = new DataSource({
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

  await dataSource.initialize();

  await dataSource.synchronize();

  return dataSource;
}
