import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import isAuthenticated from '../../../middlewares/isAuthenticated';
import CreateUserService from '@modules/users/services/CreateUserService';
import UserRepository from '../../typeorm/repositories/UserRepository';
import GivenUserService from '@modules/users/services/GivenUserService';
import ListUsersService from '@modules/users/services/ListUsersService';

const usersRouter = Router();
const userRepository = new UserRepository()

const createUserService = new CreateUserService(userRepository)
const givenUserService = new GivenUserService(userRepository)

const listUsersService = new ListUsersService(userRepository)

const usersController = new UserController(listUsersService, createUserService, givenUserService);

usersRouter
  .get('/', isAuthenticated, usersController.index)
  .get('/givenUser/:id', usersController.givenUser)

  .post(
    '/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    usersController.create,
  );

export default usersRouter;
