import { Router } from 'express';
import { ProductController } from './controller';
import { ProductDatasourceImpl, ProductRepositoryImpl } from '../infraestructure';

export class ProductRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new ProductDatasourceImpl();
		const repository = new ProductRepositoryImpl(datasource);
		const controller = new ProductController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		return router;
	}
}
