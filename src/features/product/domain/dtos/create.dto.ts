import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';
import { type CoreDto } from '../../../shared';

interface CreateProductDtoProps {
	name: string;
	description: string;
	categoryId: number;
	image: string;
	material: string;
	price: Decimal;
	stock: number;
}

export class CreateProductDto implements CoreDto<CreateProductDto> {
	private constructor(
		public readonly name: string,
		public readonly description: string,
		public readonly categoryId: number,
		public readonly image: string,
		public readonly material: string,
		public readonly price: Decimal,
		public readonly stock: number
	) {
		this.validate(this);
	}

	public validate(dto: CreateProductDto): void {
		const errors: ValidationType[] = [];
		const { name, description, categoryId, image, material, price, stock } = dto;

		if (!name || name.length === ZERO)
			errors.push({
				constraint: 'El nombre es obligatorio',
				fields: ['name']
			});

		if (!description || description.length === ZERO)
			errors.push({
				constraint: 'La descripción es obligatoria',
				fields: ['description']
			});

		if (!categoryId || categoryId <= ZERO)
			errors.push({
				constraint: 'La categoria es obligatoria',
				fields: ['categoryId']
			});

		if (!image || image.length === ZERO)
			errors.push({
				constraint: 'La imagen es obligatoria',
				fields: ['image']
			});

		if (!material || material.length === ZERO)
			errors.push({
				constraint: 'El material es obligatorio',
				fields: ['material']
			});

		if (!price || parseFloat(price.toString()) < ZERO)
			errors.push({
				constraint: 'El precio es obligatorio',
				fields: ['price']
			});

		if (!stock || stock < ZERO)
			errors.push({
				constraint: 'El stock es obligatorio',
				fields: ['stock']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el producto', errors);
	}

	static create(object: CreateProductDtoProps): CreateProductDto {
		const { name, description, categoryId, image, material, price, stock } = object;

		return new CreateProductDto(name, description, categoryId, image, material, price, stock);
	}
}
