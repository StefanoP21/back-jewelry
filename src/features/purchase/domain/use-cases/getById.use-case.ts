import { type PurchaseEntity } from '../entities/purchase.entity';
import { type PurchaseRepository } from '../repository/repository';

export interface GetPurchaseByIsUseCase {
	execute(id: number): Promise<PurchaseEntity>;
}

export class GetPurchaseById implements GetPurchaseByIsUseCase {
	constructor(private readonly repository: PurchaseRepository) {}

	execute(id: number): Promise<PurchaseEntity> {
		return this.repository.getById(id);
	}
}
