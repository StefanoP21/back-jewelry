import { type ProductDto } from '../dtos';
import { type ProductEntity } from '../entities';

export abstract class ProductRepository {
	abstract getProducts(): Promise<ProductEntity[]>;
	abstract getProductById(id: number): Promise<ProductEntity>;
	abstract createProduct(dto: Omit<ProductDto, 'id'>): Promise<ProductEntity>;
	abstract updateProduct(dto: ProductDto): Promise<ProductEntity>;
	abstract deleteProduct(id: number): Promise<unknown>;
}
