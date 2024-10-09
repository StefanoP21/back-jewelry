import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';
import { type CoreDto } from '../../../shared';

interface ProductDtoProps {
	id: number;
	name: string;
	description: string;
	categoryId: number;
	image: string;
	material: string;
	price: Decimal;
}

export class ProductDto implements CoreDto<ProductDto> {
	private constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly description: string,
		public readonly categoryId: number,
		public readonly image: string,
		public readonly material: string,
		public readonly price: Decimal
	) {
		this.validate(this);
	}

	public validate(dto: ProductDto): void {
		const errors: ValidationType[] = [];
		const { id, name, description, categoryId, image, material, price } = dto;

		if (!id || id <= ZERO)
			errors.push({
				constraint: 'El id es obligatorio',
				fields: ['id']
			});

		if (!name || name.length === 0)
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

		if (!price || price.toNumber() < ZERO)
			errors.push({
				constraint: 'El precio es obligatorio',
				fields: ['price']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el producto', errors);
	}

	static create(object: ProductDtoProps): ProductDto {
		const { id, name, description, categoryId, image, material, price } = object;

		return new ProductDto(id, name, description, categoryId, image, material, price);
	}
}
