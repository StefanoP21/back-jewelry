import { CustomError, ZERO } from '../../../../core';

export class UserEntity {
	constructor(
		public id: string,
		public name: string,
		public lastname: string,
		public email: string,
		public password: string
	) {}

	// TODO: REQVIEW TYPE
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static fromObject(object: Record<string, any>): UserEntity {
		const { id, name, lastname, email, password } = object;

		if (!id)
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);

		if (!name || name.length === ZERO)
			throw CustomError.badRequest('This entity requires a name', [
				{ constraint: 'name is required', fields: ['name'] }
			]);

		if (!lastname || lastname.length === ZERO)
			throw CustomError.badRequest('This entity requires a lastname', [
				{ constraint: 'lastname is required', fields: ['lastname'] }
			]);

		if (!email || email.length === ZERO)
			throw CustomError.badRequest('This entity requires an email', [
				{ constraint: 'email is required', fields: ['email'] }
			]);

		if (!password || password.length === ZERO)
			throw CustomError.badRequest('This entity requires a password', [
				{ constraint: 'password is required', fields: ['password'] }
			]);

		return new UserEntity(id, name, lastname, email, password);
	}
}
