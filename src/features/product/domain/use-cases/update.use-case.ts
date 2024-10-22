import { type UpdateProductDto } from '../dtos';
import { type ProductEntity } from '../entities/product.entity';
import { type ProductRepository } from '../repository/repository';

export interface UpdateProductUseCase {
	execute(dto: UpdateProductDto): Promise<ProductEntity>;
}

export class UpdateProduct implements UpdateProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(dto: UpdateProductDto): Promise<ProductEntity> {
		return this.repository.update(dto);
	}
}
