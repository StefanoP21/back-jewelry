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

		const authMiddleware = new AuthMiddleware(repository);

		router.get('/', controller.getAllUsers);
		router.delete('/:id', [authMiddleware.validateJWT], controller.deleteUser);
		router.post('/login', controller.loginUser);
		router.post('/register', controller.registerUser);
		router.put('/update', [authMiddleware.validateJWT], controller.updatePassword);
		router.get('/renew', [authMiddleware.validateJWT], controller.renewUser);

		return router;
	}
}
