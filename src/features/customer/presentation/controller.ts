import { type Request, type Response, type NextFunction } from 'express';
import {
	type CustomerEntity,
	type CustomerRepository,
	CreateCustomerDto,
	UpdateCustomerDto,
	GetAllCustomers,
	GetCustomerById,
	CreateCustomer,
	UpdateCustomer,
	DeleteCustomer
} from '../domain';
import { HttpCode, type SuccessResponse } from '../../../core';

interface Params {
	id: string;
}

interface RequestBody {
	name: string;
	lastName: string;
	email: string;
	dni: string;
	phone: string;
}

export class CustomerController {
	constructor(private readonly repository: CustomerRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<CustomerEntity[]>>, next: NextFunction) => {
		new GetAllCustomers(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request, res: Response<SuccessResponse<CustomerEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetCustomerById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<CustomerEntity>>,
		next: NextFunction
	) => {
		const { name, lastName, email, dni, phone } = req.body;

		const createCustomerDto = CreateCustomerDto.create({
			name,
			lastName,
			email,
			dni,
			phone
		});

		new CreateCustomer(this.repository)
			.execute(createCustomerDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<CustomerEntity>>,
		next: NextFunction
	) => {
		const { id } = req.params;
		const { name, lastName, email, dni, phone } = req.body;

		const updateCustomerDto = UpdateCustomerDto.create({
			id: Number(id),
			name: name,
			lastName: lastName,
			email: email,
			dni: dni,
			phone: phone
		});

		new UpdateCustomer(this.repository)
			.execute(updateCustomerDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<CustomerEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new DeleteCustomer(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
