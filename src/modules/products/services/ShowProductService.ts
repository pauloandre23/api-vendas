import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";

interface IRequest {
  id: string;
}

class ShowProductService {
  constructor(private repository: IProductsRepository) {}

  public async execute({ id }: IRequest) : Promise<Product> {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
