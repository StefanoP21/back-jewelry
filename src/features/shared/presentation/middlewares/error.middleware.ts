import { NextFunction, Request, Response } from 'express';
import { CustomError, HttpCode } from '../../../../core';

export class ErrorMiddleware {
	public static handleError = (error: unknown, _req: Request, res: Response, next: NextFunction): void => {
		if (error instanceof CustomError) {
			const { name, message, stack, validationErrors } = error;
			const statusCode = error.statusCode || HttpCode.INTERNAL_SERVER_ERROR;

			res.statusCode = statusCode;
			res.json({ name, message, validationErrors, stack });
		} else {
			const name = 'InternalServerError';
			const message = 'Ocurrio un error interno en el servidor';
			const statusCode = HttpCode.INTERNAL_SERVER_ERROR;

			res.statusCode = statusCode;
			res.json({ name, message });
		}
		next();
	};
}
