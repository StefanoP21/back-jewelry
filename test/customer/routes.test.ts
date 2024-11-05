import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

let customer = {
	name: 'Sebastian',
	lastName: 'Simon',
	email: 'sebas2@hotmail.com',
	dni: '98765432',
	phone: '334135669'
};

const user = {
	name: 'Sebastian',
	lastname: 'Egoavil',
	dni: '12345678',
	email: 'sebas@hotmail.com',
	password: '123456',
	role: 'ADMIN'
};

let token: string;

beforeAll(async () => {
	await testServer.start();

	const { body } = await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);
	token = body.data.token;
});

afterAll(async () => {
	await prisma.user.deleteMany();
	testServer.close();
});

describe('Testing customer routes', () => {
	it('should create a new customer - api/customer', async () => {
		const { body } = await request(testServer.app)
			.post('/api/customer')
			.set('Authorization', `Bearer ${token}`)
			.send(customer)
			.expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				lastName: expect.any(String),
				email: expect.any(String),
				dni: expect.any(String),
				phone: expect.any(String)
			}
		});
	});

	it('should update a customer - api/customer/:id', async () => {
		const id = await prisma.customer.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);
		const { body } = await request(testServer.app)
			.put(`/api/customer/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(customer)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				lastName: expect.any(String),
				email: expect.any(String),
				dni: expect.any(String),
				phone: expect.any(String)
			}
		});
	});

	it('should get all customers - api/customer', async () => {
		const { body } = await request(testServer.app)
			.get('/api/customer')
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Array)
		});
	});

	it('should get a customer by id - api/customer/:id', async () => {
		const id = await prisma.customer.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.get(`/api/customer/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				lastName: expect.any(String),
				email: expect.any(String),
				dni: expect.any(String),
				phone: expect.any(String)
			}
		});
	});

	it('should delete a customer - api/customer/:id', async () => {
		const id = await prisma.customer.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.delete(`/api/customer/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				lastName: expect.any(String),
				email: expect.any(String),
				dni: expect.any(String),
				phone: expect.any(String)
			}
		});
	});
});

describe('Testing customer routes - Error cases', () => {
	it('should return error when trying to get customers with an invalid bearer token', async () => {
		const { body } = await request(testServer.app)
			.get('/api/customer')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when get customer by id - api/customer/:id', async () => {
		const id = 999999;

		const { body } = await request(testServer.app)
			.get(`/api/customer/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.NOT_FOUND);

		expect(body).toEqual({
			name: ErrorType.NOT_FOUND,
			message: ErrorMessages.CUSTOMER_NOT_FOUND,
			stack: expect.any(String)
		});
	});
});
