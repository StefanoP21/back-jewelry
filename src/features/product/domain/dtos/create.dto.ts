import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface CreateProductDtoProps {
	name: string;
	description: string;
	categoryId: number;
	image: string;
	material: string;
}

export class CreateProductDto implements CoreDto<CreateProductDto> {
	private constructor(
		public readonly name: string,
		public readonly description: string,
		public readonly categoryId: number,
		public readonly image: string,
		public readonly material: string
	) {
		this.validate(this);
	}

	public validate(dto: CreateProductDto): void {
		const errors: ValidationType[] = [];
		const { name, description, categoryId, image, material } = dto;

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

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el producto', errors);
	}

	static create(object: CreateProductDtoProps): CreateProductDto {
		const { name, description, categoryId, image, material } = object;

		return new CreateProductDto(name, description, categoryId, image, material);
	}
}
