import { type CategoryEntity } from '../entities/category.entity';
import { type CategoryRepository } from '../repository/repository';

export interface GetCategoryByIdUseCase {
	execute(id: number): Promise<CategoryEntity>;
}

export class GetCategoryById implements GetCategoryByIdUseCase {
	constructor(private readonly repository: CategoryRepository) {}

	execute(id: number): Promise<CategoryEntity> {
		return this.repository.getById(id);
	}
}
