import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { ProductEntity, type ProductDatasource, type CreateProductDto, type UpdateProductDto } from '../domain';

export class ProductDatasourceImpl implements ProductDatasource {
	constructor() {}

	async getAll(): Promise<ProductEntity[]> {
		try {
			const products = await prisma.product.findMany({
				include: {
					category: { select: { id: true, name: true } },
					material: { select: { id: true, name: true } },
					purchaseDetail: {
						select: { unitPrice: true },
						orderBy: { purchase: { createdAt: 'desc' } },
						take: 1
					}
				},
				orderBy: { name: 'asc' }
			});

			return products.map((product) =>
				ProductEntity.fromObject({
					...product,
					purchasePrice: !product.purchaseDetail[0] ? 0 : product.purchaseDetail[0].unitPrice.toNumber()
				})
			);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener los productos: ${error}`);
		}
	}

	async getById(id: number): Promise<ProductEntity> {
		try {
			const product = await prisma.product.findUnique({
				where: { id },
				include: {
					category: { select: { id: true, name: true } },
					material: { select: { id: true, name: true } },
					purchaseDetail: {
						select: { unitPrice: true },
						orderBy: { purchase: { createdAt: 'desc' } },
						take: 1
					}
				}
			});

			if (!product) throw CustomError.notFound(ErrorMessages.PRODUCT_NOT_FOUND);

			return ProductEntity.fromObject({
				...product,
				purchasePrice: !product.purchaseDetail[0] ? 0 : product.purchaseDetail[0].unitPrice.toNumber()
			});
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener el producto con id ${id}: ${error}`);
		}
	}

	async create(dto: CreateProductDto): Promise<ProductEntity> {
		try {
			const product = await prisma.product.create({
				data: dto,
				include: {
					category: { select: { id: true, name: true } },
					material: { select: { id: true, name: true } },
					purchaseDetail: {
						select: { unitPrice: true },
						orderBy: { purchase: { createdAt: 'desc' } },
						take: 1
					}
				}
			});

			return ProductEntity.fromObject({
				...product,
				purchasePrice: !product.purchaseDetail[0] ? 0 : product.purchaseDetail[0].unitPrice.toNumber()
			});
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al crear el producto: ${error}`);
		}
	}

	async update(dto: UpdateProductDto): Promise<ProductEntity> {
		try {
			const { id } = await this.getById(dto.id);

			const product = await prisma.product.update({
				where: { id },
				data: dto,
				include: {
					category: { select: { id: true, name: true } },
					material: { select: { id: true, name: true } },
					purchaseDetail: {
						select: { unitPrice: true },
						orderBy: { purchase: { createdAt: 'desc' } },
						take: 1
					}
				}
			});

			return ProductEntity.fromObject({
				...product,
				purchasePrice: !product.purchaseDetail[0] ? 0 : product.purchaseDetail[0].unitPrice.toNumber()
			});
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al actualizar el producto con id ${dto.id}: ${error}`);
		}
	}

	async delete(id: number): Promise<ProductEntity> {
		try {
			const { id: productId } = await this.getById(id);
			const deletedProduct = await prisma.product.delete({
				where: { id: productId },
				include: {
					category: { select: { id: true, name: true } },
					material: { select: { id: true, name: true } },
					purchaseDetail: {
						select: { unitPrice: true },
						orderBy: { purchase: { createdAt: 'desc' } },
						take: 1
					}
				}
			});
			return ProductEntity.fromObject({
				...deletedProduct,
				purchasePrice: !deletedProduct.purchaseDetail[0] ? 0 : deletedProduct.purchaseDetail[0].unitPrice.toNumber()
			});
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar el producto con id ${id}: ${error}`);
		}
	}
}
