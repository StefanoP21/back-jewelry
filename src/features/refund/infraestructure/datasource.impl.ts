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
					purchase: {
						select: {
							bill: true,
							supplier: {
								select: {
									id: true,
									nameContact: true,
									companyName: true,
									email: true,
									phone: true,
									ruc: true
								}
							}
						}
					},
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									unitPrice: true,
									quantity: true,
									product: {
										select: {
											image: true,
											name: true,
											description: true
										}
									}
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

				await prisma.purchaseDetail.update({
					where: { id: product.purchaseDetail.id },
					data: {
						quantity: {
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
					purchase: {
						select: {
							bill: true,
							supplier: {
								select: {
									id: true,
									nameContact: true,
									companyName: true,
									email: true,
									phone: true,
									ruc: true
								}
							}
						}
					},
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									unitPrice: true,
									quantity: true,
									product: {
										select: {
											image: true,
											name: true,
											description: true
										}
									}
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
					purchase: {
						select: {
							bill: true,
							supplier: {
								select: {
									id: true,
									nameContact: true,
									companyName: true,
									email: true,
									phone: true,
									ruc: true
								}
							}
						}
					},
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									unitPrice: true,
									quantity: true,
									product: {
										select: {
											image: true,
											name: true,
											description: true
										}
									}
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
					purchase: {
						select: {
							bill: true,
							supplier: {
								select: {
									id: true,
									nameContact: true,
									companyName: true,
									email: true,
									phone: true,
									ruc: true
								}
							}
						}
					},
					refundDetail: {
						include: {
							purchaseDetail: {
								select: {
									id: true,
									productId: true,
									unitPrice: true,
									quantity: true,
									product: {
										select: {
											image: true,
											name: true,
											description: true
										}
									}
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

				await prisma.purchaseDetail.update({
					where: { id: product.purchaseDetail.id },
					data: {
						quantity: {
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
