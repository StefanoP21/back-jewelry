import { CustomError, EIGHT, SIX, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

type Role = 'ADMIN' | 'USER';

interface RegisterUserDtoProps {
	name: string;
	lastname: string;
	dni: string;
	password: string;
	role: Role;
}

export class RegisterUserDto implements CoreDto<RegisterUserDto> {
	private constructor(
		public readonly name: string,
		public readonly lastname: string,
		public readonly dni: string,
		public readonly password: string,
		public readonly role: Role
	) {
		this.validate(this);
	}

	public validate(dto: RegisterUserDto): void {
		const errors: ValidationType[] = [];
		const { name, lastname, dni, password, role } = dto;

		if (!name || name.length === ZERO)
			errors.push({
				constraint: 'El nombre es obligatorio',
				fields: ['name']
			});

		if (!lastname || lastname.length === ZERO)
			errors.push({
				constraint: 'El nombre es obligatorio',
				fields: ['lastname']
			});

		if (!dni || dni.length !== EIGHT)
			errors.push({
				constraint: 'El dni no es válido',
				fields: ['dni']
			});

		if (!password || password.length < SIX)
			errors.push({
				constraint: 'La contraseña no es válida',
				fields: ['password']
			});

		const validRoles = ['ADMIN', 'USER'];
		if (!role || !validRoles.includes(role))
			errors.push({
				constraint: 'El rol no es válido',
				fields: ['role']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la información de usuario', errors);
	}

	static create(object: RegisterUserDtoProps): RegisterUserDto {
		const { name, lastname, dni, password, role } = object;

		return new RegisterUserDto(name, lastname, dni, password, role);
	}
}
