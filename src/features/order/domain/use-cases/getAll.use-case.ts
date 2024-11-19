import { type OrderEntity } from '../entities/order.entity';
import { type OrderRepository } from '../repository/repository';

export interface GetAllOrdersUseCase {
	execute(): Promise<OrderEntity[]>;
}

export class GetAllOrders implements GetAllOrdersUseCase {
	constructor(private readonly repository: OrderRepository) {}

	execute(): Promise<OrderEntity[]> {
		return this.repository.getAll();
	}
}
