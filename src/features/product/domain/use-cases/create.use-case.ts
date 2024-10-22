import { type CreateProductDto } from '../dtos';
import { type ProductEntity } from '../entities/product.entity';
import { type ProductRepository } from '../repository/repository';

export interface CreateProductUseCase {
	execute(dto: CreateProductDto): Promise<ProductEntity>;
}

export class CreateProduct implements CreateProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(dto: CreateProductDto): Promise<ProductEntity> {
		return this.repository.create(dto);
	}
}
