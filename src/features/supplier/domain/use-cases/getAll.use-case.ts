import { type SupplierEntity } from '../entities/supplier.entity';
import { type SupplierRepository } from '../repository/repository';

export interface GetAllSuppliersUseCase {
	execute(): Promise<SupplierEntity[]>;
}

export class GetAllSuppliers implements GetAllSuppliersUseCase {
	constructor(private readonly repository: SupplierRepository) {}

	execute(): Promise<SupplierEntity[]> {
		return this.repository.getAll();
	}
}
