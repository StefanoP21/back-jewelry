import { type Request, type Response, type NextFunction } from 'express';
import {
	type PurchaseEntity,
	type PurchaseRepository,
	PurchaseDto,
	CreatePurchase,
	GetAllPurchases,
	GetPurchaseById,
	DeletePurchase
} from '../domain';
import { HttpCode, type SuccessResponse } from '../../../core';
import { Decimal } from '../../../data/postgresql';

interface Params {
	id: string;
}

interface PurchaseDetailRequestBody {
	purchaseId: number;
	productId: number;
	quantity: number;
	unitPrice: Decimal;
	profit: Decimal;
}

interface RequestBody {
	supplierId: number;
	total: Decimal;
	bill: string;
	purchaseDetail: PurchaseDetailRequestBody[];
}

export class PurchaseController {
	constructor(private readonly repository: PurchaseRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<PurchaseEntity[]>>, next: NextFunction) => {
		new GetAllPurchases(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request, res: Response<SuccessResponse<PurchaseEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetPurchaseById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<PurchaseEntity>>,
		next: NextFunction
	) => {
		const { supplierId, total, bill, purchaseDetail } = req.body;

		const purchaseDto = PurchaseDto.create({
			supplierId,
			total,
			bill,
			purchaseDetail
		});

		new CreatePurchase(this.repository)
			.execute(purchaseDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<PurchaseEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new DeletePurchase(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
