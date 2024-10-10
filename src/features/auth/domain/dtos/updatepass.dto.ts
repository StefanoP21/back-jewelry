import { CustomError, EIGHT, SIX, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface UpdatePasswordUserDtoProps {
	dni: string;
	password: string;
	newPassword: string;
}

export class UpdatePasswordUserDto implements CoreDto<UpdatePasswordUserDtoProps> {
	private constructor(
		public readonly dni: string,
		public readonly password: string,
		public readonly newPassword: string
	) {
		this.validate(this);
	}

	public validate(dto: UpdatePasswordUserDto): void {
		const errors: ValidationType[] = [];
		const { dni, password, newPassword } = dto;

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

		if (!newPassword || newPassword.length < SIX)
			errors.push({
				constraint: 'La nueva contraseña no es válida',
				fields: ['newPassword']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando las contraseñas', errors);
	}

	static create(object: UpdatePasswordUserDtoProps): UpdatePasswordUserDto {
		const { dni, password, newPassword } = object;

		return new UpdatePasswordUserDto(dni, password, newPassword);
	}
}
