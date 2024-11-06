import { type RefundEntity } from '../entities/refund.entity';
import { type RefundRepository } from '../repository/repository';

export interface GetRefundByIdUseCase {
	execute(id: number): Promise<RefundEntity>;
}

export class GetRefundById implements GetRefundByIdUseCase {
	constructor(private readonly repository: RefundRepository) {}

	execute(id: number): Promise<RefundEntity> {
		return this.repository.getById(id);
	}
}
