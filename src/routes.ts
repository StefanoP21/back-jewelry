import { Router } from 'express';
import { AuthRoutes } from './features/auth';
import { ProductRoutes } from './features/product';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/auth', AuthRoutes.routes);
		router.use('/api/product', ProductRoutes.routes);

		return router;
	}
}
