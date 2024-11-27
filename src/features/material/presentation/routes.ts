import { Router } from 'express';
import { MaterialController } from './controller';
import { MaterialDatasourceImpl, MaterialRepositoryImpl } from '../infraestructure';

export class MaterialRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new MaterialDatasourceImpl();
		const repository = new MaterialRepositoryImpl(datasource);
		const controller = new MaterialController(repository);

		router.get('/', controller.getAll);
		router.get('/:id', controller.getById);
		router.post('/', controller.create);
		router.put('/:id', controller.update);
		router.delete('/:id', controller.delete);

		return router;
	}
}
