import { type OrderDto } from '../dtos';
import { type OrderEntity } from '../entities/order.entity';
import { type OrderRepository } from '../repository/repository';

export interface CreateOrderUseCase {
	execute(dto: OrderDto): Promise<OrderEntity>;
}

export class CreateOrder implements CreateOrderUseCase {
	constructor(private readonly repository: OrderRepository) {}

	execute(dto: OrderDto): Promise<OrderEntity> {
		return this.repository.create(dto);
	}
}
