import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

interface IRequest {
  id: string;
}

class DeleteProductService {
  constructor(private repository: IProductsRepository) {}

  public async execute({ id }: IRequest) : Promise<void> {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.repository.remove(product);
  }
}

export default DeleteProductService;
