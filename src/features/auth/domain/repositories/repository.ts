import { type UpdatePasswordUserDto, type LoginUserDto, type RegisterUserDto } from '../dtos';
import { type AuthEntity } from '../entities';

export abstract class AuthRepository {
	abstract register(dto: RegisterUserDto): Promise<AuthEntity>;
	abstract login(dto: LoginUserDto): Promise<AuthEntity>;
	abstract updatePassword(dto: UpdatePasswordUserDto): Promise<unknown>;
	abstract renew(dni: string): Promise<AuthEntity>;
}
