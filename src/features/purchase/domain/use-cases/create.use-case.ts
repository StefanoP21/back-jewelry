import { type PurchaseDto } from '../dtos';
import { type PurchaseEntity } from '../entities/purchase.entity';
import { type PurchaseRepository } from '../repository/repository';

export interface CreatePurchaseUseCase {
	execute(dto: PurchaseDto): Promise<PurchaseEntity>;
}

export class CreatePurchase implements CreatePurchaseUseCase {
	constructor(private readonly repository: PurchaseRepository) {}

	execute(dto: PurchaseDto): Promise<PurchaseEntity> {
		return this.repository.create(dto);
	}
}
