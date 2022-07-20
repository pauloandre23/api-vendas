import productsRouter from '@modules/products/infra/http/routes';
import usersRouter from '@modules/users/infra/http/routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import { Router } from 'express';
const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', usersRouter);

routes.use('/login', sessionRouter);

export default routes;
