import { type MaterialEntity } from '../entities/material.entity';
import { type MaterialRepository } from '../repository/repository';

export interface GetAllMaterialsUseCase {
	execute(): Promise<MaterialEntity[]>;
}

export class GetAllMaterials implements GetAllMaterialsUseCase {
	constructor(private readonly repository: MaterialRepository) {}

	execute(): Promise<MaterialEntity[]> {
		return this.repository.getAll();
	}
}
