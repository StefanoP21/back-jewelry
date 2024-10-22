import { type NextFunction, type Request, type Response } from 'express';
import { AuthRepository, RenewUser } from '../../domain';
import { CustomError, envs, ErrorMessages, JwtAdapter, ONE } from '../../../../core';

export class AuthMiddleware {
	constructor(private readonly repository: AuthRepository) {}

	public validateJWT = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
		try {
			const authorization = req.header('Authorization');
			if (!authorization) throw CustomError.unauthorized(ErrorMessages.TOKEN_NOT_FOUND);
			if (!authorization.startsWith('Bearer '))
				throw CustomError.unauthorized(ErrorMessages.WRONG_AUTHORIZATION_HEADER);

			const token = authorization.split(' ').at(ONE) ?? '';
			const jwtAdapter = new JwtAdapter(envs.JWT_SEED);
			const payload = await jwtAdapter.validateToken<{ dni: string }>(token);
			if (!payload) throw CustomError.unauthorized(ErrorMessages.INVALID_TOKEN);

			const result = await new RenewUser(this.repository).execute(payload.dni);
			req.body.data = result;
			next();
		} catch (error) {
			next(error);
		}
	};
}
