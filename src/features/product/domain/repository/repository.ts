import { type CreateProductDto, type UpdateProductDto } from '../dtos';
import { type ProductEntity } from '../entities';

export abstract class ProductRepository {
	abstract getProducts(): Promise<ProductEntity[]>;
	abstract getProductById(id: number): Promise<ProductEntity>;
	abstract createProduct(dto: CreateProductDto): Promise<ProductEntity>;
	abstract updateProduct(dto: UpdateProductDto): Promise<ProductEntity>;
	abstract deleteProduct(id: number): Promise<unknown>;
}
