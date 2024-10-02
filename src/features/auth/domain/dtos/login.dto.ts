import { CustomError, NINE, SIX, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface LoginUserDtoProps {
	dni: string;
	password: string;
}

export class LoginUserDto implements CoreDto<LoginUserDto> {
	private constructor(
		public readonly dni: string,
		public readonly password: string
	) {
		this.validate(this);
	}

	public validate(dto: LoginUserDto): void {
		const errors: ValidationType[] = [];
		const { dni, password } = dto;

		if (!dni)
			errors.push({
				constraint: 'El dni es obligatorio',
				fields: ['dni']
			});

		if (dni.length === NINE)
			errors.push({
				constraint: 'El dni debe tener 9 caracteres',
				fields: ['dni']
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

	static create(object: LoginUserDtoProps): LoginUserDto {
		const { dni, password } = object;

		return new LoginUserDto(dni, password);
	}
}
