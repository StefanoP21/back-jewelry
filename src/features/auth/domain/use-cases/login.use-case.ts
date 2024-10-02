import { type LoginUserDto } from '../dtos';
import { type AuthEntity } from '../entities';
import { type AuthRepository } from '../repositories/repository';

export interface LoginUserUseCase {
	execute(dto: LoginUserDto): Promise<AuthEntity>;
}

export class LoginUser implements LoginUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(dto: LoginUserDto): Promise<AuthEntity> {
		return this.repository.login(dto);
	}
}
