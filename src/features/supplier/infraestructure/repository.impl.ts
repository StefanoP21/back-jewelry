import {
	SupplierDatasource,
	CreateSupplierDto,
	UpdateSupplierDto,
	SupplierEntity,
	SupplierRepository
} from '../domain';

export class SupplierRepositoryImpl implements SupplierRepository {
	constructor(private readonly datasource: SupplierDatasource) {}

	getAll(): Promise<SupplierEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<SupplierEntity> {
		return this.datasource.getById(id);
	}

	create(dto: CreateSupplierDto): Promise<SupplierEntity> {
		return this.datasource.create(dto);
	}

	update(dto: UpdateSupplierDto): Promise<SupplierEntity> {
		return this.datasource.update(dto);
	}

	delete(id: number): Promise<SupplierEntity> {
		return this.datasource.delete(id);
	}
}
