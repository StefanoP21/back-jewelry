import { type RegisterUserDto } from '../dtos';
import { type AuthEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface RegisterUserUseCase {
	execute(dto: RegisterUserDto): Promise<AuthEntity>;
}

export class RegisterUser implements RegisterUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(dto: RegisterUserDto): Promise<AuthEntity> {
		return this.repository.register(dto);
	}
}
