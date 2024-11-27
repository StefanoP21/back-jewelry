import { CustomError, type ValidationType, ZERO } from '../../../../core';
import { type CoreDto } from '../../../shared';

interface UpdateMaterialDtoProps {
	id: number;
	name?: string;
}

export class UpdateMaterialDto implements CoreDto<UpdateMaterialDtoProps> {
	private constructor(
		public readonly id: number,
		public readonly name?: string
	) {
		this.validate(this);
	}

	public validate(dto: UpdateMaterialDtoProps): void {
		const errors: ValidationType[] = [];
		const { id } = dto;

		if (!id || isNaN(id))
			errors.push({
				constraint: 'El id no es un número valido',
				fields: ['id']
			});

		if (errors.length > ZERO) throw CustomError.badRequest('Error validando el material', errors);
	}

	static create(object: UpdateMaterialDtoProps): UpdateMaterialDto {
		const { id, name } = object;
		return new UpdateMaterialDto(id, name);
	}
}
