import { type MaterialEntity } from '../entities/material.entity';
import { type MaterialRepository } from '../repository/repository';

export interface DeleteMaterialUseCase {
	execute(id: number): Promise<MaterialEntity>;
}

export class DeleteMaterial implements DeleteMaterialUseCase {
	constructor(private readonly repository: MaterialRepository) {}

	execute(id: number): Promise<MaterialEntity> {
		return this.repository.delete(id);
	}
}
