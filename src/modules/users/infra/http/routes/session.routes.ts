import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionController from '../controllers/SessionController';
import UsersRepository from '../../typeorm/repositories/UserRepository';
import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionRouter = Router();

const repository = new UsersRepository();
const createSessionService = new CreateSessionService(repository);

const sessionController = new SessionController(createSessionService);

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
