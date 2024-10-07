import {
	type AuthDatasource,
	type AuthEntity,
	type AuthRepository,
	type LoginUserDto,
	type RegisterUserDto
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
}
