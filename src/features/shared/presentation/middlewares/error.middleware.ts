import { type NextFunction, type Request, type Response } from 'express';
import { CustomError, type ErrorResponse, HttpCode } from '../../../../core';

export class ErrorMiddleware {
	public static handleError = (
		error: unknown,
		_req: Request,
		res: Response<ErrorResponse>,
		next: NextFunction
	): void => {
		if (error instanceof CustomError) {
			const { name, message, stack, validationErrors } = error;
			res.statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;
			res.json({ name, message, validationErrors, stack });
		} else {
			const name = 'InternalServerError';
			const message = 'Ocurrio un error interno en el servidor';
			res.statusCode = HttpCode.INTERNAL_SERVER_ERROR;
			res.json({ name, message });
		}
		next();
	};
}
