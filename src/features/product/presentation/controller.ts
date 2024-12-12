import { type Request, type Response, type NextFunction } from 'express';
import {
	type ProductEntity,
	type ProductRepository,
	CreateProductDto,
	UpdateProductDto,
	GetAllProducts,
	GetProductById,
	CreateProduct,
	UpdateProduct,
	DeleteProduct
} from '../domain';
import { HttpCode, type SuccessResponse } from '../../../core';
import { Decimal } from '../../../data/postgresql';

interface Params {
	id: string;
}

interface RequestBody {
	name: string;
	description: string;
	categoryId: number;
	image: string;
	materialId: number;
	price: Decimal;
	status: boolean;
}

export class ProductController {
	constructor(private readonly repository: ProductRepository) {}

	public getAll = (_req: Request, res: Response<SuccessResponse<ProductEntity[]>>, next: NextFunction) => {
		new GetAllProducts(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getById = (req: Request, res: Response<SuccessResponse<ProductEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new GetProductById(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public create = (
		req: Request<unknown, unknown, RequestBody>,
		res: Response<SuccessResponse<ProductEntity>>,
		next: NextFunction
	) => {
		const { name, description, categoryId, image, materialId } = req.body;

		const createProductDto = CreateProductDto.create({
			name,
			description,
			categoryId,
			image,
			materialId
		});

		new CreateProduct(this.repository)
			.execute(createProductDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public update = (
		req: Request<Params, unknown, RequestBody>,
		res: Response<SuccessResponse<ProductEntity>>,
		next: NextFunction
	) => {
		const { id } = req.params;
		const { name, description, categoryId, image, materialId, price, status } = req.body;

		const updateProductDto = UpdateProductDto.create({
			id: Number(id),
			name,
			description,
			categoryId,
			image,
			materialId,
			price,
			status
		});

		new UpdateProduct(this.repository)
			.execute(updateProductDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public delete = (req: Request<Params>, res: Response<SuccessResponse<ProductEntity>>, next: NextFunction) => {
		const { id } = req.params;

		new DeleteProduct(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
