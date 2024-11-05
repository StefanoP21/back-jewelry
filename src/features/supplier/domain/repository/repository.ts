import { type CreateSupplierDto, type UpdateSupplierDto } from '../dtos';
import { type SupplierEntity } from '../entities/supplier.entity';

export abstract class SupplierRepository {
	abstract create(dto: CreateSupplierDto): Promise<SupplierEntity>;
	abstract getAll(): Promise<SupplierEntity[]>;
	abstract getById(id: number): Promise<SupplierEntity>;
	abstract update(dto: UpdateSupplierDto): Promise<SupplierEntity>;
	abstract delete(id: number): Promise<SupplierEntity>;
}
