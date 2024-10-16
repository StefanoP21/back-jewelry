import { type UpdateCategoryDto } from '../dtos';
import { type CategoryEntity } from '../entities/category.entity';
import { type CategoryRepository } from '../repository/repository';

export interface UpdateCategoryUseCase {
	execute(dto: UpdateCategoryDto): Promise<CategoryEntity>;
}

export class UpdateCategory implements UpdateCategoryUseCase {
	constructor(private readonly repository: CategoryRepository) {}

	execute(dto: UpdateCategoryDto): Promise<CategoryEntity> {
		return this.repository.update(dto);
	}
}
