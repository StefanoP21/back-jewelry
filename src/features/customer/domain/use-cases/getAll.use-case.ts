import { type CustomerEntity } from '../entities/customer.entity';
import { type CustomerRepository } from '../repository/repository';

export interface GetAllCustomersUseCase {
	execute(): Promise<CustomerEntity[]>;
}

export class GetAllCustomers implements GetAllCustomers {
	constructor(private readonly repository: CustomerRepository) {}

	execute(): Promise<CustomerEntity[]> {
		return this.repository.getAll();
	}
}
