import { Router } from 'express';
import { CategoryController } from './controller';
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from '../infraestructure';

export class CategoryRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new CategoryDatasourceImpl();
		const repository = new CategoryRepositoryImpl(datasource);
		const controller = new CategoryController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		return router;
	}
}
