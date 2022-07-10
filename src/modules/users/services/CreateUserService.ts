import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository  from "../typeorm/repositories/UserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({name, email, password}: IRequest) : Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userExists = await usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError(`user with email: ${email} already exists`)
  }

  const hashPass = await hash(password, 8);

  const user = await usersRepository.create({
    name,
    email,
    password: hashPass
  });

  await usersRepository.save(user);

  return user;
  }
}

export default CreateUserService;
