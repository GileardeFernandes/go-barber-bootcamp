import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/fakeUserRepository';
import CreateUserService from './CreateUserService';

describe('Creating User', () => {
  // it('should be able to create a new user', async () => {
  //   const fakeUserRepository = new FakeUserRepository();
  //   const createUserService = new CreateUserService(fakeUserRepository);

  //   const user = await createUserService.execute({
  //     email: 'johndoe@gmail.com',
  //     name: 'john doe',
  //     password: '123456',
  //   });

  //   expect(user).toHaveProperty('id');
  // });

  it('should not be able to create a user with existing email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUserService = new CreateUserService(fakeUserRepository);

    await createUserService.execute({
      email: 'teste@gmail.com',
      name: 'teste',
      password: '123456',
    });

    expect(
      createUserService.execute({
        email: 'teste@gmail.com',
        name: 'teste',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
