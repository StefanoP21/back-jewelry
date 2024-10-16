import { Router } from 'express';
import { PurchaseController } from './controller';
import { PurchaseDatasourceImpl, PurchaseRepositoryImpl } from '../infraestructure';

export class PurchaseRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new PurchaseDatasourceImpl();
		const repository = new PurchaseRepositoryImpl(datasource);
		const controller = new PurchaseController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.delete('/:id', controller.delete);

		return router;
	}
}
