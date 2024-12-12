import { type AuthRepository } from '../repositories/repository';

export interface UpdateStatusUserUseCase {
	execute(id: number): Promise<unknown>;
}

export class UpdateStatusUser implements UpdateStatusUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(id: number): Promise<unknown> {
		return this.repository.updateStatus(id);
	}
}
