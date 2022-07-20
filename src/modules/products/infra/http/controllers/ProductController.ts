import { Request, Response } from "express";
import CreateProductService from "../../../services/CreateProductService";
import DeleteProductService from "../../../services/DeleteProductService";
import ListProductService from "../../../services/ListProductService";
import ShowProductService from "../../../services/ShowProductService";
import UpdateProductService from "../../../services/UpdateProductService";

export default class ProductController {
  constructor(
    private listProductsService: ListProductService,
    private showProductService: ShowProductService,
    private deleteProductService: DeleteProductService,
    private createProductService: CreateProductService,
    private updateProductService: UpdateProductService){}
  public async index(request: Request, response: Response) : Promise<Response> {

    const products = await this.listProductsService.execute();

    return response.json(products);
}

  public async show(request: Request, response: Response) : Promise<Response> {

    const { id } = request.params;

    const product = await this.showProductService.execute({id});

    return response.json(product);
  }

  public async create(request: Request, response: Response) : Promise<Response> {

    const { name, price, quantity } = request.body;

    const product = await this.createProductService.execute({name, price, quantity});

    return response.json(product);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const product = await this.updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await this.deleteProductService.execute({ id });

    return response.json([]);
  }
}
