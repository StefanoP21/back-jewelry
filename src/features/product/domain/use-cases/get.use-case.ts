import { type ProductEntity } from '../entities';
import { type ProductRepository } from '../repository/repository';

export interface GetProductUseCase {
	execute(): Promise<ProductEntity[]>;
}

export class GetProduct implements GetProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(): Promise<ProductEntity[]> {
		return this.repository.getProducts();
	}
}
