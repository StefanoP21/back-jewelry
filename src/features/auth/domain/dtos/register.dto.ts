import { CustomError, REGEX_EMAIL, SIX, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class RegisterUserDto implements CoreDto<RegisterUserDto> {
	private constructor(
		public readonly name: string,
		public readonly lastname: string,
		public readonly email: string,
		public readonly password: string
	) {
		this.validate(this);
	}

	public validate(dto: RegisterUserDto): void {
		const errors: ValidationType[] = [];
		const { name, lastname, email, password } = dto;

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

		if (!email)
			errors.push({
				constraint: 'El correo es obligatorio',
				fields: ['email']
			});

		if (!REGEX_EMAIL.test(email))
			errors.push({
				constraint: 'El correo es inválido',
				fields: ['email']
			});

		if (!password)
			errors.push({
				constraint: 'La contraseña es obligatoria',
				fields: ['password']
			});

		if (password.length < SIX)
			errors.push({
				constraint: 'La contraseña debe tener al menos 6 caracteres',
				fields: ['password']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la información de usuario', errors);
	}

	static create(object: Record<string, string>): RegisterUserDto {
		const { name, lastname, email, password } = object;

		return new RegisterUserDto(name, lastname, email, password);
	}
}
