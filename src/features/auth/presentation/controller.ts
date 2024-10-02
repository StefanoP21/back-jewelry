import { type Request, type Response, type NextFunction } from 'express';
import {
	type AuthEntity,
	type AuthRepository,
	LoginUser,
	LoginUserDto,
	RegisterUser,
	RegisterUserDto
	// RenewUser
} from '../domain';
import { HttpCode, SuccessResponse } from '../../../core';

interface RequestBodyLogin {
	email: string;
	password: string;
}

interface RequestBodyRegister {
	name: string;
	lastname: string;
	email: string;
	password: string;
}

export class AuthController {
	constructor(private readonly repository: AuthRepository) {}

	public registerUser = (
		req: Request<unknown, unknown, RequestBodyRegister>,
		res: Response<SuccessResponse<AuthEntity>>,
		next: NextFunction
	) => {
		const { name, lastname, email, password } = req.body;
		const registerUserDto = RegisterUserDto.create({
			name,
			lastname,
			email,
			password
		});

		new RegisterUser(this.repository)
			.execute(registerUserDto)
			.then((result) => res.status(HttpCode.CREATED).json({ data: result }))
			.catch(next);
	};

	public loginUser = (
		req: Request<unknown, unknown, RequestBodyLogin>,
		res: Response<SuccessResponse<AuthEntity>>,
		next: NextFunction
	) => {
		const { email, password } = req.body;
		const loginUserDto = LoginUserDto.create({ email, password });

		new LoginUser(this.repository)
			.execute(loginUserDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};
}
