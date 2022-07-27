import AppError from '@shared/errors/AppError';
import { IUserRepository } from '../infra/repositories/IUserRepository';
import User from '../infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

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

  public async execute({ user_id, avatarFilename }: IRequest): Promise<void> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppError(`User not found`);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);


  }
}
}

export default UpdateUserAvatarService;
