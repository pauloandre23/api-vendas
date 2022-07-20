import AppError from "@shared/errors/AppError";
import { IUserRepository } from "../infra/repositories/IUserRepository";

interface IRequest {
  id: string;
}

class DeleteUserService {
  constructor(private repository: IUserRepository) {}

  public async execute({ id }: IRequest) : Promise<void> {

    const user = await this.repository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.repository.remove(user);
  }
}

export default DeleteUserService;
