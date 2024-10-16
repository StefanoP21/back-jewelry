import { type PurchaseEntity } from '../entities/purchase.entity';
import { type PurchaseRepository } from '../repository/repository';

export interface GetAllPurchasesUseCase {
	execute(): Promise<PurchaseEntity[]>;
}

export class GetAllPurchases implements GetAllPurchasesUseCase {
	constructor(private readonly repository: PurchaseRepository) {}

	execute(): Promise<PurchaseEntity[]> {
		return this.repository.getAll();
	}
}
