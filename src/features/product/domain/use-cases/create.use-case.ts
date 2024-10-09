import { type ProductDto } from '../dtos';
import { type ProductEntity } from '../entities';
import { type ProductRepository } from '../repository/repository';

export interface CreateProductUseCase {
	execute(dto: Omit<ProductDto, 'id'>): Promise<ProductEntity>;
}

export class CreateProduct implements CreateProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(dto: Omit<ProductDto, 'id'>): Promise<ProductEntity> {
		return this.repository.createProduct(dto);
	}
}
