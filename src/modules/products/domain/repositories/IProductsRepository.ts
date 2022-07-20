import { ICreateProduct } from "../models/ICreateProduct";
import { IProduct } from "../models/IProduct";

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  create({name, quantity, price}: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  findOne(id: string): Promise<IProduct | undefined>;
  remove(product: IProduct): Promise<void>;
  find(): Promise<IProduct[]>;
}
