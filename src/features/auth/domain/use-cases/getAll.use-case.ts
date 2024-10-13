import { type UserResponseEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface GetAllUsersUseCase {
	execute(): Promise<UserResponseEntity[]>;
}

export class GetAllUsers implements GetAllUsersUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(): Promise<UserResponseEntity[]> {
		return this.repository.getAll();
	}
}
