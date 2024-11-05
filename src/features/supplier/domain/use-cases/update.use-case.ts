import { type UpdateSupplierDto } from '../dtos';
import { type SupplierEntity } from '../entities/supplier.entity';
import { type SupplierRepository } from '../repository/repository';

export interface UpdateSupplierUseCase {
	execute(dto: UpdateSupplierDto): Promise<SupplierEntity>;
}

export class UpdateSupplier implements UpdateSupplierUseCase {
	constructor(private readonly repository: SupplierRepository) {}

	execute(dto: UpdateSupplierDto): Promise<SupplierEntity> {
		return this.repository.update(dto);
	}
}
