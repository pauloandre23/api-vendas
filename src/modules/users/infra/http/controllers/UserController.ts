import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import GivenUserService from '../../../services/GivenUserService';
import ListUsersService from '../../../services/ListUsersService';

export default class ProductController {
  constructor(
    private listUsersService: ListUsersService,
    private createUserService: CreateUserService,
    private givenUserService: GivenUserService
    ) {}

  public async index(request: Request, response: Response): Promise<Response> {

    const users = await this.listUsersService.execute();

    return response.json(users);
  }

  // public async show(request: Request, response: Response) : Promise<Response> {

  //   const { id } = request.params;
  //   const showProduct = new ShowProductService();

  //   const product = await showProduct.execute({id});

  //   return response.json(product);
  // }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const user = await this.createUserService.execute({ name, email, password });

    return response.json(user);
  }

  public async givenUser(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const user = await this.givenUserService.execute(id);

    return response.json(user);
  }

  // public async update(request: Request, response: Response): Promise<Response> {
  //   const { name, price, quantity } = request.body;
  //   const { id } = request.params;

  //   const updateProduct = new UpdateProductService();

  //   const product = await updateProduct.execute({
  //     id,
  //     name,
  //     price,
  //     quantity,
  //   });

  //   return response.json(product);
  // }

  // public async delete(request: Request, response: Response): Promise<Response> {
  //   const { id } = request.params;

  //   const deleteProduct = new DeleteProductService();

  //   await deleteProduct.execute({ id });

  //   return response.json([]);
  // }
}
