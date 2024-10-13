import { type UserResponseEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface DeleteUserUseCase {
	execute(id: number): Promise<UserResponseEntity>;
}

export class DeleteUser implements DeleteUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(id: number): Promise<UserResponseEntity> {
		return this.repository.delete(id);
	}
}
