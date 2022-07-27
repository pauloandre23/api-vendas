import { IUserRepository } from '../infra/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListUsersService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}
  public async execute(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }
}

export default ListUsersService;
