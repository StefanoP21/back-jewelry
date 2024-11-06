import { CustomError, EIGHT, REGEX_DNI, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';

interface PurchaseDetailEntityProps {
	id: number;
	purchaseId: number;
	productId: number;
	quantity: number;
	unitPrice: Decimal;
	profit: Decimal;
}

export interface SupplierDetailPurchaseEntityProps {
	id: number;
	nameContact: string;
	companyName: string;
	email: string;
	phone: string;
	ruc: string;
}

interface PurchaseEntityProps {
	id: number;
	supplierId: number;
	supplier: SupplierDetailPurchaseEntityProps;
	date: Date;
	total: Decimal;
	bill: string;
	userDNI: string;
	purchaseDetail: PurchaseDetailEntityProps[];
}

export class PurchaseEntity {
	constructor(
		public readonly id: number,
		public readonly supplierId: number,
		public readonly supplier: SupplierDetailPurchaseEntityProps,
		public readonly date: Date,
		public readonly total: Decimal,
		public readonly bill: string,
		public readonly userDNI: string,
		public readonly purchaseDetail: PurchaseDetailEntityProps[]
	) {}

	static fromObject(object: PurchaseEntityProps): PurchaseEntity {
		const { id, supplierId, supplier, date, total, bill, userDNI, purchaseDetail } = object;

		if (!id)
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);

		if (!supplierId)
			throw CustomError.badRequest('This entity requires a supplierId', [
				{ constraint: 'supplierId is required', fields: ['supplierId'] }
			]);

		if (!supplier)
			throw CustomError.badRequest('This entity requires a supplier', [
				{ constraint: 'supplier is required', fields: ['supplier'] }
			]);

		if (!date)
			throw CustomError.badRequest('This entity requires a date', [
				{ constraint: 'date is required', fields: ['date'] }
			]);

		if (!total || parseFloat(total.toString()) <= ZERO)
			throw CustomError.badRequest('This entity requires a total', [
				{ constraint: 'total is required', fields: ['total'] }
			]);

		if (!bill || bill.length === ZERO)
			throw CustomError.badRequest('This entity requires a bill', [
				{ constraint: 'bill is required', fields: ['bill'] }
			]);

		if (!userDNI || userDNI.length !== EIGHT || !REGEX_DNI.test(userDNI))
			throw CustomError.badRequest('This entity requires a userDNI', [
				{ constraint: 'userDNI is required', fields: ['userDNI'] }
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

			if (!product.profit || parseFloat(product.profit.toString()) <= ZERO)
				throw CustomError.badRequest('purchaseDetail entities requires a profit', [
					{ constraint: 'product.profit is required', fields: ['product.profit'] }
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

		return new PurchaseEntity(id, supplierId, supplier, date, total, bill, userDNI, purchaseDetail);
	}
}
