import { EntityRepository, getConnection, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async givenUser(id: string): Promise<User | undefined> {
    const user = await getRepository(User)
    .createQueryBuilder('user')
      .where('user.id = :id', { id: id })
      .getOne()
    return user;
  }
}

export default UsersRepository;
