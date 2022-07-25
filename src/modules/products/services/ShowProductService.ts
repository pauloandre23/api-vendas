import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import { injectable, inject } from 'tsyringe';


interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductsRepository
    ) {}

  public async execute({ id }: IRequest) : Promise<Product> {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
