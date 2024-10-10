import { type Request, type Response, type NextFunction } from 'express';
import { Decimal } from '../../../data/postgresql';
import {
	type ProductEntity,
	type ProductRepository,
	CreateProductDto,
	UpdateProductDto,
	GetProducts,
	GetProductById,
	CreateProduct,
	UpdateProduct,
	DeleteProduct
} from '../domain';
import { HttpCode, SuccessResponse } from '../../../core';

interface RequestBodyProduct {
	id: number;
	name: string;
	description: string;
	categoryId: number;
	image: string;
	material: string;
	price: Decimal;
}

export class ProductController {
	constructor(private readonly repository: ProductRepository) {}

	public getProducts = (_req: Request, res: Response<SuccessResponse<ProductEntity[]>>, next: NextFunction) => {
		new GetProducts(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getProductById = (req: Request, res: Response<SuccessResponse<ProductEntity>>, next: NextFunction) => {
		const { id } = req.body;

		new GetProductById(this.repository)
			.execute(id)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public createProduct = (
		req: Request<unknown, unknown, RequestBodyProduct>,
		res: Response<SuccessResponse<ProductEntity>>,
		next: NextFunction
	) => {
		const { name, description, categoryId, image, material, price } = req.body;

		const createProductDto = CreateProductDto.create({
			name,
			description,
			categoryId,
			image,
			material,
			price
		});

		new CreateProduct(this.repository)
			.execute(createProductDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public updateProduct = (
		req: Request<unknown, unknown, RequestBodyProduct>,
		res: Response<SuccessResponse<ProductEntity>>,
		next: NextFunction
	) => {
		const { id, name, description, categoryId, image, material, price } = req.body;

		const updateProductDto = UpdateProductDto.create({
			id,
			name,
			description,
			categoryId,
			image,
			material,
			price
		});

		new UpdateProduct(this.repository)
			.execute(updateProductDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public deleteProduct = (req: Request, res: Response<unknown>, next: NextFunction) => {
		const { id } = req.body;

		new DeleteProduct(this.repository)
			.execute(id)
			.then((result) => res.status(HttpCode.OK).json(result))
			.catch(next);
	};
}
