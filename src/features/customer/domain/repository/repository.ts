import { type CreateCustomerDto, type UpdateCustomerDto } from '../dtos';
import { type CustomerEntity } from '../entities/customer.entity';

export abstract class CustomerRepository {
	abstract create(dto: CreateCustomerDto): Promise<CustomerEntity>;
	abstract getAll(): Promise<CustomerEntity[]>;
	abstract getById(id: number): Promise<CustomerEntity>;
	abstract update(dto: UpdateCustomerDto): Promise<CustomerEntity>;
	abstract delete(id: number): Promise<CustomerEntity>;
}
