import {
	type UpdatePasswordUserDto,
	type AuthDatasource,
	type AuthEntity,
	type AuthRepository,
	type LoginUserDto,
	type RegisterUserDto,
	type UserEntity
} from '../domain';

export class AuthRepositoryImpl implements AuthRepository {
	constructor(private readonly datasource: AuthDatasource) {}

	register(dto: RegisterUserDto): Promise<AuthEntity> {
		return this.datasource.register(dto);
	}

	login(dto: LoginUserDto): Promise<AuthEntity> {
		return this.datasource.login(dto);
	}

	renew(dni: string): Promise<AuthEntity> {
		return this.datasource.renew(dni);
	}

	updatePassword(dto: UpdatePasswordUserDto): Promise<unknown> {
		return this.datasource.updatePassword(dto);
	}

	getAll(): Promise<UserEntity[]> {
		return this.datasource.getAll();
	}

	delete(id: number): Promise<UserEntity> {
		return this.datasource.delete(id);
	}
}
