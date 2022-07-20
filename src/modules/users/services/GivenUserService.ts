import AppError from '@shared/errors/AppError';
import { IUserRepository } from '../infra/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';

class GivenUserService {
  constructor(private repository: IUserRepository) {}
  public async execute(id: string): Promise<User> {
    const user = await this.repository.givenUser(id);

    if (!user) {
      throw new AppError(`User not found`, 404);
    }
    return user;
  }
}

export default GivenUserService;
