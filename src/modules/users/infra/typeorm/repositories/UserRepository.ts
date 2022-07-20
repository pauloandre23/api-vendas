import {
  EntityRepository,
  getConnection,
  getRepository,
  Repository,
} from 'typeorm';
import { ICreateUser } from '../../domain/models/ICreateUser';
import { IUser } from '../../domain/models/IUser';
import { IUserRepository } from '../../repositories/IUserRepository';
import User from '../entities/User';


class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User)
  }
  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
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
      .getOne();
    return user;
  }

  public async create({name, email, password}: ICreateUser): Promise<User> {
    const userCreated = this.ormRepository.create({name, email, password});

    await this.ormRepository.save(userCreated);

    return userCreated;
  }

  public async save(user: IUser): Promise<User> {
    const userSaved = await this.ormRepository.save(user);

    return userSaved;
  }

  public async findOne(id: string): Promise<User | undefined> {
    const userFound = await this.ormRepository.findOne(id);

    return userFound;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async find(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }
}

export default UsersRepository;
