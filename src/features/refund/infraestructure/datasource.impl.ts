import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { RefundEntity, type RefundDatasource, type RefundDto } from '../domain';

export class RefundDatasourceImpl implements RefundDatasource {
	constructor() {}

	async create(dto: RefundDto): Promise<RefundEntity> {
		try {
			const refunds = await prisma.refund.create({
				data: {
					purchaseId: dto.purchaseId,
					comment: dto.comment,
					userDNI: dto.userDNI,
					refundDetail: {
						create: dto.refundDetail
					}
				},
				include: {
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									quantity: true,
									unitPrice: true
								}
							}
						}
					}
				}
			});

			for (const product of refunds.refundDetail) {
				await prisma.product.update({
					where: { id: product.purchaseDetail.productId },
					data: {
						stock: {
							decrement: product.quantity
						}
					}
				});
			}

			return RefundEntity.fromObject(refunds);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al crear la devolución: ${error}`);
		}
	}
	async getAll(): Promise<RefundEntity[]> {
		try {
			const refunds = await prisma.refund.findMany({
				include: {
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									quantity: true,
									unitPrice: true
								}
							}
						}
					}
				},
				orderBy: { createdAt: 'desc' }
			});

			return refunds.map((refund) => RefundEntity.fromObject(refund));
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener las devoluciones: ${error}`);
		}
	}

	async getById(id: number): Promise<RefundEntity> {
		try {
			const refund = await prisma.refund.findUnique({
				where: { id },
				include: {
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									quantity: true,
									unitPrice: true
								}
							}
						}
					}
				}
			});

			if (!refund) throw CustomError.notFound(ErrorMessages.REFUND_NOT_FOUND);

			return RefundEntity.fromObject(refund);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener las devoluciones: ${error}`);
		}
	}

	async delete(id: number): Promise<RefundEntity> {
		try {
			const { id: refundId } = await this.getById(id);

			const refund = await prisma.refund.delete({
				where: { id: refundId },
				include: {
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									quantity: true,
									unitPrice: true
								}
							}
						}
					}
				}
			});

			for (const product of refund.refundDetail) {
				await prisma.product.update({
					where: { id: product.purchaseDetail.productId },
					data: {
						stock: {
							increment: product.quantity
						}
					}
				});
			}

			return RefundEntity.fromObject(refund);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar la devolución: ${error}`);
		}
	}
}
