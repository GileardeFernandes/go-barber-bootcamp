import { Response, Request } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import { container } from 'tsyringe';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUserService = container.resolve(CreateUserService);
      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      delete user.password;
      return response.json(user);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}
