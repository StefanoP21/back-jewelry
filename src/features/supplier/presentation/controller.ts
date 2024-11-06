import { type Request, type Response, type NextFunction } from 'express';
import {
	type SupplierEntity,
	type SupplierRepository,
	CreateSupplierDto,
	UpdateSupplierDto,
	GetAllSuppliers,
	GetSupplierById,
	CreateSupplier,
	UpdateSupplier,
	DeleteSupplier
} from '../domain';
import { HttpCode, type SuccessResponse } from '../../../core';

interface Params {
	id: string;
}

interface RequestBody {
	nameContact: string;
	email: string;
	phone: string;
	companyName: string;
	ruc: string;
}

export class SupplierController {
	constructor(private readonly repository: SupplierRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<SupplierEntity[]>>, next: NextFunction) => {
		new GetAllSuppliers(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<SupplierEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetSupplierById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<SupplierEntity>>,
		next: NextFunction
	) => {
		const { nameContact, email, phone, companyName, ruc } = req.body;

		const createSupplierDto = CreateSupplierDto.create({
			nameContact,
			email,
			phone,
			companyName,
			ruc
		});

		new CreateSupplier(this.repository)
			.execute(createSupplierDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<SupplierEntity>>,
		next: NextFunction
	) => {
		const { id } = req.params;
		const { nameContact, email, phone, companyName, ruc } = req.body;

		const updateSupplierDto = UpdateSupplierDto.create({
			id: Number(id),
			nameContact: nameContact,
			email: email,
			phone: phone,
			companyName: companyName,
			ruc: ruc
		});

		new UpdateSupplier(this.repository)
			.execute(updateSupplierDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<SupplierEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new DeleteSupplier(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
