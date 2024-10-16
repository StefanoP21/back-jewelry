import { type CategoryEntity } from '../entities/category.entity';
import { type CategoryRepository } from '../repository/repository';

export interface GetAllCategoriesUseCase {
	execute(): Promise<CategoryEntity[]>;
}

export class GetAllCategories implements GetAllCategoriesUseCase {
	constructor(private readonly repository: CategoryRepository) {}

	execute(): Promise<CategoryEntity[]> {
		return this.repository.getAll();
	}
}
