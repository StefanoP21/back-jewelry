import { CustomError, envs, ErrorMessages, JwtAdapter } from '../../../core';
import { prisma } from '../../../data/postgresql';
import {
	AuthEntity,
	UserEntity,
	UserResponseEntity,
	type AuthDatasource,
	type LoginUserDto,
	type RegisterUserDto,
	type UpdatePasswordUserDto
} from '../domain';

type Hash = (password: string) => string;
type Compare = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
	constructor(
		private readonly hash: Hash,
		private readonly compare: Compare
	) {}

	private async handleToken(dni: string): Promise<string> {
		const jwtAdapter = new JwtAdapter(envs.JWT_SEED);
		const token = await jwtAdapter.generateToken<string>({ dni });
		if (!token) throw CustomError.internalServer('Error al generar el token');
		return token;
	}

	async register(dto: RegisterUserDto): Promise<AuthEntity> {
		try {
			const existUser = await prisma.user.findUnique({ where: { dni: dto.dni } });
			if (existUser)
				throw CustomError.badRequest(ErrorMessages.USER_ALREADY_REGISTERED, [
					{ constraint: 'El dni es único', fields: ['dni'] }
				]);

			const user = await prisma.user.create({ data: dto });

			//* encrypt password
			user.password = this.hash(dto.password);
			await prisma.user.update({ where: { id: user.id }, data: { password: user.password } });

			const { password, ...rest } = UserEntity.fromObject(user);

			//* jwt
			const token = await this.handleToken(user.dni);

			return new AuthEntity(rest, token);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al registrar el usuario: ${error}`);
		}
	}

	async login(dto: LoginUserDto): Promise<AuthEntity> {
		try {
			const user = await prisma.user.findUnique({ where: { dni: dto.dni } });
			if (!user) throw CustomError.badRequest(ErrorMessages.USER_NOT_FOUND);

			//* validate password
			const passwordIsValid = this.compare(dto.password, user.password);
			if (!passwordIsValid) throw CustomError.badRequest(ErrorMessages.INVALID_CREDENTIALS);

			const { password, ...rest } = UserEntity.fromObject(user);

			//* jwt
			const token = await this.handleToken(user.dni);

			return new AuthEntity(rest, token);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al iniciar sesión: ${error}`);
		}
	}

	async updatePassword(dto: UpdatePasswordUserDto): Promise<unknown> {
		try {
			const user = await prisma.user.findUnique({ where: { dni: dto.dni } });
			if (!user) throw CustomError.badRequest(ErrorMessages.USER_NOT_FOUND);

			const passwordIsValid = this.compare(dto.password, user.password);
			if (!passwordIsValid) throw CustomError.badRequest('La contraseña es incorrecta');

			// Change password
			user.password = this.hash(dto.newPassword);

			await prisma.user.update({ where: { id: user.id }, data: { password: user.password } });

			return { message: 'Contraseña actualizada' };
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al actualizar la contraseña: ${error}`);
		}
	}

	async renew(dni: string): Promise<AuthEntity> {
		try {
			const user = await prisma.user.findUnique({ where: { dni } });
			if (!user) throw CustomError.badRequest(ErrorMessages.USER_NOT_FOUND);

			const { password, ...rest } = UserEntity.fromObject(user);

			//* jwt
			const token = await this.handleToken(user.dni);

			return new AuthEntity(rest, token);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al renovar el token: ${error}`);
		}
	}

	async getAll(): Promise<UserResponseEntity[]> {
		try {
			const users = await prisma.user.findMany({ orderBy: [{ role: 'asc' }, { name: 'asc' }] });

			return users.map((user) => {
				const { password, ...rest } = UserEntity.fromObject(user);
				return new UserResponseEntity(rest);
			});
		} catch (error) {
			throw CustomError.internalServer(`Error al obtener los usuarios: ${error}`);
		}
	}

	async delete(id: number): Promise<UserResponseEntity> {
		try {
			const user = await prisma.user.findUnique({ where: { id } });
			if (!user) throw CustomError.badRequest('Usuario no encontrado');

			await prisma.user.delete({ where: { id: user.id } });

			const { password, ...rest } = UserEntity.fromObject(user);

			return new UserResponseEntity(rest);
		} catch (error) {
			throw CustomError.internalServer(`Error al eliminar el usuario: ${error}`);
		}
	}
}
