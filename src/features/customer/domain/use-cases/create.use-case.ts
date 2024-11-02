import { type CreateCustomerDto } from '../dtos';
import { type CustomerEntity } from '../entities/customer.entity';
import { type CustomerRepository } from '../repository/repository';

export interface CreateCustomerUseCase {
	execute(dto: CreateCustomerDto): Promise<CustomerEntity>;
}

export class CreateCustomer implements CreateCustomerUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	execute(dto: CreateCustomerDto): Promise<CustomerEntity> {
		return this.repository.create(dto);
	}
}
