import { Router } from 'express';
import { AuthMiddleware, AuthRoutes } from './features/auth';
import { CategoryRoutes } from './features/category';
import { ProductRoutes } from './features/product';
import { PurchaseRoutes } from './features/purchase';
import { AuthDatasourceImpl, AuthRepositoryImpl } from './features/auth/infraestructure';
import { BcryptAdapter } from './core';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		const authDatasource = new AuthDatasourceImpl(BcryptAdapter.hash, BcryptAdapter.compare);
		const authRepository = new AuthRepositoryImpl(authDatasource);
		const authMiddleware = new AuthMiddleware(authRepository);

		router.use('/auth', AuthRoutes.routes);
		router.use('/category', [authMiddleware.validateJWT], CategoryRoutes.routes);
		router.use('/product', [authMiddleware.validateJWT], ProductRoutes.routes);
		router.use('/purchase', [authMiddleware.validateJWT], PurchaseRoutes.routes);

		return router;
	}
}
