import { CustomError, ZERO } from '../../../../core';

type Role = 'ADMIN' | 'USER';

interface UserEntityProps {
	id: number;
	name: string;
	lastname: string;
	dni: string;
	password: string;
	role: Role;
}
export class UserEntity {
	constructor(
		public id: number,
		public name: string,
		public lastname: string,
		public dni: string,
		public password: string,
		public role: Role
	) {}

	static fromObject(object: UserEntityProps): UserEntity {
		const { id, name, lastname, dni, password, role } = object;

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

		if (!dni || dni.length === ZERO)
			throw CustomError.badRequest('This entity requires an dni', [{ constraint: 'dni is required', fields: ['dni'] }]);

		if (!password || password.length === ZERO)
			throw CustomError.badRequest('This entity requires a password', [
				{ constraint: 'password is required', fields: ['password'] }
			]);

		if (!role || role.length === ZERO)
			throw CustomError.badRequest('This entity requires a role', [
				{ constraint: 'role is required', fields: ['role'] }
			]);

		return new UserEntity(id, name, lastname, dni, password, role);
	}
}
