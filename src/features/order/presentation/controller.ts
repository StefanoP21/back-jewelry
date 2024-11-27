import { type Request, type Response, type NextFunction } from 'express';
import {
	type OrderEntity,
	type OrderRepository,
	OrderDto,
	CreateOrder,
	GetAllOrders,
	GetOrderById,
	DeleteOrder
} from '../domain';
import { HttpCode, type SuccessResponse, PaymentMethod } from '../../../core';
import { Decimal } from '../../../data/postgresql';

interface Params {
	id: string;
}

interface OrderDetailRequestBody {
	productId: number;
	quantity: number;
	unitPrice: Decimal;
}

interface OrderRequestBody {
	customerId: number;
	userId: number;
	paymentMethod: PaymentMethod;
	totalDesc: Decimal;
	total: Decimal;
	orderDetail: OrderDetailRequestBody[];
}

export class OrderController {
	constructor(private readonly repository: OrderRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<OrderEntity[]>>, next: NextFunction) => {
		new GetAllOrders(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<OrderEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetOrderById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, OrderRequestBody>,
		res: Response<SuccessResponse<OrderEntity>>,
		next: NextFunction
	) => {
		const { customerId, userId, paymentMethod, totalDesc, total, orderDetail } = req.body;

		const orderDto = OrderDto.create({ customerId, userId, paymentMethod, totalDesc, total, orderDetail });

		new CreateOrder(this.repository)
			.execute(orderDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<OrderEntity>>, next: NextFunction) => {
		const { id } = req.params;
		new DeleteOrder(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
