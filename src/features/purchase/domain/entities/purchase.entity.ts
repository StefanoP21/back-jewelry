import { CustomError, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';

interface PurchaseDetailEntityProps {
	id: number;
	purchaseId: number;
	productId: number;
	quantity: number;
	unitPrice: Decimal;
}

interface PurchaseEntityProps {
	id: number;
	supplierId: number;
	date: Date;
	total: Decimal;
	purchaseDetail: PurchaseDetailEntityProps[];
}

export class PurchaseEntity {
	constructor(
		public readonly id: number,
		public readonly supplierId: number,
		public readonly date: Date,
		public readonly total: Decimal,
		public readonly purchaseDetail: PurchaseDetailEntityProps[]
	) {}

	static fromObject(object: PurchaseEntityProps): PurchaseEntity {
		const { id, supplierId, date, total, purchaseDetail } = object;

		if (!id)
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);

		if (!supplierId)
			throw CustomError.badRequest('This entity requires a supplierId', [
				{ constraint: 'supplierId is required', fields: ['supplierId'] }
			]);

		if (!date)
			throw CustomError.badRequest('This entity requires a date', [
				{ constraint: 'date is required', fields: ['date'] }
			]);

		if (!total || parseFloat(total.toString()) <= ZERO)
			throw CustomError.badRequest('This entity requires a total', [
				{ constraint: 'total is required', fields: ['total'] }
			]);

		if (!purchaseDetail || purchaseDetail.length === ZERO)
			throw CustomError.badRequest('This entity requires purchaseDetail', [
				{ constraint: 'purchaseDetail is required', fields: ['purchaseDetail'] }
			]);

		purchaseDetail.forEach((product) => {
			if (!product.productId)
				throw CustomError.badRequest('purchaseDetail entities requires a productId', [
					{ constraint: 'product.productId is required', fields: ['product.productId'] }
				]);

			if (!product.quantity || product.quantity <= ZERO)
				throw CustomError.badRequest('purchaseDetail entities requires a quantity', [
					{ constraint: 'product.quantity is required', fields: ['product.quantity'] }
				]);

			if (!product.unitPrice || parseFloat(product.unitPrice.toString()) <= ZERO)
				throw CustomError.badRequest('purchaseDetail entities requires a unitPrice', [
					{ constraint: 'product.unitPrice is required', fields: ['product.unitPrice'] }
				]);

			if (!product.id)
				throw CustomError.badRequest('purchaseDetail entities requires an id', [
					{ constraint: 'product.id is required', fields: ['product.id'] }
				]);

			if (!product.purchaseId)
				throw CustomError.badRequest('purchaseDetail entities requires a purchaseId', [
					{ constraint: 'product.purchaseId is required', fields: ['product.purchaseId'] }
				]);
		});

		return new PurchaseEntity(id, supplierId, date, total, purchaseDetail);
	}
}
