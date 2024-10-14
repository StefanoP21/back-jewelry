import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

beforeAll(async () => {
	await testServer.start();
});

afterAll(async () => {
	testServer.close();
});

beforeEach(async () => {
	await prisma.user.deleteMany({
		where: {
			dni: {
				not: '87654321'
			}
		}
	});
});

const user = {
	name: 'Stefano',
	lastname: 'Palomino',
	dni: '75622279',
	email: 'stefanop21@outlook.es',
	password: '123456',
	role: 'ADMIN'
};

describe('Testing auth routes', () => {
	it('should register a new user - api/auth/register', async () => {
		const { body } = await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				user: {
					id: expect.any(Number),
					name: user.name,
					lastname: user.lastname,
					dni: user.dni,
					email: user.email,
					role: user.role
				},
				token: expect.any(String)
			}
		});
	});

	it('should login a user - api/auth/login', async () => {
		await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);

		const { body } = await request(testServer.app)
			.post('/api/auth/login')
			.send({ dni: user.dni, password: user.password })
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				user: {
					id: expect.any(Number),
					name: user.name,
					lastname: user.lastname,
					dni: user.dni,
					email: user.email,
					role: user.role
				},
				token: expect.any(String)
			}
		});
	});

	it('should renew a token - api/auth/renew', async () => {
		await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);

		const { body } = await request(testServer.app)
			.post('/api/auth/login')
			.send({ dni: user.dni, password: user.password })
			.expect(HttpCode.OK);

		const { body: bodyRenew } = await request(testServer.app)
			.get('/api/auth/renew')
			.set('Authorization', `Bearer ${body.data.token}`)
			.expect(HttpCode.OK);

		expect(bodyRenew).toEqual({
			data: {
				user: {
					id: expect.any(Number),
					name: user.name,
					lastname: user.lastname,
					dni: user.dni,
					email: user.email,
					role: user.role
				},
				token: expect.any(String)
			}
		});
	});
});

describe('Testing auth routes - Error cases', () => {
	it('should return error when trying to register a user with an existing dni - api/auth/register', async () => {
		await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);

		const { body } = await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.BAD_REQUEST);

		expect(body).toEqual({
			name: ErrorType.BAD_REQUEST,
			message: ErrorMessages.USER_ALREADY_REGISTERED,
			validationErrors: expect.any(Array),
			stack: expect.any(String)
		});
	});

	it('should return error when trying to login with a non-existent user - api/auth/login', async () => {
		const { body } = await request(testServer.app)
			.post('/api/auth/login')
			.send({ dni: user.dni, password: user.password })
			.expect(HttpCode.BAD_REQUEST);

		expect(body).toEqual({
			name: ErrorType.BAD_REQUEST,
			message: ErrorMessages.USER_NOT_FOUND,
			stack: expect.any(String)
		});
	});

	it('should return error when trying to login with an invalid dni - api/auth/login', async () => {
		await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);

		const { body } = await request(testServer.app)
			.post('/api/auth/login')
			.send({ dni: '12345678', password: user.password })
			.expect(HttpCode.BAD_REQUEST);

		expect(body).toEqual({
			name: ErrorType.BAD_REQUEST,
			message: ErrorMessages.USER_NOT_FOUND,
			stack: expect.any(String)
		});
	});

	it('should return error when trying to login with an invalid password - api/auth/login', async () => {
		await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);

		const { body } = await request(testServer.app)
			.post('/api/auth/login')
			.send({ dni: user.dni, password: '1234567' })
			.expect(HttpCode.BAD_REQUEST);

		expect(body).toEqual({
			name: ErrorType.BAD_REQUEST,
			message: ErrorMessages.INVALID_CREDENTIALS,
			stack: expect.any(String)
		});
	});

	it('should return error when trying to renew a token with a non-authorization header - api/auth/renew', async () => {
		const { body } = await request(testServer.app).get('/api/auth/renew').expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.TOKEN_NOT_FOUND,
			stack: expect.any(String)
		});
	});

	it('should return error when trying to renew a token with an invalid bearer token', async () => {
		const { body: bodyRenew } = await request(testServer.app)
			.get('/api/auth/renew')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(bodyRenew).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when trying to renew a token with an invalid token - api/auth/renew', async () => {
		const { body: bodyRenew } = await request(testServer.app)
			.get('/api/auth/renew')
			.set('Authorization', `Bearer 123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(bodyRenew).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.INVALID_TOKEN,
			stack: expect.any(String)
		});
	});
});
