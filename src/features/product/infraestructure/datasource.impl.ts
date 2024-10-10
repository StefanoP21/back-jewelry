import { CustomError } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { ProductEntity, type ProductDatasource, type CreateProductDto, type UpdateProductDto } from '../domain';

export class ProductDatasourceImpl implements ProductDatasource {
	constructor() {}

	async getAll(): Promise<ProductEntity[]> {
		try {
			const products = await prisma.product.findMany();
			return products.map((product) => ProductEntity.fromObject(product));
		} catch (error) {
			throw CustomError.internalServer(`Error al obtener los productos: ${error}`);
		}
	}

	async getById(id: number): Promise<ProductEntity> {
		const product = await prisma.product.findUnique({ where: { id } });
		if (!product) throw CustomError.notFound(`Producto con id ${id} no encontrado`);
		return ProductEntity.fromObject(product);
	}

	async create(dto: CreateProductDto): Promise<ProductEntity> {
		try {
			const product = await prisma.product.create({ data: dto });
			return ProductEntity.fromObject(product);
		} catch (error) {
			throw CustomError.internalServer(`Error al crear el producto: ${error}`);
		}
	}

	async update(dto: UpdateProductDto): Promise<ProductEntity> {
		try {
			const { id } = await this.getById(dto.id);
			const product = await prisma.product.update({ where: { id }, data: dto });
			return ProductEntity.fromObject(product);
		} catch (error) {
			throw CustomError.internalServer(`Error al actualizar el producto con id ${dto.id}: ${error}`);
		}
	}

	async delete(id: number): Promise<ProductEntity> {
		const { id: productId } = await this.getById(id);
		const deletedProduct = await prisma.product.delete({ where: { id: productId } });
		return ProductEntity.fromObject(deletedProduct);
	}
}
