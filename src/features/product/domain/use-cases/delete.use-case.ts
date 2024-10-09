import { type ProductRepository } from '../repository/repository';

export interface DeleteProductUseCase {
	execute(id: number): Promise<unknown>;
}

export class DeleteProduct implements DeleteProductUseCase {
	constructor(private readonly repository: ProductRepository) {}

	execute(id: number): Promise<unknown> {
		return this.repository.deleteProduct(id);
	}
}
