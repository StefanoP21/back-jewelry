// import { BcryptAdapter, CustomError, envs, JwtAdapter } from '../../../core';
// import { AuthEntity, UserEntity, type AuthDatasource, type LoginUserDto, type RegisterUserDto } from '../domain';

// export class AuthDatasourceImpl implements AuthDatasource {
// 	private async handleToken(id: string): Promise<string> {
// 		const jwtAdapter = new JwtAdapter(envs.JWT_SEED);
// 		const token = await jwtAdapter.generateToken<string>({ id });

// 		if (!token) throw CustomError.internalServer('Error al generar el token');

// 		return token;
// 	}

// 	async register(dto: RegisterUserDto): Promise<AuthEntity> {
// 		const existUser = await UserModel.findOne({ email: dto.email });
// 		if (existUser)
// 			throw CustomError.badRequest('El correo se encuentra registrado', [
// 				{ constraint: 'User already exist', fields: ['email'] }
// 			]);

// 		try {
// 			const user = new UserModel(dto);

// 			//* encrypt password
// 			user.password = BcryptAdapter.hash(dto.password);

// 			await user.save();

// 			const { password, ...rest } = UserEntity.fromObject(user);

// 			//* jwt
// 			const token = await this.handleToken(user.id);

// 			return new AuthEntity(rest, token);
// 		} catch (error) {
// 			throw CustomError.internalServer('Internal server error');
// 		}
// 	}

// 	async login(dto: LoginUserDto): Promise<AuthEntity> {
// 		const user = await UserModel.findOne({ email: dto.email });
// 		if (!user) throw CustomError.badRequest('Usuario no encontrado con este correo');

// 		//* validate password
// 		const passwordIsValid = BcryptAdapter.compare(dto.password, user.password);
// 		if (!passwordIsValid) throw CustomError.badRequest('Contraseña incorrecta');

// 		const { password, ...rest } = UserEntity.fromObject(user);

// 		//* jwt
// 		const token = await this.handleToken(user.id);

// 		return new AuthEntity(rest, token);
// 	}

// 	async renew(id: string): Promise<AuthEntity> {
// 		const user = await UserModel.findById(id);
// 		if (!user) throw CustomError.badRequest('Usuario no encontrado');

// 		const { password, ...rest } = UserEntity.fromObject(user);

// 		//* jwt
// 		const token = await this.handleToken(user.id);

// 		return new AuthEntity(rest, token);
// 	}
// }
