import { CustomError, REGEX_EMAIL, SIX, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

export class LoginUserDto implements CoreDto<LoginUserDto> {
	private constructor(
		public readonly email: string,
		public readonly password: string
	) {
		this.validate(this);
	}

	public validate(dto: LoginUserDto): void {
		const errors: ValidationType[] = [];
		const { email, password } = dto;

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

	static create(object: Record<string, string>): LoginUserDto {
		const { email, password } = object;

		return new LoginUserDto(email, password);
	}
}
