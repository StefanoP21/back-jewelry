import { BcryptAdapter, CustomError, envs, JwtAdapter } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { AuthEntity, UserEntity, type AuthDatasource, type LoginUserDto, type RegisterUserDto } from '../domain';

export class AuthDatasourceImpl implements AuthDatasource {
	private async handleToken(dni: string): Promise<string> {
		const jwtAdapter = new JwtAdapter(envs.JWT_SEED);
		const token = await jwtAdapter.generateToken<string>({ dni });

		if (!token) throw CustomError.internalServer('Error al generar el token');

		return token;
	}

	async register(dto: RegisterUserDto): Promise<AuthEntity> {
		const existUser = await prisma.user.findFirst({ where: { dni: dto.dni } });
		if (existUser)
			throw CustomError.badRequest('Usuario ya registrado', [{ constraint: 'El dni es único', fields: ['dni'] }]);

		const user = await prisma.user.create({ data: dto });

		//* encrypt password
		user.password = BcryptAdapter.hash(dto.password);

		await prisma.user.update({ where: { id: user.id }, data: { password: user.password } });

		const { password, ...rest } = UserEntity.fromObject(user);

		//* jwt
		const token = await this.handleToken(user.dni);

		return new AuthEntity(rest, token);
	}

	async login(dto: LoginUserDto): Promise<AuthEntity> {
		const user = await prisma.user.findFirst({ where: { dni: dto.dni } });
		if (!user) throw CustomError.badRequest('Usuario no encontrado');

		//* validate password
		const passwordIsValid = BcryptAdapter.compare(dto.password, user.password);
		if (!passwordIsValid) throw CustomError.badRequest('Contraseña incorrecta');

		const { password, ...rest } = UserEntity.fromObject(user);

		//* jwt
		const token = await this.handleToken(user.dni);

		return new AuthEntity(rest, token);
	}

	async renew(dni: string): Promise<AuthEntity> {
		const user = await prisma.user.findFirst({ where: { dni } });
		if (!user) throw CustomError.badRequest('Usuario no encontrado');

		const { password, ...rest } = UserEntity.fromObject(user);

		//* jwt
		const token = await this.handleToken(user.dni);

		return new AuthEntity(rest, token);
	}
}
