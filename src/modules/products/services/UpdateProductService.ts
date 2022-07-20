import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  constructor(private repository: IProductsRepository) {}

  public async execute({
     id,
     name,
     price,
     quantity,
  }: IRequest) : Promise<Product> {

    const product = await this.repository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await this.repository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError(`Product ${name} already exists. Try a different name.`);
  }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.repository.save(product);

    return product;
  }
}

export default UpdateProductService;
