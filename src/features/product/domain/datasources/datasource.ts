import { type ProductEntity } from '../entities/product.entity';
import { type ProductDto } from '../dtos/product.dto';

export abstract class ProductDatasource {
	abstract getProducts(): Promise<ProductEntity[]>;
	abstract getProductById(id: number): Promise<ProductEntity>;
	abstract createProduct(dto: Omit<ProductDto, 'id'>): Promise<ProductEntity>;
	abstract updateProduct(dto: ProductDto): Promise<ProductEntity>;
	abstract deleteProduct(id: number): Promise<unknown>;
}
