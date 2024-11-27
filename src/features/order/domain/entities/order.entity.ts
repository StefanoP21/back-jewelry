import { CustomError, PaymentMethod, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';
import { CustomerEntity } from '../../../customer/domain';

interface OrderDetailEntityProps {
	id: number;
	orderId: number;
	productId: number;
	quantity: number;
	unitPrice: Decimal;
}

interface OrderEntityProps {
	id: number;
	customerId: number;
	customer: Partial<CustomerEntity>;
	userId: number;
	date: Date;
	paymentMethod: PaymentMethod;
	totalDesc: Decimal;
	total: Decimal;
	orderDetail: OrderDetailEntityProps[];
}

export class OrderEntity {
	constructor(
		public readonly id: number,
		public readonly customerId: number,
		public readonly customer: Partial<CustomerEntity>,
		public readonly userId: number,
		public readonly date: Date,
		public readonly paymentMethod: PaymentMethod,
		public readonly totalDesc: Decimal,
		public readonly total: Decimal,
		public readonly orderDetail: OrderDetailEntityProps[]
	) {}

	public static fromObject(object: OrderEntityProps): OrderEntity {
		const { id, customerId, userId, customer, date, paymentMethod, totalDesc, total, orderDetail } = object;

		if (!id)
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);

		if (!customerId)
			throw CustomError.badRequest('This entity requires a customerId', [
				{ constraint: 'customerId is required', fields: ['customerId'] }
			]);

		if (!userId)
			throw CustomError.badRequest('This entity requires a userId', [
				{ constraint: 'userId is required', fields: ['userId'] }
			]);

		if (!date)
			throw CustomError.badRequest('This entity requires a date', [
				{ constraint: 'date is required', fields: ['date'] }
			]);

		if (!paymentMethod || paymentMethod.length === ZERO)
			throw CustomError.badRequest('This entity requires a paymentMethod', [
				{ constraint: 'paymentMethod is required', fields: ['paymentMethod'] }
			]);

		if (totalDesc == undefined || parseFloat(totalDesc.toString()) < ZERO)
			throw CustomError.badRequest('This entity requires a totalDesc', [
				{ constraint: 'totalDesc is required', fields: ['totalDesc'] }
			]);

		if (!total || parseFloat(total.toString()) < ZERO)
			throw CustomError.badRequest('This entity requires a total', [
				{ constraint: 'total is required', fields: ['total'] }
			]);

		if (!orderDetail || orderDetail.length === ZERO)
			throw CustomError.badRequest('This entity requires a orderDetail', [
				{ constraint: 'orderDetail is required', fields: ['orderDetail'] }
			]);

		orderDetail.forEach((orderDetail) => {
			if (!orderDetail.id)
				throw CustomError.badRequest('orderDetail entity requires an id', [
					{ constraint: 'orderDetail.id is required', fields: ['id'] }
				]);

			if (!orderDetail.orderId)
				throw CustomError.badRequest('orderDetail entity requires an orderId', [
					{ constraint: 'orderDetail.orderId is required', fields: ['orderId'] }
				]);

			if (!orderDetail.productId)
				throw CustomError.badRequest('orderDetail entity requires a productId', [
					{ constraint: 'orderDetail.productId is required', fields: ['productId'] }
				]);

			if (!orderDetail.quantity || orderDetail.quantity <= ZERO)
				throw CustomError.badRequest('orderDetail entity requires a quantity', [
					{ constraint: 'orderDetail.quantity is required', fields: ['quantity'] }
				]);

			if (!orderDetail.unitPrice || parseFloat(orderDetail.unitPrice.toString()) <= ZERO)
				throw CustomError.badRequest('orderDetail entity requires a unitPrice', [
					{ constraint: 'orderDetail.unitPrice is required', fields: ['unitPrice'] }
				]);
		});

		return new OrderEntity(id, customerId, customer, userId, date, paymentMethod, totalDesc, total, orderDetail);
	}
}
