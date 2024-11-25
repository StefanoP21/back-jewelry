import { type CreateMaterialDto } from '../dtos';
import { type MaterialEntity } from '../entities/material.entity';
import { type MaterialRepository } from '../repository/repository';

export interface CreateMaterialUseCase {
	execute(dto: CreateMaterialDto): Promise<MaterialEntity>;
}

export class CreateMaterial implements CreateMaterialUseCase {
	constructor(private readonly repository: MaterialRepository) {}

	execute(dto: CreateMaterialDto): Promise<MaterialEntity> {
		return this.repository.create(dto);
	}
}
