import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface UpdateSupplierDtoProps {
	id: number;
	nameContact?: string;
	email?: string;
	phone?: string;
	companyName?: string;
	ruc?: string;
}

export class UpdateSupplierDto implements CoreDto<UpdateSupplierDtoProps> {
	private constructor(
		public readonly id: number,
		public readonly nameContact?: string,
		public readonly email?: string,
		public readonly phone?: string,
		public readonly companyName?: string,
		public readonly ruc?: string
	) {
		this.validate(this);
	}

	public validate(dto: UpdateSupplierDto): void {
		const errors: ValidationType[] = [];
		const { id } = dto;

		if (!id || isNaN(id))
			errors.push({
				constraint: 'El id no es un número valido',
				fields: ['id']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el proveedor', errors);
	}

	static create(object: UpdateSupplierDtoProps): UpdateSupplierDto {
		const { id, nameContact, email, phone, companyName, ruc } = object;

		return new UpdateSupplierDto(id, nameContact, email, phone, companyName, ruc);
	}
}
