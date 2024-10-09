import { type ProductDto } from '../dtos';
import { type ProductEntity } from '../entities';
import { type ProductRepository } from '../repository/repository';

export interface UpdateProductUseCase {
	execute(dto: ProductDto): Promise<ProductEntity>;
}

export class UpdateProduct implements UpdateProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(dto: ProductDto): Promise<ProductEntity> {
		return this.repository.updateProduct(dto);
	}
}
