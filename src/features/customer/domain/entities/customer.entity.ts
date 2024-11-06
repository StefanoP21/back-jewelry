import { CustomError, ZERO, REGEX_EMAIL, REGEX_DNI, REGEX_PHONE } from '../../../../core';

interface CustomerEntityProps {
	id: number;
	name: string;
	lastName: string;
	email: string;
	dni: string;
	phone: string;
}

export class CustomerEntity {
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly lastName: string,
		public readonly email: string,
		public readonly dni: string,
		public readonly phone: string
	) {}

	static fromObject(object: CustomerEntityProps): CustomerEntity {
		const { id, name, lastName, email, dni, phone } = object;

		if (!id) {
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);
		}

		if (!name || name.length === ZERO) {
			throw CustomError.badRequest('This entity requires a name', [
				{ constraint: 'name is required', fields: ['name'] }
			]);
		}

		if (!lastName || lastName.length === ZERO) {
			throw CustomError.badRequest('This entity requires a lastName', [
				{ constraint: 'lastName is required', fields: ['lastName'] }
			]);
		}

		if (!email || email.length === ZERO || !REGEX_EMAIL.test(email)) {
			throw CustomError.badRequest('This entity requires an email', [
				{ constraint: 'email is required', fields: ['email'] }
			]);
		}

		if (!dni || dni.length === ZERO || !REGEX_DNI.test(dni)) {
			throw CustomError.badRequest('This entity requires a dni', [{ constraint: 'dni is required', fields: ['dni'] }]);
		}

		if (!phone || phone.length === ZERO || !REGEX_PHONE.test(phone)) {
			throw CustomError.badRequest('This entity requires a phone', [
				{ constraint: 'phone is required', fields: ['phone'] }
			]);
		}

		return new CustomerEntity(id, name, lastName, email, dni, phone);
	}
}
