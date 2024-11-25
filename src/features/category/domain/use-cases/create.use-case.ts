import { type CreateCategoryDto } from '../dtos';
import { type CategoryEntity } from '../entities/category.entity';
import { type CategoryRepository } from '../repository/repository';

export interface CreateCategoryUseCase {
	execute(dto: CreateCategoryDto): Promise<CategoryEntity>;
}

export class CreateCategory implements CreateCategoryUseCase {
	constructor(private readonly repository: CategoryRepository) {}

	execute(dto: CreateCategoryDto): Promise<CategoryEntity> {
		return this.repository.create(dto);
	}
}
