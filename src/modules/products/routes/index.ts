import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { celebrate, Joi, Segments} from 'celebrate';

const productsRouter = Router();
const productsController = new ProductController();

productsRouter
.get('/', productsController.index)

.get('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
})
,productsController.show)

.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    price: Joi.number().precision(2).required(),
    quantity: Joi.number().required(),
  }
})
,productsController.create)


.put('/:id',
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
productsController.update)

.delete('/:id',
celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required(),
  },
}),
productsController.delete)

export default productsRouter;
