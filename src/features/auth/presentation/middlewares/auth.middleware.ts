import { type NextFunction, type Request, type Response } from 'express';
import { AuthRepository, RenewUser } from '../../domain';
import { CustomError, envs, JwtAdapter, ONE } from '../../../../core';

export class AuthMiddleware {
	constructor(private readonly repository: AuthRepository) {}

	public async validateJWT(req: Request, _res: Response, next: NextFunction) {
		const authorization = req.header('Authorization');
		if (!authorization) throw CustomError.unauthorized('No hay un token en la petición');

		if (!authorization.startsWith('Bearer '))
			throw CustomError.unauthorized('Header de autorización no válido (se requiere Bearer token)');

		const token = authorization.split(' ').at(ONE) ?? '';

		const jwtAdapter = new JwtAdapter(envs.JWT_SEED);
		const payload = await jwtAdapter.validateToken<{ dni: string }>(token);

		if (!payload) throw CustomError.unauthorized('Token inválido');

		new RenewUser(this.repository)
			.execute(payload.dni)
			.then((result) => {
				req.body.data = result;
				next();
			})
			.catch(next);
	}
}
