import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { OrderEntity, type OrderDatasource, type OrderDto } from '../domain';

export class OrderDatasourceImpl implements OrderDatasource {
	constructor() {}

	async getAll(): Promise<OrderEntity[]> {
		try {
			const orders = await prisma.order.findMany({
				include: {
					customer: {
						select: {
							name: true,
							lastName: true,
							email: true,
							dni: true,
							phone: true
						}
					},
					orderDetail: {
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

			return orders.map((order) => OrderEntity.fromObject(order));
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener las ventas: ${error}`);
		}
	}

	async getById(id: number): Promise<OrderEntity> {
		try {
			const order = await prisma.order.findUnique({
				where: { id },
				include: {
					customer: {
						select: {
							name: true,
							lastName: true,
							email: true,
							dni: true,
							phone: true
						}
					},
					orderDetail: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true,
									stock: true,
									price: true
								}
							}
						}
					}
				}
			});

			if (!order) throw CustomError.notFound(ErrorMessages.ORDER_NOT_FOUND);

			return OrderEntity.fromObject(order);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener la venta con id ${id}: ${error}`);
		}
	}

	async create(dto: OrderDto): Promise<OrderEntity> {
		try {
			const order = await prisma.order.create({
				data: {
					customerId: dto.customerId,
					userId: dto.userId,
					paymentMethod: dto.paymentMethod,
					total: dto.total,
					totalDesc: dto.totalDesc,
					orderDetail: {
						create: dto.orderDetail
					}
				},
				include: {
					customer: {
						select: {
							name: true,
							lastName: true,
							email: true,
							dni: true,
							phone: true
						}
					},
					orderDetail: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true,
									stock: true,
									price: true
								}
							}
						}
					}
				}
			});

			for (const detail of order.orderDetail) {
				const updatedProduct = await prisma.product.update({
					where: { id: detail.productId },
					data: { stock: { decrement: detail.quantity } }
				});

				if (updatedProduct.stock === 0) {
					await prisma.product.update({
						where: { id: updatedProduct.id },
						data: { price: { set: 0 } }
					});
				}
			}

			return OrderEntity.fromObject(order);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener las compras: ${error}`);
		}
	}

	async delete(id: number): Promise<OrderEntity> {
		try {
			const { id: orderId } = await this.getById(id);

			const order = await prisma.order.delete({
				where: { id: orderId },
				include: {
					customer: {
						select: {
							name: true,
							lastName: true,
							email: true,
							dni: true,
							phone: true
						}
					},
					orderDetail: {
						include: {
							product: {
								select: {
									id: true,
									name: true,
									image: true,
									stock: true,
									price: true
								}
							}
						}
					}
				}
			});

			for (const detail of order.orderDetail) {
				await prisma.product.update({
					where: { id: detail.productId },
					data: { stock: { increment: detail.quantity } }
				});
			}

			return OrderEntity.fromObject(order);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar la venta con id ${id}: ${error}`);
		}
	}
}
