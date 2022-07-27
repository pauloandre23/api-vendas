import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | null>;
  create({ name, quantity, price }: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  findOne(id: string): Promise<IProduct | null>;
  remove(product: IProduct): Promise<void>;
  find(): Promise<IProduct[]>;
}
