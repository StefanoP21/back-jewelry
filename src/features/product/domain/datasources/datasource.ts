import { type CreateProductDto, type UpdateProductDto } from '../dtos';
import { type ProductEntity } from '../entities/product.entity';

export abstract class ProductDatasource {
	abstract create(dto: CreateProductDto): Promise<ProductEntity>;
	abstract getAll(): Promise<ProductEntity[]>;
	abstract getById(id: number): Promise<ProductEntity>;
	abstract update(dto: UpdateProductDto): Promise<ProductEntity>;
	abstract delete(id: number): Promise<ProductEntity>;
}
