import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../infraestructure';

export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new AuthDatasourceImpl();
		const repository = new AuthRepositoryImpl(datasource);
		const authController = new AuthController(repository);

		router.post('/register', authController.registerUser);
		router.post('/login', authController.loginUser);
		router.get('/renew', authController.renewUser);

		return router;
	}
}
