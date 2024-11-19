import { Router } from 'express';
import { OrderController } from './controller';
import { OrderDatasourceImpl, OrderRepositoryImpl } from '../infraestructure';

export class OrderRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new OrderDatasourceImpl();
		const repository = new OrderRepositoryImpl(datasource);
		const controller = new OrderController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.delete('/:id', controller.delete);

		return router;
	}
}
