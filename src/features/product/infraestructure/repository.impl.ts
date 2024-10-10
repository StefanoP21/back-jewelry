import { ProductDatasource, CreateProductDto, UpdateProductDto, ProductEntity, ProductRepository } from '../domain';

export class ProductRepositoryImpl implements ProductRepository {
	constructor(private readonly datasource: ProductDatasource) {}

	getProducts(): Promise<ProductEntity[]> {
		return this.datasource.getProducts();
	}

	getProductById(id: number): Promise<ProductEntity> {
		return this.datasource.getProductById(id);
	}

	createProduct(dto: CreateProductDto): Promise<ProductEntity> {
		return this.datasource.createProduct(dto);
	}

	updateProduct(dto: UpdateProductDto): Promise<ProductEntity> {
		return this.datasource.updateProduct(dto);
	}

	deleteProduct(id: number): Promise<unknown> {
		return this.datasource.deleteProduct(id);
	}
}
