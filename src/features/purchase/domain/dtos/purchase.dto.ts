import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';
import { type CoreDto } from '../../../shared';

interface PurchaseDetailDtoProps {
	productId: number;
	quantity: number;
	unitPrice: Decimal;
}

interface PurchaseDtoProps {
	supplierId: number;
	total: Decimal;
	purchaseDetail: PurchaseDetailDtoProps[];
}

export class PurchaseDto implements CoreDto<PurchaseDto> {
	private constructor(
		public readonly supplierId: number,
		public readonly total: Decimal,
		public readonly purchaseDetail: PurchaseDetailDtoProps[]
	) {
		this.validate(this);
	}

	public validate(dto: PurchaseDto): void {
		const errors: ValidationType[] = [];
		const { supplierId, total, purchaseDetail } = dto;

		if (!supplierId || supplierId <= ZERO)
			errors.push({
				constraint: 'El proveedor es obligatorio',
				fields: ['supplierId']
			});

		if (!total || parseFloat(total.toString()) < ZERO)
			errors.push({
				constraint: 'El total es obligatorio',
				fields: ['total']
			});

		if (!purchaseDetail || purchaseDetail.length === ZERO)
			errors.push({
				constraint: 'Los productos son obligatorios',
				fields: ['purchaseDetail']
			});

		purchaseDetail.forEach((product) => {
			if (!product.productId)
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

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la compra al proveedor', errors);
	}

	static create(object: PurchaseDtoProps): PurchaseDto {
		const { supplierId, total, purchaseDetail } = object;

		return new PurchaseDto(supplierId, total, purchaseDetail);
	}
}
