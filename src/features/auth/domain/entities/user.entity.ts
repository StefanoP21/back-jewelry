import { CustomError, Role, ZERO } from '../../../../core';

interface UserEntityProps {
	id: number;
	name: string;
	lastname: string;
	email: string;
	dni: string;
	password: string;
	role: Role;
	status: boolean;
}
export class UserEntity {
	constructor(
		public id: number,
		public name: string,
		public lastname: string,
		public email: string,
		public dni: string,
		public password: string,
		public role: Role,
		public status: boolean
	) {}

	static fromObject(object: UserEntityProps): UserEntity {
		const { id, name, lastname, email, dni, password, role, status } = object;

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

		if (!dni || dni.length === ZERO)
			throw CustomError.badRequest('This entity requires a dni', [{ constraint: 'dni is required', fields: ['dni'] }]);

		if (!password || password.length === ZERO)
			throw CustomError.badRequest('This entity requires a password', [
				{ constraint: 'password is required', fields: ['password'] }
			]);

		if (!role || role.length === ZERO)
			throw CustomError.badRequest('This entity requires a role', [
				{ constraint: 'role is required', fields: ['role'] }
			]);

		if (status === undefined)
			throw CustomError.badRequest('This entity requires a status', [
				{ constraint: 'status is required', fields: ['status'] }
			]);

		return new UserEntity(id, name, lastname, email, dni, password, role, status);
	}
}
