import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UserRepository";

class GivenUserService {
  public async execute(id: string) : Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.givenUser(id)
    if (!user) {
      throw new AppError(`User not found`, 404)
    }
    return user;
  }
}

export default GivenUserService;
