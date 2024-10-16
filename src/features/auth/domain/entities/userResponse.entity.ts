import { CustomError, ZERO } from '../../../../core';
import { UserEntity } from './user.entity';

export class UserResponseEntity {
	constructor(public readonly user: Omit<UserEntity, 'password'>) {}

	static fromObject(object: Omit<UserEntity, 'password'>): UserResponseEntity {
		const { id, name, lastname, email, dni, role } = object;

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

		if (!role || role.length === ZERO)
			throw CustomError.badRequest('This entity requires a role', [
				{ constraint: 'role is required', fields: ['role'] }
			]);

		return new UserResponseEntity({ id, name, lastname, email, dni, role });
	}
}
