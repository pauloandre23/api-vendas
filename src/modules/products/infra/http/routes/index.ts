import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { celebrate, Joi, Segments } from 'celebrate';
import { ProductRepository } from '../../typeorm/repositories/ProductsRepository';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import ShowProductService from '@modules/products/services/ShowProductService';
import ListProductService from '@modules/products/services/ListProductService';

const productsRouter = Router();
const repository = new ProductRepository();

const createProductService = new CreateProductService(repository);
const deleteProductService = new DeleteProductService(repository);
const updateProductService = new UpdateProductService(repository);
const showProductService = new ShowProductService(repository);
const listProductsService = new ListProductService(repository);

const productsController = new ProductController(
  listProductsService,
  showProductService,
  deleteProductService,
  createProductService,
  updateProductService);

productsRouter
  .get('/', productsController.index)

  .get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    productsController.show,
  )

  .post(
    '/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    }),
    productsController.create,
  )

  .put(
    '/:id',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    productsController.update,
  )

  .delete(
    '/:id',
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    productsController.delete,
  );

export default productsRouter;
