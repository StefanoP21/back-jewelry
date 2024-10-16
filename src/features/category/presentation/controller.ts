import { type Request, type Response, type NextFunction } from 'express';
import {
	type CategoryEntity,
	type CategoryRepository,
	CreateCategoryDto,
	UpdateCategoryDto,
	GetAllCategories,
	GetCategoryById,
	CreateCategory,
	UpdateCategory,
	DeleteCategory
} from '../domain';
import { HttpCode, type SuccessResponse } from '../../../core';

interface Params {
	id: string;
}

interface RequestBody {
	name: string;
}

export class CategoryController {
	constructor(private readonly repository: CategoryRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<CategoryEntity[]>>, next: NextFunction) => {
		new GetAllCategories(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request, res: Response<SuccessResponse<CategoryEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetCategoryById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<CategoryEntity>>,
		next: NextFunction
	) => {
		const { name } = req.body;

		const createCategoryDto = CreateCategoryDto.create({ name });

		new CreateCategory(this.repository)
			.execute(createCategoryDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<CategoryEntity>>,
		next: NextFunction
	) => {
		const { id } = req.params;
		const { name } = req.body;

		const updateCategoryDto = UpdateCategoryDto.create({
			id: Number(id),
			name: name
		});

		new UpdateCategory(this.repository)
			.execute(updateCategoryDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<CategoryEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new DeleteCategory(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
