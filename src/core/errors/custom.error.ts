import { ErrorType, HttpCode } from '../constants';
import { ValidationType } from '../types';

interface CustomErrorArgs {
	name?: string;
	statusCode: HttpCode;
	message: string;
	isOperational?: boolean;
	validationErrors?: ValidationType[];
}

export class CustomError extends Error {
	public readonly name: string;
	public readonly statusCode: HttpCode;
	public readonly isOperational: boolean = true;
	public readonly validationErrors?: ValidationType[];

	constructor(args: CustomErrorArgs) {
		const { message, statusCode, isOperational, name, validationErrors } = args;

		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = name ?? 'Aplication error';
		this.statusCode = statusCode;

		if (isOperational !== undefined) this.isOperational = isOperational;
		this.validationErrors = validationErrors;

		Error.captureStackTrace(this);
	}

	static badRequest(message: string, validationErrors?: ValidationType[]): CustomError {
		return new CustomError({
			name: ErrorType.BAD_REQUEST,
			message,
			statusCode: HttpCode.BAD_REQUEST,
			validationErrors
		});
	}

	static unauthorized(message: string): CustomError {
		return new CustomError({
			name: ErrorType.UNAUTHORIZED,
			message,
			statusCode: HttpCode.UNAUTHORIZED
		});
	}

	static forbidden(message: string): CustomError {
		return new CustomError({
			name: ErrorType.FORBIDDEN,
			message,
			statusCode: HttpCode.FORBIDDEN
		});
	}

	static notFound(message: string): CustomError {
		return new CustomError({
			name: ErrorType.NOT_FOUND,
			message,
			statusCode: HttpCode.NOT_FOUND
		});
	}

	static internalServer(message: string): CustomError {
		return new CustomError({
			name: ErrorType.INTERNAL_SERVER_ERROR,
			message,
			statusCode: HttpCode.INTERNAL_SERVER_ERROR
		});
	}
}
