import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface UpdateCustomerDtoProps {
	id: number;
	name?: string;
	lastName?: string;
	email?: string;
	dni?: string;
	phone?: string;
}

export class UpdateCustomerDto implements CoreDto<UpdateCustomerDtoProps> {
	private constructor(
		public readonly id: number,
		public readonly name?: string,
		public readonly lastName?: string,
		public readonly email?: string,
		public readonly dni?: string,
		public readonly phone?: string
	) {
		this.validate(this);
	}

	public validate(dto: UpdateCustomerDto): void {
		const errors: ValidationType[] = [];
		const { id } = dto;

		if (!id || isNaN(id))
			errors.push({
				constraint: 'El id no es un número válido',
				fields: ['id']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el cliente', errors);
	}

	static create(object: UpdateCustomerDtoProps): UpdateCustomerDto {
		const { id, name, lastName, email, dni, phone } = object;

		return new UpdateCustomerDto(id, name, lastName, email, dni, phone);
	}
}
