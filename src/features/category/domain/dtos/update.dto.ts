import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface UpdateCategoryDtoProps {
	id: number;
	name?: string;
}

export class UpdateCategoryDto implements CoreDto<UpdateCategoryDtoProps> {
	private constructor(
		public readonly id: number,
		public readonly name?: string
	) {
		this.validate(this);
	}

	public validate(dto: UpdateCategoryDtoProps): void {
		const errors: ValidationType[] = [];
		const { id } = dto;

		if (!id || isNaN(id))
			errors.push({
				constraint: 'El id no es un número válido',
				fields: ['id']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la categoria', errors);
	}

	static create(object: UpdateCategoryDtoProps): UpdateCategoryDto {
		const { id, name } = object;

		return new UpdateCategoryDto(id, name);
	}
}
