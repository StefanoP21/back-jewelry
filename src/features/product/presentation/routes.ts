import { Router } from 'express';
import { ProductController } from './controller';
import { ProductDatasourceImpl, ProductRepositoryImpl } from '../infraestructure';
// import { AuthMiddleware } from './middlewares/auth.middleware';

export class ProductRoutes {
	static get routes(): Router {
		const router = Router();

		const datasource = new ProductDatasourceImpl();
		const repository = new ProductRepositoryImpl(datasource);
		const controller = new ProductController(repository);

		router.get('/get', controller.getProducts);
		router.get('/getbyid', controller.getProductById);
		router.post('/create', controller.createProduct);
		router.put('/update', controller.updateProduct);
		router.delete('/delete', controller.deleteProduct);

		return router;
	}
}
