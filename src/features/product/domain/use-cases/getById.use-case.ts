import { type ProductEntity } from '../entities/product.entity';
import { type ProductRepository } from '../repository/repository';

export interface GetProductByIdUseCase {
	execute(id: number): Promise<ProductEntity>;
}

export class GetProductById implements GetProductByIdUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(id: number): Promise<ProductEntity> {
		return this.repository.getById(id);
	}
}
