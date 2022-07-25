import { Request, Response } from "express";
import CreateProductService from "../../../services/CreateProductService";
import DeleteProductService from "../../../services/DeleteProductService";
import ListProductService from "../../../services/ListProductService";
import ShowProductService from "../../../services/ShowProductService";
import UpdateProductService from "../../../services/UpdateProductService";
import { container } from 'tsyringe';

export default class ProductController {

  public async index(request: Request, response: Response) : Promise<Response> {

    const listProductsService = container.resolve(ListProductService)
    const products = await listProductsService.execute();

    return response.json(products);
}

  public async show(request: Request, response: Response) : Promise<Response> {

    const { id } = request.params;
    const showProductService = container.resolve(ShowProductService)
    const product = await showProductService.execute({id});

    return response.json(product);
  }

  public async create(request: Request, response: Response) : Promise<Response> {

    const { name, price, quantity } = request.body;
    console.log(request.body)
    const createProductService = container.resolve(CreateProductService)
    const product = await createProductService.execute({name, price, quantity});

    return response.json(product);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id });

    return response.json([]);
  }
}
