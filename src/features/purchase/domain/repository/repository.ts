import { type PurchaseDto } from '../dtos';
import { type PurchaseEntity } from '../entities/purchase.entity';

export abstract class PurchaseRepository {
	abstract create(dto: PurchaseDto): Promise<PurchaseEntity>;
	abstract getAll(): Promise<PurchaseEntity[]>;
	abstract getById(id: number): Promise<PurchaseEntity>;
	abstract delete(id: number): Promise<PurchaseEntity>;
}
