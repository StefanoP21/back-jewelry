import { CustomError, ZERO } from '../../../../core';

interface CategoryEntityProps {
	id: number;
	name: string;
}

export class CategoryEntity {
	constructor(
		public readonly id: number,
		public readonly name: string
	) {}

	static fromObject(object: CategoryEntityProps): CategoryEntity {
		const { id, name } = object;

		if (!id)
			throw CustomError.badRequest('This entity requires an id', [{ constraint: 'id is required', fields: ['id'] }]);

		if (!name || name.length === ZERO)
			throw CustomError.badRequest('This entity requires a name', [
				{ constraint: 'name is required', fields: ['name'] }
			]);

		return new CategoryEntity(id, name);
	}
}
