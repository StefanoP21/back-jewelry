import { type MaterialEntity } from '../entities/material.entity';
import { type MaterialRepository } from '../repository/repository';

export interface GetMaterialByIdUseCase {
	execute(id: number): Promise<MaterialEntity>;
}

export class GetMaterialById implements GetMaterialByIdUseCase {
	constructor(private readonly repository: MaterialRepository) {}

	execute(id: number): Promise<MaterialEntity> {
		return this.repository.getById(id);
	}
}
