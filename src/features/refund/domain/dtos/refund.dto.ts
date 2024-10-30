import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface RefundDetailDtoProps {
	purchaseDetailId: number;
	quantity: number;
}

interface RefundDtoProps {
	purchaseId: number;
	comment: string;
	refundDetail: RefundDetailDtoProps[];
}

export class RefundDto implements CoreDto<RefundDto> {
	private constructor(
		public readonly purchaseId: number,
		public readonly comment: string,
		public readonly refundDetail: RefundDetailDtoProps[]
	) {
		this.validate(this);
	}

	validate(dto: RefundDto): void {
		const errors: ValidationType[] = [];
		const { purchaseId, comment, refundDetail } = dto;

		if (!purchaseId || purchaseId <= ZERO)
			errors.push({
				constraint: 'La compra es obligatoria',
				fields: ['purchaseId']
			});

		if (!comment || comment.length === ZERO)
			errors.push({
				constraint: 'El comentario es obligatorio',
				fields: ['comment']
			});

		if (!refundDetail || refundDetail.length === ZERO)
			errors.push({
				constraint: 'Los detalles de la devolución son obligatorios',
				fields: ['refundDetail']
			});

		refundDetail.forEach((product) => {
			if (!product.purchaseDetailId || product.purchaseDetailId <= ZERO)
				errors.push({
					constraint: 'El detalle de la compra es obligatorio',
					fields: ['purchaseDetailId']
				});

			if (!product.quantity || product.quantity <= ZERO)
				errors.push({
					constraint: 'La cantidad es obligatoria',
					fields: ['quantity']
				});
		});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la devolución', errors);
	}

	static create(object: RefundDtoProps): RefundDto {
		const { purchaseId, comment, refundDetail } = object;

		return new RefundDto(purchaseId, comment, refundDetail);
	}
}
