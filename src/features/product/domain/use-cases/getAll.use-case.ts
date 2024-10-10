import { type ProductEntity } from '../entities/product.entity';
import { type ProductRepository } from '../repository/repository';

export interface GetAllProductsUseCase {
	execute(): Promise<ProductEntity[]>;
}

export class GetAllProducts implements GetAllProductsUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(): Promise<ProductEntity[]> {
		return this.repository.getAll();
	}
}
