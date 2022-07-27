import Product from '../../../modules/products/infra/typeorm/entities/Product';
import User from '../../../modules/users/infra/typeorm/entities/User';
import { DataSource } from 'typeorm';
import { CreateProducts1656513279956 } from './migrations/1656513279956-CreateProducts';
import { CreateUsers1607534203339 } from './migrations/1657219977426-CreateUsers';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'api-vendas-db-1',
  entities: [User, Product],
  migrations: [CreateProducts1656513279956, CreateUsers1607534203339],
});
