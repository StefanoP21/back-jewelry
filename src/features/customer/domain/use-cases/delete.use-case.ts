import { type CustomerEntity } from '../entities/customer.entity';
import { type CustomerRepository } from '../repository/repository';

export interface DeleteCustomerUseCase {
	execute(id: number): Promise<CustomerEntity>;
}

export class DeleteCustomer implements DeleteCustomerUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	execute(id: number): Promise<CustomerEntity> {
		return this.repository.delete(id);
	}
}
