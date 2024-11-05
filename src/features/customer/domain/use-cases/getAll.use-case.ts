import { type CustomerEntity } from '../entities/customer.entity';
import { type CustomerRepository } from '../repository/repository';

export interface GetAllCustomersUseCase {
	execute(): Promise<CustomerEntity[]>;
}

export class GetAllCustomers implements GetAllCustomersUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	execute(): Promise<CustomerEntity[]> {
		return this.repository.getAll();
	}
}
