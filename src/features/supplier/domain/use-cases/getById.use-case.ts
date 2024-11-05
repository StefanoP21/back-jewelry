import { type SupplierEntity } from '../entities/supplier.entity';
import { type SupplierRepository } from '../repository/repository';

export interface GetSupplierByIdUseCase {
	execute(id: number): Promise<SupplierEntity>;
}

export class GetSupplierById implements GetSupplierByIdUseCase {
	constructor(private readonly repository: SupplierRepository) {}

	execute(id: number): Promise<SupplierEntity> {
		return this.repository.getById(id);
	}
}
