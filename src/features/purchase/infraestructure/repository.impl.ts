import { PurchaseDatasource, PurchaseRepository, PurchaseEntity, PurchaseDto } from '../domain';

export class PurchaseRepositoryImpl implements PurchaseRepository {
	constructor(private readonly datasource: PurchaseDatasource) {}

	getAll(): Promise<PurchaseEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<PurchaseEntity> {
		return this.datasource.getById(id);
	}

	create(dto: PurchaseDto): Promise<PurchaseEntity> {
		return this.datasource.create(dto);
	}

	delete(id: number): Promise<PurchaseEntity> {
		return this.datasource.delete(id);
	}
}
