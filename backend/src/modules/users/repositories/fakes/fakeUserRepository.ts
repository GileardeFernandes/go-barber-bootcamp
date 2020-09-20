import { uuid } from 'uuidv4';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '../IUserRepository';
import User from '../../infra/typeorm/entities/User';

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.users.find(findUser => findUser.email === email);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.users.find(findUser => findUser.id === id);
    return user;
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, data);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const userIndexOf = this.users.findIndex(
      findUser => findUser.id === user.id,
    );

    this.users[userIndexOf] = user;

    return user;
  }
}
