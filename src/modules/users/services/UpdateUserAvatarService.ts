import AppError from '@shared/errors/AppError';
import { IUserRepository } from '../infra/repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private repository: IUserRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppError(`User not found`);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await this.repository.save(user);

    return user;
  }

}

export default UpdateUserAvatarService;
