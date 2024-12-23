import { type Request, type Response, type NextFunction } from 'express';
import {
	type AuthEntity,
	type AuthRepository,
	type UserResponseEntity,
	LoginUser,
	LoginUserDto,
	RegisterUser,
	RegisterUserDto,
	UpdatePasswordUser,
	UpdatePasswordUserDto,
	RenewUser,
	GetAllUsers,
	DeleteUser,
	UpdateStatusUser
} from '../domain';
import { HttpCode, Role, type SuccessResponse } from '../../../core';

interface RequestBodyUpdatePassword {
	dni: string;
	password: string;
	newPassword: string;
}

interface RequestBodyLogin {
	dni: string;
	password: string;
}

interface RequestBodyRegister {
	name: string;
	lastname: string;
	email: string;
	dni: string;
	password: string;
	role: Role;
}

export class AuthController {
	constructor(private readonly repository: AuthRepository) {}

	public registerUser = (
		req: Request<unknown, unknown, RequestBodyRegister>,
		res: Response<SuccessResponse<AuthEntity>>,
		next: NextFunction
	) => {
		const { name, lastname, email, dni, password, role } = req.body;
		const registerUserDto = RegisterUserDto.create({
			name,
			lastname,
			email,
			dni,
			password,
			role
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
		const { dni, password } = req.body;
		const loginUserDto = LoginUserDto.create({ dni, password });

		new LoginUser(this.repository)
			.execute(loginUserDto)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public updatePassword = (
		req: Request<unknown, unknown, RequestBodyUpdatePassword>,
		res: Response<unknown>,
		next: NextFunction
	) => {
		const { dni, password, newPassword } = req.body;
		const updatePasswordUserDto = UpdatePasswordUserDto.create({ dni, password, newPassword });

		new UpdatePasswordUser(this.repository)
			.execute(updatePasswordUserDto)
			.then((result) => res.status(HttpCode.OK).json(result))
			.catch(next);
	};

	public updateStatus = (req: Request, res: Response<unknown>, next: NextFunction) => {
		const { id } = req.params;

		new UpdateStatusUser(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json(result))
			.catch(next);
	};

	public renewUser = (req: Request, res: Response<SuccessResponse<AuthEntity>>, next: NextFunction) => {
		const { dni } = req.body.data.user;

		new RenewUser(this.repository)
			.execute(dni)
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public getAllUsers = (_req: Request, res: Response<SuccessResponse<UserResponseEntity[]>>, next: NextFunction) => {
		new GetAllUsers(this.repository)
			.execute()
			.then((result) => res.status(HttpCode.OK).json({ data: result }))
			.catch(next);
	};

	public deleteUser = (req: Request, res: Response<UserResponseEntity>, next: NextFunction) => {
		const { id } = req.params;

		new DeleteUser(this.repository)
			.execute(Number(id))
			.then((result) => res.status(HttpCode.OK).json(result))
			.catch(next);
	};
}
