import { Router } from 'express';
import { AuthMiddleware, AuthRoutes } from './features/auth';
import { CategoryRoutes } from './features/category';
import { ProductRoutes } from './features/product';
import { PurchaseRoutes } from './features/purchase';
import { RefundRoutes } from './features/refund';
import { AuthDatasourceImpl, AuthRepositoryImpl } from './features/auth/infraestructure';
import { BcryptAdapter } from './core';
import { CustomerRoutes } from './features/customer';
import { SupplierRoutes } from './features/supplier';

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
		router.use('/refund', [authMiddleware.validateJWT], RefundRoutes.routes);
		router.use('/customer', [authMiddleware.validateJWT], CustomerRoutes.routes);
		router.use('/supplier', [authMiddleware.validateJWT], SupplierRoutes.routes);

		return router;
	}
}
