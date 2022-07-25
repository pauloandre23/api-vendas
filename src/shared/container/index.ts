import { container } from 'tsyringe';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { ProductRepository }  from '@modules/products/infra/typeorm/repositories/ProductsRepository'


container.registerSingleton<IProductsRepository>('ProductRepository', ProductRepository)

