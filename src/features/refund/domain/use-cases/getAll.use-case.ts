import { type RefundEntity } from '../entities/refund.entity';
import { type RefundRepository } from '../repository/repository';

export interface GetAllRefundsUseCase {
	execute(): Promise<RefundEntity[]>;
}

export class GetAllRefunds implements GetAllRefundsUseCase {
	constructor(private readonly repository: RefundRepository) {}

	execute(): Promise<RefundEntity[]> {
		return this.repository.getAll();
	}
}
