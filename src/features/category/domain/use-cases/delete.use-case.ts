import { type CategoryEntity } from '../entities/category.entity';
import { type CategoryRepository } from '../repository/repository';

export interface DeleteCategoryUseCase {
	execute(id: number): Promise<CategoryEntity>;
}

export class DeleteCategory implements DeleteCategoryUseCase {
	constructor(private readonly repository: CategoryRepository) {}

	execute(id: number): Promise<CategoryEntity> {
		return this.repository.delete(id);
	}
}
