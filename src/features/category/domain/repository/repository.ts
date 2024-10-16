import { type CreateCategoryDto, type UpdateCategoryDto } from '../dtos';
import { type CategoryEntity } from '../entities/category.entity';

export abstract class CategoryRepository {
	abstract create(dto: CreateCategoryDto): Promise<CategoryEntity>;
	abstract getAll(): Promise<CategoryEntity[]>;
	abstract getById(id: number): Promise<CategoryEntity>;
	abstract update(dto: UpdateCategoryDto): Promise<CategoryEntity>;
	abstract delete(id: number): Promise<CategoryEntity>;
}
