import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { CategoryEntity, type CategoryDatasource, type CreateCategoryDto, type UpdateCategoryDto } from '../domain';

export class CategoryDatasourceImpl implements CategoryDatasource {
	constructor() {}

	async getAll(): Promise<CategoryEntity[]> {
		try {
			const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });
			return categories.map((category) => CategoryEntity.fromObject(category));
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener las categorias: ${error}`);
		}
	}

	async getById(id: number): Promise<CategoryEntity> {
		try {
			const category = await prisma.category.findUnique({ where: { id } });
			if (!category) throw CustomError.notFound(ErrorMessages.CATEGORY_NOT_FOUND);
			return CategoryEntity.fromObject(category);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener la categoria con id ${id}: ${error}`);
		}
	}

	async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
		try {
			const category = await prisma.category.create({ data: dto });
			return CategoryEntity.fromObject(category);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al crear la categoria: ${error}`);
		}
	}

	async update(dto: UpdateCategoryDto): Promise<CategoryEntity> {
		try {
			const { id } = await this.getById(dto.id);
			const category = await prisma.category.update({ where: { id }, data: dto });
			return CategoryEntity.fromObject(category);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al actualizar la categoria con id ${dto.id}: ${error}`);
		}
	}

	async delete(id: number): Promise<CategoryEntity> {
		try {
			const { id: categoryId } = await this.getById(id);

			const products = await prisma.product.findMany({ where: { categoryId } });
			if (products.length > 0) {
				throw CustomError.badRequest(
					`La categoría con id ${categoryId} tiene productos registrados y no puede ser eliminado.`
				);
			}

			const deletedCategory = await prisma.category.delete({ where: { id: categoryId } });
			return CategoryEntity.fromObject(deletedCategory);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar la categoria con id ${id}: ${error}`);
		}
	}
}
