import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../infraestructure';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { BcryptAdapter } from '../../../core';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new AuthDatasourceImpl(BcryptAdapter.hash, BcryptAdapter.compare);
		const repository = new AuthRepositoryImpl(datasource);
		const controller = new AuthController(repository);

		const middleware = new AuthMiddleware(repository);

		router.post('/login', controller.loginUser);
		router.post('/register', [middleware.validateJWT], controller.registerUser);
		router.get('/renew', [middleware.validateJWT], controller.renewUser);

		return router;
	}
}
