import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { PurchaseEntity, type PurchaseDatasource, type PurchaseDto } from '../domain';

export class PurchaseDatasourceImpl implements PurchaseDatasource {
	constructor() {}

	async getAll(): Promise<PurchaseEntity[]> {
		try {
			const purchases = await prisma.purchase.findMany({
				include: {
					supplier: {
						select: {
							id: true,
							nameContact: true,
							companyName: true,
							email: true,
							phone: true,
							ruc: true
						}
					},
					purchaseDetail: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true
								}
							}
						}
					}
				},
				orderBy: { createdAt: 'desc' }
			});

			return purchases.map((purchase) => PurchaseEntity.fromObject(purchase));
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener las compras: ${error}`);
		}
	}

	async getById(id: number): Promise<PurchaseEntity> {
		try {
			const purchase = await prisma.purchase.findUnique({
				where: { id },
				include: {
					supplier: {
						select: {
							id: true,
							nameContact: true,
							companyName: true,
							email: true,
							phone: true,
							ruc: true
						}
					},
					purchaseDetail: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true
								}
							}
						}
					}
				}
			});

			if (!purchase) throw CustomError.notFound(ErrorMessages.PURCHASE_NOT_FOUND);

			return PurchaseEntity.fromObject(purchase);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener la compra con id ${id}: ${error}`);
		}
	}

	async create(dto: PurchaseDto): Promise<PurchaseEntity> {
		try {
			const purchase = await prisma.purchase.create({
				data: {
					supplierId: dto.supplierId,
					total: dto.total,
					bill: dto.bill,
					userDNI: dto.userDNI,
					purchaseDetail: {
						create: dto.purchaseDetail
					}
				},
				include: {
					supplier: {
						select: {
							id: true,
							nameContact: true,
							companyName: true,
							email: true,
							phone: true,
							ruc: true
						}
					},
					purchaseDetail: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true
								}
							}
						}
					}
				}
			});

			for (const product of dto.purchaseDetail) {
				await prisma.product.update({
					where: { id: product.productId },
					data: {
						stock: {
							increment: product.quantity
						}
					}
				});
			}

			return PurchaseEntity.fromObject(purchase);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al crear la compra: ${error}`);
		}
	}

	async delete(id: number): Promise<PurchaseEntity> {
		try {
			const { id: purchaseId } = await this.getById(id);

			const refunds = await prisma.refund.findMany({ where: { purchaseId } });
			if (refunds.length > 0) {
				throw CustomError.badRequest(
					`La compra con id ${purchaseId} tiene devoluciones registradas y no puede ser eliminado.`
				);
			}

			const deletedPurchase = await prisma.purchase.delete({
				where: { id: purchaseId },
				include: {
					supplier: {
						select: {
							id: true,
							nameContact: true,
							companyName: true,
							email: true,
							phone: true,
							ruc: true
						}
					},
					purchaseDetail: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true
								}
							}
						}
					}
				}
			});

			for (const product of deletedPurchase.purchaseDetail) {
				await prisma.product.update({
					where: { id: product.productId },
					data: {
						stock: {
							decrement: product.quantity
						}
					}
				});
			}

			return PurchaseEntity.fromObject(deletedPurchase);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar la compra con id ${id}: ${error}`);
		}
	}
}
