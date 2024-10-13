import { type UserEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface GetAllUsersUseCase {
	execute(): Promise<UserEntity[]>;
}

export class GetAllUsers implements GetAllUsersUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(): Promise<UserEntity[]> {
		return this.repository.getAll();
	}
}
