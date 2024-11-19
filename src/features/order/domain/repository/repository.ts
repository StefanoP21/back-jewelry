import { type OrderDto } from '../dtos';
import { type OrderEntity } from '../entities/order.entity';

export abstract class OrderRepository {
	abstract create(dto: OrderDto): Promise<OrderEntity>;
	abstract getAll(): Promise<OrderEntity[]>;
	abstract getById(id: number): Promise<OrderEntity>;
	abstract delete(id: number): Promise<OrderEntity>;
}
