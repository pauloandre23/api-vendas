import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { IUserRepository } from '../infra/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userExists = await this.repository.findByEmail(email);

    if (userExists) {
      throw new AppError(`user with email: ${email} already exists`);
    }

    const hashPass = await hash(password, 8);

    const user = await this.repository.create({
      name,
      email,
      password: hashPass,
    });

    await this.repository.save(user);

    return user;
  }
}

export default CreateUserService;
