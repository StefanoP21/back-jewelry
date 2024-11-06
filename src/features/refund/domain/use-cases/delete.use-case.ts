import { type RefundEntity } from '../entities/refund.entity';
import { type RefundRepository } from '../repository/repository';

export interface DeleteRefundUseCase {
	execute(id: number): Promise<RefundEntity>;
}

export class DeleteRefund implements DeleteRefundUseCase {
	constructor(private readonly repository: RefundRepository) {}

	execute(id: number): Promise<RefundEntity> {
		return this.repository.delete(id);
	}
}
