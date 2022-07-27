import AppError from '@shared/errors/AppError';
import { IUserRepository } from '../infra/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

@injectable()
class GivenUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}
  public async execute(id: string): Promise<User> {
    const user = await this.repository.givenUser(id);

    if (!user) {
      throw new AppError(`User not found`, 404);
    }
    return user;
  }
}

export default GivenUserService;
