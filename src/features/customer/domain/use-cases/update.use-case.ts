import { type UpdateCustomerDto } from '../dtos';
import { type CustomerEntity } from '../entities/customer.entity';
import { type CustomerRepository } from '../repository/repository';

export interface UpdateCustomerUseCase {
	execute(dto: UpdateCustomerDto): Promise<CustomerEntity>;
}

export class UpdateCustomer implements UpdateCustomerUseCase {
	constructor(private readonly repository: CustomerRepository) {}

	execute(dto: UpdateCustomerDto): Promise<CustomerEntity> {
		return this.repository.update(dto);
	}
}
