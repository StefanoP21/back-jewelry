import { type Request, type Response, type NextFunction } from 'express';
import {
	type MaterialEntity,
	type MaterialRepository,
	CreateMaterialDto,
	UpdateMaterialDto,
	GetAllMaterials,
	GetMaterialById,
	CreateMaterial,
	UpdateMaterial,
	DeleteMaterial
} from '../domain';
import { HttpCode, type SuccessResponse } from '../../../core';

interface Params {
	id: string;
}

interface RequestBody {
	name: string;
}

export class MaterialController {
	constructor(private readonly repository: MaterialRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<MaterialEntity[]>>, next: NextFunction) => {
		new GetAllMaterials(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request<Params>, res: Response<SuccessResponse<MaterialEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetMaterialById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<MaterialEntity>>,
		next: NextFunction
	) => {
		const { name } = req.body;

		const createMaterialDto = CreateMaterialDto.create({ name });

		new CreateMaterial(this.repository)
			.execute(createMaterialDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<MaterialEntity>>,
		next: NextFunction
	) => {
		const { id } = req.params;
		const { name } = req.body;

		const updateMaterialDto = UpdateMaterialDto.create({
			id: Number(id),
			name
		});

		new UpdateMaterial(this.repository)
			.execute(updateMaterialDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response, next: NextFunction) => {
		const { id } = req.params;

		new DeleteMaterial(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
