import {
	CategoryDatasource,
	CreateCategoryDto,
	UpdateCategoryDto,
	CategoryEntity,
	CategoryRepository
} from '../domain';

export class CategoryRepositoryImpl implements CategoryRepository {
	constructor(private readonly datasource: CategoryDatasource) {}

	getAll(): Promise<CategoryEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<CategoryEntity> {
		return this.datasource.getById(id);
	}

	create(dto: CreateCategoryDto): Promise<CategoryEntity> {
		return this.datasource.create(dto);
	}

	update(dto: UpdateCategoryDto): Promise<CategoryEntity> {
		return this.datasource.update(dto);
	}

	delete(id: number): Promise<CategoryEntity> {
		return this.datasource.delete(id);
	}
}
