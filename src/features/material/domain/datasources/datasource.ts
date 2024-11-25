import { type CreateMaterialDto, type UpdateMaterialDto } from '../dtos';
import { type MaterialEntity } from '../entities/material.entity';

export abstract class MaterialDatasource {
	abstract create(dto: CreateMaterialDto): Promise<MaterialEntity>;
	abstract getAll(): Promise<MaterialEntity[]>;
	abstract getById(id: number): Promise<MaterialEntity>;
	abstract update(dto: UpdateMaterialDto): Promise<MaterialEntity>;
	abstract delete(id: number): Promise<MaterialEntity>;
}
