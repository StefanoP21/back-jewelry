import { type Request, type Response, type NextFunction } from 'express';
import {
	type RefundEntity,
	type RefundRepository,
	RefundDto,
	CreateRefund,
	GetAllRefunds,
	GetRefundById,
	DeleteRefund
} from '../domain';
import { HttpCode, type SuccessResponse } from '../../../core';

interface Params {
	id: string;
}

interface RefundDetailRequestBody {
	refundId: number;
	purchaseDetailId: number;
	quantity: number;
}

interface RequestBody {
	purchaseId: number;
	comment: string;
	userDNI: string;
	refundDetail: RefundDetailRequestBody[];
}

export class RefundController {
	constructor(private readonly repository: RefundRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<RefundEntity[]>>, next: NextFunction) => {
		new GetAllRefunds(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<RefundEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetRefundById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<RefundEntity>>,
		next: NextFunction
	) => {
		const { purchaseId, comment, userDNI, refundDetail } = req.body;

		const refundDto = RefundDto.create({
			purchaseId,
			comment,
			userDNI,
			refundDetail
		});

		new CreateRefund(this.repository)
			.execute(refundDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<RefundEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new DeleteRefund(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
