import { AuthRepository } from '../repositories/repository';

export interface DeleteUserUseCase {
	execute(id: number): Promise<unknown>;
}

export class DeleteUser implements DeleteUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(id: number): Promise<unknown> {
		return this.repository.delete(id);
	}
}
