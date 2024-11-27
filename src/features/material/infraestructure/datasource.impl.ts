import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { MaterialEntity, type MaterialDatasource, type CreateMaterialDto, type UpdateMaterialDto } from '../domain';

export class MaterialDatasourceImpl implements MaterialDatasource {
	constructor() {}

	async getAll(): Promise<MaterialEntity[]> {
		try {
			const materials = await prisma.material.findMany({ orderBy: { name: 'asc' } });

			return materials.map((material) => MaterialEntity.fromObject(material));
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener los materiales: ${error}`);
		}
	}

	async getById(id: number): Promise<MaterialEntity> {
		try {
			const material = await prisma.material.findUnique({ where: { id } });

			if (!material) throw CustomError.notFound(ErrorMessages.MATERIAL_NOT_FOUND);

			return MaterialEntity.fromObject(material);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener el material con id ${id}: ${error}`);
		}
	}

	async create(dto: CreateMaterialDto): Promise<MaterialEntity> {
		try {
			const material = await prisma.material.create({ data: dto });

			return MaterialEntity.fromObject(material);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al crear el material: ${error}`);
		}
	}

	async update(dto: UpdateMaterialDto): Promise<MaterialEntity> {
		try {
			const { id } = await this.getById(dto.id);
			const material = await prisma.material.update({ where: { id }, data: dto });
			return MaterialEntity.fromObject(material);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al actualizar el material: ${error}`);
		}
	}

	async delete(id: number): Promise<MaterialEntity> {
		try {
			const { id: materialId } = await this.getById(id);

			const deletedMaterial = await prisma.material.delete({ where: { id: materialId } });

			return MaterialEntity.fromObject(deletedMaterial);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar el material con id ${id}: ${error}`);
		}
	}
}
