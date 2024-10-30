import { type RefundDto } from '../dtos';
import { type RefundEntity } from '../entities/refund.entity';

export abstract class RefundRepository {
	abstract create(dto: RefundDto): Promise<RefundEntity>;
	abstract getAll(): Promise<RefundEntity[]>;
	abstract getById(id: number): Promise<RefundEntity>;
	abstract delete(id: number): Promise<RefundEntity>;
}
