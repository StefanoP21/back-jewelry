import { Router } from 'express';
import { SupplierController } from './controller';
import { SupplierDatasourceImpl, SupplierRepositoryImpl } from '../infraestructure';

export class SupplierRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new SupplierDatasourceImpl();
		const repository = new SupplierRepositoryImpl(datasource);
		const controller = new SupplierController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		return router;
	}
}
