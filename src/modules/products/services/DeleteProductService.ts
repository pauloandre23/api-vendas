import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import { injectable, inject } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductsRepository
    ) {}

  public async execute({ id }: IRequest) : Promise<void> {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.repository.remove(product);
  }
}

export default DeleteProductService;
