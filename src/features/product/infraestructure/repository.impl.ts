import { ProductDatasource, CreateProductDto, UpdateProductDto, ProductEntity, ProductRepository } from '../domain';

export class ProductRepositoryImpl implements ProductRepository {
	constructor(private readonly datasource: ProductDatasource) {}

	getAll(): Promise<ProductEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<ProductEntity> {
		return this.datasource.getById(id);
	}

	create(dto: CreateProductDto): Promise<ProductEntity> {
		return this.datasource.create(dto);
	}

	update(dto: UpdateProductDto): Promise<ProductEntity> {
		return this.datasource.update(dto);
	}

	delete(id: number): Promise<ProductEntity> {
		return this.datasource.delete(id);
	}
}
