import { CustomError, PaymentMethod, type ValidationType, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';
import { type CoreDto } from '../../../shared';

interface OrderDetailDtoProps {
	productId: number;
	quantity: number;
	unitPrice: Decimal;
}

interface OrderDtoProps {
	customerId: number;
	userId: number;
	paymentMethod: PaymentMethod;
	totalDesc: Decimal;
	total: Decimal;
	orderDetail: OrderDetailDtoProps[];
}

export class OrderDto implements CoreDto<OrderDtoProps> {
	private constructor(
		public readonly customerId: number,
		public readonly userId: number,
		public readonly paymentMethod: PaymentMethod,
		public readonly totalDesc: Decimal,
		public readonly total: Decimal,
		public readonly orderDetail: OrderDetailDtoProps[]
	) {
		this.validate(this);
	}

	public validate(dto: OrderDto): void {
		const errors: ValidationType[] = [];
		const { customerId, userId, paymentMethod, totalDesc, total, orderDetail } = dto;

		if (!customerId || customerId <= ZERO)
			errors.push({
				constraint: 'El cliente es obligatorio',
				fields: ['customerId']
			});

		if (!userId || userId <= ZERO)
			errors.push({
				constraint: 'El usuario es obligatorio',
				fields: ['userId']
			});

		const validPaymentMethods = ['CASH', 'CARD', 'YAPE', 'PLIN', 'TRANSFER'];
		if (!paymentMethod || !validPaymentMethods.includes(paymentMethod))
			errors.push({
				constraint: 'El metodo de pago es obligatorio',
				fields: ['paymentMethod']
			});

		if (totalDesc == undefined || parseFloat(totalDesc.toString()) < ZERO)
			errors.push({
				constraint: 'El total con descuento es obligatorio',
				fields: ['totalDesc']
			});

		if (!total || parseFloat(total.toString()) < ZERO)
			errors.push({
				constraint: 'El total es obligatorio',
				fields: ['total']
			});

		if (!orderDetail || orderDetail.length === ZERO)
			errors.push({
				constraint: 'El detalle de la orden es obligatorio',
				fields: ['orderDetail']
			});

		orderDetail.forEach((product) => {
			if (!product.productId || product.productId <= ZERO)
				errors.push({
					constraint: 'El producto es obligatorio',
					fields: ['product.productId']
				});

			if (!product.quantity || product.quantity <= ZERO)
				errors.push({
					constraint: 'La cantidad es obligatoria',
					fields: ['product.quantity']
				});

			if (!product.unitPrice || parseFloat(product.unitPrice.toString()) < ZERO)
				errors.push({
					constraint: 'El precio unitario es obligatorio',
					fields: ['product.unitPrice']
				});
		});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la orden', errors);
	}

	static create(dto: OrderDtoProps): OrderDto {
		const { customerId, userId, paymentMethod, totalDesc, total, orderDetail } = dto;

		return new OrderDto(customerId, userId, paymentMethod, totalDesc, total, orderDetail);
	}
}
