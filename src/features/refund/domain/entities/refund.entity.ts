import { CustomError, EIGHT, REGEX_DNI, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';
import { SupplierDetailPurchaseEntityProps as SupplierDetailPurchaseEntity } from '../../../purchase/domain/entities/purchase.entity';

interface PurchaseDetailEntityProps {
	id: number;
	productId: number;
	unitPrice: Decimal;
	quantity: number;
}

interface PurchaseRefundEntityProps {
	bill: string;
	supplier: SupplierDetailPurchaseEntity;
}

interface RefundDetailEntityProps {
	id: number;
	refundId: number;
	purchaseDetailId: number;
	purchaseDetail: PurchaseDetailEntityProps;
	quantity: number;
}

interface RefundEntityProps {
	id: number;
	purchaseId: number;
	purchase: PurchaseRefundEntityProps;
	date: Date;
	comment: string;
	userDNI: string;
	refundDetail: RefundDetailEntityProps[];
}

export class RefundEntity {
	constructor(
		public readonly id: number,
		public readonly purchaseId: number,
		public readonly purchase: PurchaseRefundEntityProps,
		public readonly date: Date,
		public readonly comment: string,
		public readonly userDNI: string,
		public readonly refundDetail: RefundDetailEntityProps[]
	) {}

	static fromObject(object: RefundEntityProps): RefundEntity {
		const { id, purchaseId, purchase, date, comment, userDNI, refundDetail } = object;

		if (!id)
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);

		if (!purchaseId)
			throw CustomError.badRequest('This entity requires a purchaseId', [
				{ constraint: 'purchaseId is required', fields: ['purchaseId'] }
			]);

		if (!purchase)
			throw CustomError.badRequest('This entity requires a purchase', [
				{ constraint: 'purchase is required', fields: ['purchase'] }
			]);

		if (!date)
			throw CustomError.badRequest('This entity requires a date', [
				{ constraint: 'date is required', fields: ['date'] }
			]);

		if (!comment || comment.length === ZERO)
			throw CustomError.badRequest('This entity requires a comment', [
				{ constraint: 'comment is required', fields: ['comment'] }
			]);

		if (!userDNI || userDNI.length !== EIGHT || !REGEX_DNI.test(userDNI))
			throw CustomError.badRequest('This entity requires a userDNI', [
				{ constraint: 'userDNI is required', fields: ['userDNI'] }
			]);

		if (!refundDetail || refundDetail.length === ZERO)
			throw CustomError.badRequest('This entity requires refundDetail', [
				{ constraint: 'refundDetail is required', fields: ['refundDetail'] }
			]);

		refundDetail.forEach((product) => {
			if (!product.id || product.id <= ZERO)
				throw CustomError.badRequest('This entity requires an id', [
					{ constraint: 'product.id is required', fields: ['product.id'] }
				]);

			if (!product.refundId || product.refundId <= ZERO)
				throw CustomError.badRequest('This entity requires a refundId', [
					{ constraint: 'product.refundId is required', fields: ['product.refundId'] }
				]);

			if (!product.purchaseDetailId || product.purchaseDetailId <= ZERO)
				throw CustomError.badRequest('This entity requires a purchaseDetailId', [
					{ constraint: 'product.purchaseDetailId is required', fields: ['product.purchaseDetailId'] }
				]);

			if (!product.quantity || product.quantity <= ZERO)
				throw CustomError.badRequest('This entity requires a quantity', [
					{ constraint: 'product.quantity is required', fields: ['product.quantity'] }
				]);
		});

		return new RefundEntity(id, purchaseId, purchase, date, comment, userDNI, refundDetail);
	}
}
