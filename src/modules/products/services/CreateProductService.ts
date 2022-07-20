import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../infra/typeorm/entities/Product";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({name, price, quantity}: IRequest) : Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError(`Product ${name} already exists`)
  }

  const product = await productsRepository.create({
    name,
    price,
    quantity
  });

  await productsRepository.save(product);

  return product;
  }
}

export default CreateProductService;
