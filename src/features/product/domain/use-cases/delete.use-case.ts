import { type ProductEntity } from '../entities/product.entity';
import { type ProductRepository } from '../repository/repository';

export interface DeleteProductUseCase {
	execute(id: number): Promise<ProductEntity>;
}

export class DeleteProduct implements DeleteProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(id: number): Promise<ProductEntity> {
		return this.repository.delete(id);
	}
}
