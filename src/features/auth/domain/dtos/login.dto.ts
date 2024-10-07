import { CustomError, EIGHT, SIX, type ValidationType, ZERO } from '../../../../core';
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

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la información de usuario', errors);
	}

	static create(object: LoginUserDtoProps): LoginUserDto {
		const { dni, password } = object;

		return new LoginUserDto(dni, password);
	}
}
