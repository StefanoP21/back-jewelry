import { CustomError, ZERO } from '../../../../core';
import { Decimal } from '../../../../data/postgresql';

interface CategoryEntityProps {
	id: number;
	name: string;
}

interface ProductEntityProps {
	id: number;
	name: string;
	description: string;
	category: CategoryEntityProps;
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
		public readonly category: CategoryEntityProps,
		public readonly image: string,
		public readonly material: string,
		public readonly price: Decimal,
		public readonly stock: number
	) {}

	static fromObject(object: ProductEntityProps): ProductEntity {
		const { id, name, description, category, image, material, price, stock } = object;

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

		if (!category)
			throw CustomError.badRequest('This entity requires a categoryId', [
				{ constraint: 'categoryId is required', fields: ['categoryId'] }
			]);

		if (!category.id) {
			throw CustomError.badRequest('This entity requires a category id', [
				{ constraint: 'category id is required', fields: ['category.id'] }
			]);
		}

		if (!category.name || category.name.length === ZERO) {
			throw CustomError.badRequest('This entity requires a category name', [
				{ constraint: 'category name is required', fields: ['category.name'] }
			]);
		}

		if (!image || image.length === ZERO)
			throw CustomError.badRequest('This entity requires an image', [
				{ constraint: 'image is required', fields: ['image'] }
			]);

		if (!material || material.length === ZERO)
			throw CustomError.badRequest('This entity requires a material', [
				{ constraint: 'material is required', fields: ['material'] }
			]);

		if (!price || price.toNumber() <= ZERO)
			throw CustomError.badRequest('This entity requires a price', [
				{ constraint: 'price is required', fields: ['price'] }
			]);

		if (!stock || stock <= ZERO)
			throw CustomError.badRequest('This entity requires a stock', [
				{ constraint: 'stock is required', fields: ['stock'] }
			]);

		return new ProductEntity(id, name, description, category, image, material, price, stock);
	}
}
