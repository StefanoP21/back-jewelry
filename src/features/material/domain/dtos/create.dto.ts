import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface CreateMaterialDtoProps {
	name: string;
}

export class CreateMaterialDto implements CoreDto<CreateMaterialDtoProps> {
	private constructor(public readonly name: string) {
		this.validate(this);
	}

	public validate(dto: CreateMaterialDtoProps): void {
		const errors: ValidationType[] = [];
		const { name } = dto;

		if (!name || name.length === ZERO)
			errors.push({
				constraint: 'El nombre es obligatorio',
				fields: ['name']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el material', errors);
	}

	static create(object: CreateMaterialDtoProps): CreateMaterialDto {
		const { name } = object;
		return new CreateMaterialDto(name);
	}
}
