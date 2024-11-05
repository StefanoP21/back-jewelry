import { Router } from 'express';
import { CustomerController } from './controller';
import { CustomerDatasourceImpl, CustomerRepositoryImpl } from '../infraestructure';

export class CustomerRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new CustomerDatasourceImpl();
		const repository = new CustomerRepositoryImpl(datasource);
		const controller = new CustomerController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		return router;
	}
}
