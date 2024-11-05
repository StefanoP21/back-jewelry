import { CustomError, type ValidationType, ZERO, REGEX_EMAIL, REGEX_PHONE, REGEX_RUC } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface CreateSupplierDtoProps {
	nameContact: string;
	email: string;
	phone: string;
	companyName: string;
	ruc: string;
}

export class CreateSupplierDto implements CoreDto<CreateSupplierDtoProps> {
	private constructor(
		public readonly nameContact: string,
		public readonly email: string,
		public readonly phone: string,
		public readonly companyName: string,
		public readonly ruc: string
	) {
		this.validate(this);
	}

	public validate(dto: CreateSupplierDto): void {
		const errors: ValidationType[] = [];
		const { nameContact, email, phone, companyName, ruc } = dto;

		if (!nameContact || nameContact.length === ZERO)
			errors.push({
				constraint: 'El nombre de contacto es obligatorio',
				fields: ['nameContact']
			});

		if (!email || email.length === ZERO || !REGEX_EMAIL.test(email))
			errors.push({
				constraint: 'El correo no es válido',
				fields: ['email']
			});

		if (!phone || phone.length === ZERO || !REGEX_PHONE.test(phone))
			errors.push({
				constraint: 'El teléfono no es válido',
				fields: ['phone']
			});

		if (!companyName || companyName.length === ZERO)
			errors.push({
				constraint: 'El nombre de la empresa es obligatorio',
				fields: ['companyName']
			});

		if (!ruc || ruc.length === ZERO || !REGEX_RUC.test(ruc))
			errors.push({
				constraint: 'El dni no es válido',
				fields: ['ruc']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el Proveedor', errors);
	}

	static create(object: CreateSupplierDtoProps): CreateSupplierDto {
		const { nameContact, email, phone, companyName, ruc } = object;

		return new CreateSupplierDto(nameContact, email, phone, companyName, ruc);
	}
}
