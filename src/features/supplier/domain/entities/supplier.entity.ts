import { CustomError, ZERO, REGEX_EMAIL, REGEX_PHONE, REGEX_RUC } from '../../../../core';

interface SupplierEntityProps {
	id: number;
	nameContact: string;
	email: string;
	phone: string;
	companyName: string;
	ruc: string;
}

export class SupplierEntity {
	constructor(
		public readonly id: number,
		public readonly nameContact: string,
		public readonly email: string,
		public readonly phone: string,
		public readonly companyName: string,
		public readonly ruc: string
	) {}

	static fromObject(object: SupplierEntityProps): SupplierEntity {
		const { id, nameContact, email, phone, companyName, ruc } = object;

		if (!id) {
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}

		if (!nameContact || nameContact.length === ZERO) {
			throw CustomError.badRequest('This entity requires a nameContact', [
				{ constraint: 'nameContact is required', fields: ['nameContact'] }
			]);
		}

		if (!email || email.length === ZERO || !REGEX_EMAIL.test(email)) {
			throw CustomError.badRequest('This entity requires an email', [
				{ constraint: 'email is required', fields: ['email'] }
			]);
		}

		if (!phone || phone.length === ZERO || !REGEX_PHONE.test(phone)) {
			throw CustomError.badRequest('This entity requires a phone', [
				{ constraint: 'phone is required', fields: ['phone'] }
			]);
		}

		if (!companyName || companyName.length === ZERO) {
			throw CustomError.badRequest('This entity requires a companyName', [
				{ constraint: 'companyName is required', fields: ['companyName'] }
			]);
		}

		if (!ruc || ruc.length === ZERO || !REGEX_RUC.test(ruc)) {
			throw CustomError.badRequest('This entity requires a ruc', [{ constraint: 'ruc is required', fields: ['ruc'] }]);
		}

		return new SupplierEntity(id, nameContact, email, phone, companyName, ruc);
	}
}
