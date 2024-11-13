import { OrderDatasource, OrderRepository, OrderEntity, OrderDto } from '../domain';

export class OrderRepositoryImpl implements OrderRepository {
	constructor(private readonly datasource: OrderDatasource) {}

	getAll(): Promise<OrderEntity[]> {
		return this.datasource.getAll();
	}

	getById(id: number): Promise<OrderEntity> {
		return this.datasource.getById(id);
	}

	create(dto: OrderDto): Promise<OrderEntity> {
		return this.datasource.create(dto);
	}

	delete(id: number): Promise<OrderEntity> {
		return this.datasource.delete(id);
	}
}
