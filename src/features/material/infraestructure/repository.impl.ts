import {
	MaterialDatasource,
	CreateMaterialDto,
	UpdateMaterialDto,
	MaterialEntity,
	MaterialRepository
} from '../domain';

export class MaterialRepositoryImpl implements MaterialRepository {
	constructor(private readonly datasource: MaterialDatasource) {}

	getAll(): Promise<MaterialEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<MaterialEntity> {
		return this.datasource.getById(id);
	}

	create(dto: CreateMaterialDto): Promise<MaterialEntity> {
		return this.datasource.create(dto);
	}

	update(dto: UpdateMaterialDto): Promise<MaterialEntity> {
		return this.datasource.update(dto);
	}

	delete(id: number): Promise<MaterialEntity> {
		return this.datasource.delete(id);
	}
}
