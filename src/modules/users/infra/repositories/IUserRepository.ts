import { ICreateUser } from '../../domain/models/ICreateUser';
import { IUser } from '../../domain/models/IUser';
import User from '../typeorm/entities/User';

export interface IUserRepository {
  findByName(name: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  givenUser(id: string): Promise<IUser | null>;
  create({ name, email, password }: ICreateUser): Promise<IUser>;
  save(product: IUser): Promise<IUser>;
  findOne(id: string): Promise<IUser | null>;
  remove(user: IUser): Promise<void>;
  find(): Promise<IUser[]>;
}
