import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { SupplierEntity, type SupplierDatasource, type CreateSupplierDto, type UpdateSupplierDto } from '../domain';

export class SupplierDatasourceImpl implements SupplierDatasource {
	constructor() {}

	async getAll(): Promise<SupplierEntity[]> {
		try {
			const suppliers = await prisma.supplier.findMany({
				orderBy: { ruc: 'asc' }
			});
			return suppliers.map((supplier) => SupplierEntity.fromObject(supplier));
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener los proveedores: ${error}`);
		}
	}

	async getById(id: number): Promise<SupplierEntity> {
		try {
			const supplier = await prisma.supplier.findUnique({ where: { id } });
			if (!supplier) throw CustomError.notFound(ErrorMessages.SUPPLIER_NOT_FOUND);
			return SupplierEntity.fromObject(supplier);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener el proveedor con id ${id}: ${error}`);
		}
	}

	async create(dto: CreateSupplierDto): Promise<SupplierEntity> {
		try {
			const supplier = await prisma.supplier.create({ data: dto });
			return SupplierEntity.fromObject(supplier);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al crear el proveedor: ${error}`);
		}
	}

	async update(dto: UpdateSupplierDto): Promise<SupplierEntity> {
		try {
			const { id } = await this.getById(dto.id);
			const supplier = await prisma.supplier.update({ where: { id }, data: dto });
			return SupplierEntity.fromObject(supplier);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al actualizar el proveedor con id ${dto.id}: ${error}`);
		}
	}

	async delete(id: number): Promise<SupplierEntity> {
		try {
			const { id: supplierId } = await this.getById(id);

			const purchases = await prisma.purchase.findMany({ where: { supplierId } });
			if (purchases.length > 0) {
				throw CustomError.badRequest(
					`El proveedor con id ${supplierId} tiene compras registradas y no puede ser eliminado.`
				);
			}

			const deletedSupplier = await prisma.supplier.delete({ where: { id: supplierId } });
			return SupplierEntity.fromObject(deletedSupplier);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar el proveedor con id ${id}: ${error}`);
		}
	}
}
