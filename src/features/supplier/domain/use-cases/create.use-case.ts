import { type CreateSupplierDto } from '../dtos';
import { type SupplierEntity } from '../entities/supplier.entity';
import { type SupplierRepository } from '../repository/repository';

export interface CreateSupplierUseCase {
	execute(dto: CreateSupplierDto): Promise<SupplierEntity>;
}

export class CreateSupplier implements CreateSupplierUseCase {
	constructor(private readonly repository: SupplierRepository) {}

	execute(dto: CreateSupplierDto): Promise<SupplierEntity> {
		return this.repository.create(dto);
	}
}
