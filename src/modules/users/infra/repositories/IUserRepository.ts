import { ICreateUser } from "../../domain/models/ICreateUser";
import { IUser } from "../../domain/models/IUser";
import User from "../typeorm/entities/User";

export interface IUserRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  givenUser(id: string): Promise<IUser | undefined>;
  create({name, email, password}: ICreateUser): Promise<IUser>;
  save(product: IUser): Promise<IUser>;
  findOne(id: string): Promise<IUser | undefined>;
  remove(user: IUser): Promise<void>;
  find(): Promise<IUser[]>;
}
