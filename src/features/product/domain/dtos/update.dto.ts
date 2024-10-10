import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';
import { type CoreDto } from '../../../shared';

interface UpdateProductDtoProps {
	id: number;
	name?: string;
	description?: string;
	categoryId?: number;
	image?: string;
	material?: string;
	price?: Decimal;
	stock?: number;
}

export class UpdateProductDto implements CoreDto<UpdateProductDto> {
	private constructor(
		public readonly id: number,
		public readonly name?: string,
		public readonly description?: string,
		public readonly categoryId?: number,
		public readonly image?: string,
		public readonly material?: string,
		public readonly price?: Decimal,
		public readonly stock?: number
	) {
		this.validate(this);
	}

	public validate(dto: UpdateProductDto): void {
		const errors: ValidationType[] = [];
		const { id } = dto;

		if (!id || isNaN(id))
			errors.push({
				constraint: 'El id no es un número válido',
				fields: ['id']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el producto', errors);
	}

	static create(object: UpdateProductDtoProps): UpdateProductDto {
		const { id, name, description, categoryId, image, material, price, stock } = object;

		return new UpdateProductDto(id, name, description, categoryId, image, material, price, stock);
	}
}
