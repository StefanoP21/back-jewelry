import { RefundDatasource, RefundRepository, RefundEntity, RefundDto } from '../domain';

export class RefundRepositoryImpl implements RefundRepository {
	constructor(private readonly datasource: RefundDatasource) {}

	getAll(): Promise<RefundEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<RefundEntity> {
		return this.datasource.getById(id);
	}

	create(dto: RefundDto): Promise<RefundEntity> {
		return this.datasource.create(dto);
	}

	delete(id: number): Promise<RefundEntity> {
		return this.datasource.delete(id);
	}
}
