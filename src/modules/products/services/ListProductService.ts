import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import { injectable, inject } from 'tsyringe';

@injectable()
class ListProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductsRepository
    ) {}

  public async execute() : Promise<Product[]> {
    const products = await this.repository.find()

    return products;
  }
}

export default ListProductService;
