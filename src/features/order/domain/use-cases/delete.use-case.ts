import { type OrderEntity } from '../entities/order.entity';
import { type OrderRepository } from '../repository/repository';

export interface DeleteOrderUseCase {
	execute(id: number): Promise<OrderEntity>;
}

export class DeleteOrder implements DeleteOrderUseCase {
	constructor(private readonly repository: OrderRepository) {}

	execute(id: number): Promise<OrderEntity> {
		return this.repository.delete(id);
	}
}
