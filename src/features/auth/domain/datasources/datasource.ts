import { type UpdatePasswordUserDto, type LoginUserDto, type RegisterUserDto } from '../dtos';
import { type UserEntity, type AuthEntity } from '../entities';

export abstract class AuthDatasource {
	abstract register(dto: RegisterUserDto): Promise<AuthEntity>;
	abstract login(dto: LoginUserDto): Promise<AuthEntity>;
	abstract renew(dni: string): Promise<AuthEntity>;
	abstract updatePassword(dto: UpdatePasswordUserDto): Promise<unknown>;
	abstract getAll(): Promise<UserEntity[]>;
	abstract delete(id: number): Promise<UserEntity>;
}
