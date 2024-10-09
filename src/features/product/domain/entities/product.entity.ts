import { CustomError, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';

interface ProductEntityProps {
	id: number;
	name: string;
	description: string;
	categoryId: number;
	image: string;
	material: string;
	price: Decimal;
	stock: number;
}

export class ProductEntity {
	constructor(
		public readonly id: number,
		public readonly name: string,
		public readonly description: string,
		public readonly categoryId: number,
		public readonly image: string,
		public readonly material: string,
		public readonly price: Decimal,
		public readonly stock: number
	) {}

	static fromObject(object: ProductEntityProps): ProductEntity {
		const { id, name, description, categoryId, image, material, price, stock } = object;

		if (!id)
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);

		if (!name || name.length === ZERO)
			throw CustomError.badRequest('This entity requires a name', [
				{ constraint: 'name is required', fields: ['name'] }
			]);

		if (!description || description.length === ZERO)
			throw CustomError.badRequest('This entity requires a description', [
				{ constraint: 'description is required', fields: ['description'] }
			]);

		if (!categoryId || categoryId <= ZERO)
			throw CustomError.badRequest('This entity requires a categoryId', [
				{ constraint: 'categoryId is required', fields: ['categoryId'] }
			]);

		if (!image || image.length === ZERO)
			throw CustomError.badRequest('This entity requires an image', [
				{ constraint: 'image is required', fields: ['image'] }
			]);

		if (!material || material.length === ZERO)
			throw CustomError.badRequest('This entity requires a material', [
				{ constraint: 'material is required', fields: ['material'] }
			]);

		if (!price || price.toNumber() < ZERO)
			throw CustomError.badRequest('This entity requires a price', [
				{ constraint: 'price is required', fields: ['price'] }
			]);

		if (!stock || stock < ZERO)
			throw CustomError.badRequest('This entity requires a stock', [
				{ constraint: 'stock is required', fields: ['stock'] }
			]);

		return new ProductEntity(id, name, description, categoryId, image, material, price, stock);
	}
}
