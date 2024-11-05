import {
	CustomerDatasource,
	CreateCustomerDto,
	UpdateCustomerDto,
	CustomerEntity,
	CustomerRepository
} from '../domain';

export class CustomerRepositoryImpl implements CustomerRepository {
	constructor(private readonly datasource: CustomerDatasource) {}

	getAll(): Promise<CustomerEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<CustomerEntity> {
		return this.datasource.getById(id);
	}

	create(dto: CreateCustomerDto): Promise<CustomerEntity> {
		return this.datasource.create(dto);
	}

	update(dto: UpdateCustomerDto): Promise<CustomerEntity> {
		return this.datasource.update(dto);
	}

	delete(id: number): Promise<CustomerEntity> {
		return this.datasource.delete(id);
	}
}
