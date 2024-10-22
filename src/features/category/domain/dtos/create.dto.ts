import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface CreateCategoryDtoProps {
	name: string;
}

export class CreateCategoryDto implements CoreDto<CreateCategoryDtoProps> {
	private constructor(public readonly name: string) {
		this.validate(this);
	}

	public validate(dto: CreateCategoryDto): void {
		const errors: ValidationType[] = [];
		const { name } = dto;

		if (!name || name.length === ZERO)
			errors.push({
				constraint: 'El nombre es obligatorio',
				fields: ['name']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando la categoria', errors);
	}

	static create(object: CreateCategoryDtoProps): CreateCategoryDto {
		const { name } = object;
		return new CreateCategoryDto(name);
	}
}
