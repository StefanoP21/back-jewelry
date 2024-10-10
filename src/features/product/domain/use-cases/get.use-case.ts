import { type ProductEntity } from '../entities';
import { type ProductRepository } from '../repository/repository';

export interface GetProductsUseCase {
	execute(): Promise<ProductEntity[]>;
}

export class GetProducts implements GetProductsUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(): Promise<ProductEntity[]> {
		return this.repository.getProducts();
	}
}
