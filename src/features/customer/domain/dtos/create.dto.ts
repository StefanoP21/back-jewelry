import { CustomError, EIGHT, type ValidationType, ZERO, REGEX_EMAIL, REGEX_DNI, REGEX_PHONE } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface CreateCustomerDtoProps {
	name: string;
	lastName: string;
	email: string;
	dni: string;
	phone: string;
}

export class CreateCustomerDto implements CoreDto<CreateCustomerDtoProps> {
	private constructor(
		public readonly name: string,
		public readonly lastName: string,
		public readonly email: string,
		public readonly dni: string,
		public readonly phone: string
	) {
		this.validate(this);
	}

	public validate(dto: CreateCustomerDto): void {
		const errors: ValidationType[] = [];
		const { name, lastName, email, dni, phone } = dto;

		if (!name || name.length === ZERO)
			errors.push({
				constraint: 'El nombre es obligatorio',
				fields: ['name']
			});

		if (!lastName || lastName.length === ZERO)
			errors.push({
				constraint: 'El apellido es obligatorio',
				fields: ['lastName']
			});

		if (!email || email.length === ZERO || !REGEX_EMAIL.test(email))
			errors.push({
				constraint: 'El correo no es válido',
				fields: ['email']
			});

		if (!dni || dni.length !== EIGHT || !REGEX_DNI.test(dni))
			errors.push({
				constraint: 'El dni no es válido',
				fields: ['dni']
			});

		if (!phone || phone.length === ZERO || !REGEX_PHONE.test(phone))
			errors.push({
				constraint: 'El telefono no es válido',
				fields: ['phone']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la información del cliente', errors);
	}

	static create(object: CreateCustomerDtoProps): CreateCustomerDto {
		const { name, lastName, email, dni, phone } = object;

		return new CreateCustomerDto(name, lastName, email, dni, phone);
	}
}
