import { CustomError } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { ProductEntity, type ProductDatasource, type ProductDto } from '../domain';

export class ProductDatasourceImpl implements ProductDatasource {
	constructor() {}

	async getProducts(): Promise<ProductEntity[]> {
		return (await prisma.product.findMany()).map(ProductEntity.fromObject);
	}

	async getProductById(id: number): Promise<ProductEntity> {
		const productExist = await prisma.product.findFirst({ where: { id: id } });

		if (!productExist) throw CustomError.notFound('Producto no encontrado');

		const product = ProductEntity.fromObject(productExist);

		return product;
	}

	async createProduct(dto: Omit<ProductDto, 'id'>): Promise<ProductEntity> {
		const product = await prisma.product.create({ data: dto });

		return ProductEntity.fromObject(product);
	}

	async updateProduct(dto: ProductDto): Promise<ProductEntity> {
		const productExist = await prisma.product.findFirst({ where: { id: dto.id } });

		if (!productExist) throw CustomError.notFound('Producto no encontrado');

		const product = await prisma.product.update({ where: { id: dto.id }, data: dto });

		return ProductEntity.fromObject(product);
	}

	async deleteProduct(id: number): Promise<unknown> {
		const productExist = prisma.product.findFirst({ where: { id: id } });

		if (!productExist) throw CustomError.notFound('Producto no encontrado');

		await prisma.product.delete({ where: { id: id } });

		return { message: 'Producto eliminado' };
	}
}
