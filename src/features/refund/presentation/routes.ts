import { Router } from 'express';
import { RefundController } from './controller';
import { RefundDatasourceImpl, RefundRepositoryImpl } from '../infraestructure';

export class RefundRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new RefundDatasourceImpl();
		const repository = new RefundRepositoryImpl(datasource);
		const controller = new RefundController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.delete('/:id', controller.delete);

		return router;
	}
}
