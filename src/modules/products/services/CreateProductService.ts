import AppError from "@shared/errors/AppError";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";
import Product from "../infra/typeorm/entities/Product";
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private repository: IProductsRepository
    ) {}

  public async execute({name, price, quantity}: IRequest) : Promise<Product> {
    console.log("name service ",name)
   const productExists = await this.repository.findByName(name);
    console.log("productExists  ", productExists)
    if (productExists) {
      throw new AppError(`Product ${name} already exists`)
  }

  const product = await this.repository.create({
    name,
    price,
    quantity
  });

  await this.repository.save(product);
  console.log("product service", product)
  return product;
  }
}

export default CreateProductService;
