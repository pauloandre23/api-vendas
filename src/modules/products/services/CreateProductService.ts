import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  constructor(private repository: IProductsRepository) {}

  public async execute({name, price, quantity}: IRequest) : Promise<Product> {
   const productExists = await this.repository.findByName(name);

    if (productExists) {
      throw new AppError(`Product ${name} already exists`)
  }

  const product = await this.repository.create({
    name,
    price,
    quantity
  });

  await this.repository.save(product);

  return product;
  }
}

export default CreateProductService;
