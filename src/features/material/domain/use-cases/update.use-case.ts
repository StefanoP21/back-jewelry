import { type UpdateMaterialDto } from '../dtos';
import { type MaterialEntity } from '../entities/material.entity';
import { type MaterialRepository } from '../repository/repository';

export interface UpdateMaterialUseCase {
	execute(dto: UpdateMaterialDto): Promise<MaterialEntity>;
}

export class UpdateMaterial implements UpdateMaterialUseCase {
	constructor(private readonly repository: MaterialRepository) {}

	execute(dto: UpdateMaterialDto): Promise<MaterialEntity> {
		return this.repository.update(dto);
	}
}
