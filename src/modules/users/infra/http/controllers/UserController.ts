import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import GivenUserService from '../../../services/GivenUserService';
import ListUsersService from '../../../services/ListUsersService';
import { container } from 'tsyringe';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);
    const users = await listUsersService.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }

  public async givenUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const givenUserService = container.resolve(GivenUserService);
    const user = await givenUserService.execute(id);

    return response.json(user);
  }
}
