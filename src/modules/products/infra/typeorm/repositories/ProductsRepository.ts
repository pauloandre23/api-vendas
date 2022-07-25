import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { dataSource } from '@shared/infra/typeorm';
import { getRepository, Repository} from 'typeorm';
import Product from '../entities/Product';


export class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>
  constructor() {
    this.ormRepository = dataSource.getRepository(Product)
  }
  public async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      }
    })
    return product;
  }

  public async create({name, quantity, price}: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, quantity, price
    })
    console.log("product  repository", product)
    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async findOne(id: string): Promise<Product | null> {
    const userFound = await this.ormRepository.findOne({
      where: { id },
    });

    return userFound;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();
    return products;
  }

}
