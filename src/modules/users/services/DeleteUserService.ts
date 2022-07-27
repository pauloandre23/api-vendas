import AppError from '@shared/errors/AppError';
import { IUserRepository } from '../infra/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.repository.remove(user);
  }
}

export default DeleteUserService;
