import IUserRepository from '@modules/users/repositories/IUserRepository';
import { Repository, getRepository } from 'typeorm';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepositor: Repository<User>;

  constructor() {
    this.ormRepositor = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepositor.findOne({
      where: { email },
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepositor.findOne(id);

    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepositor.create(data);
    await this.ormRepositor.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepositor.save(user);
  }
}
