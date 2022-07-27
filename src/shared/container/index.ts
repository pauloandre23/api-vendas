import { container } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { ProductRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/users/infra/repositories/IUserRepository';

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  ProductRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
