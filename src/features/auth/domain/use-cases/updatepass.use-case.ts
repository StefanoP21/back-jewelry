import { type UpdatePasswordUserDto } from '../dtos';
import { type AuthRepository } from '../repositories/repository';

export interface UpdatePasswordUserUseCase {
	execute(dto: UpdatePasswordUserDto): Promise<unknown>;
}

export class UpdatePasswordUser implements UpdatePasswordUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(dto: UpdatePasswordUserDto): Promise<unknown> {
		return this.repository.updatePassword(dto);
	}
}
