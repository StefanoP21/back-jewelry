import { type PurchaseEntity } from '../entities/purchase.entity';
import { type PurchaseRepository } from '../repository/repository';

export interface DeletePurchaseUseCase {
	execute(id: number): Promise<PurchaseEntity>;
}

export class DeletePurchase implements DeletePurchaseUseCase {
	constructor(private readonly repository: PurchaseRepository) {}

	execute(id: number): Promise<PurchaseEntity> {
		return this.repository.delete(id);
	}
}
