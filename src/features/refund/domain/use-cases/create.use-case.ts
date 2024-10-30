import { type RefundDto } from '../dtos';
import { type RefundEntity } from '../entities/refund.entity';
import { type RefundRepository } from '../repository/repository';

export interface CreateRefundUseCase {
	execute(dto: RefundDto): Promise<RefundEntity>;
}

export class CreateRefund implements CreateRefundUseCase {
	constructor(private readonly repository: RefundRepository) {}

	execute(dto: RefundDto): Promise<RefundEntity> {
		return this.repository.create(dto);
	}
}
