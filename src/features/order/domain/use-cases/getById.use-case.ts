import { type OrderEntity } from '../entities/order.entity';
import { type OrderRepository } from '../repository/repository';

export interface GetOrderByIdUseCase {
	execute(id: number): Promise<OrderEntity>;
}

export class GetOrderById implements GetOrderByIdUseCase {
	constructor(private readonly repository: OrderRepository) {}

	execute(id: number): Promise<OrderEntity> {
		return this.repository.getById(id);
	}
}
