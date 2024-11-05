import { type SupplierEntity } from '../entities/supplier.entity';
import { type SupplierRepository } from '../repository/repository';

export interface DeleteSupplierUseCase {
	execute(id: number): Promise<SupplierEntity>;
}

export class DeleteSupplier implements DeleteSupplierUseCase {
	constructor(private readonly repository: SupplierRepository) {}

	execute(id: number): Promise<SupplierEntity> {
		return this.repository.delete(id);
	}
}
