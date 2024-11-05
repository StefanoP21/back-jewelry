import { type CustomerEntity } from '../entities/customer.entity';
import { type CustomerRepository } from '../repository/repository';

export interface GetCustomerByIdUseCase {
	execute(id: number): Promise<CustomerEntity>;
}

export class GetCustomerById implements GetCustomerByIdUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	execute(id: number): Promise<CustomerEntity> {
		return this.repository.getById(id);
	}
}
