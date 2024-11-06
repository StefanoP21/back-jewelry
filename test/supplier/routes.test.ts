import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

let supplier = {
	nameContact: 'example',
	email: 'example@hotmail.com',
	phone: '223436729',
	companyName: 'Example Company',
	ruc: '20345678921'
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

describe('Testing supplier routes', () => {
	it('should create a new supplier - api/supplier', async () => {
		const { body } = await request(testServer.app)
			.post('/api/supplier')
			.set('Authorization', `Bearer ${token}`)
			.send(supplier)
			.expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				nameContact: expect.any(String),
				email: expect.any(String),
				phone: expect.any(String),
				companyName: expect.any(String),
				ruc: expect.any(String)
			}
		});
	});

	it('should update a supplier - api/supplier/:id', async () => {
		const id = await prisma.supplier.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);
		const { body } = await request(testServer.app)
			.put(`/api/supplier/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(supplier)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				nameContact: expect.any(String),
				email: expect.any(String),
				phone: expect.any(String),
				companyName: expect.any(String),
				ruc: expect.any(String)
			}
		});
	});

	it('should get all suppliers - api/supplier', async () => {
		const { body } = await request(testServer.app)
			.get('/api/supplier')
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Array)
		});
	});

	it('should get a supplier by id - api/supplier/:id', async () => {
		const id = await prisma.supplier.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.get(`/api/supplier/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				nameContact: expect.any(String),
				email: expect.any(String),
				phone: expect.any(String),
				companyName: expect.any(String),
				ruc: expect.any(String)
			}
		});
	});

	it('should delete a supplier - api/supplier/:id', async () => {
		const id = await prisma.supplier.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.delete(`/api/supplier/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				nameContact: expect.any(String),
				email: expect.any(String),
				phone: expect.any(String),
				companyName: expect.any(String),
				ruc: expect.any(String)
			}
		});
	});
});

describe('Testing supplier routes - Error cases', () => {
	it('should return error when trying to get suppliers with an invalid bearer token', async () => {
		const { body } = await request(testServer.app)
			.get('/api/supplier')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when get supplier by id - api/supplier/:id', async () => {
		const id = 999999;

		const { body } = await request(testServer.app)
			.get(`/api/supplier/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.NOT_FOUND);

		expect(body).toEqual({
			name: ErrorType.NOT_FOUND,
			message: ErrorMessages.SUPPLIER_NOT_FOUND,
			stack: expect.any(String)
		});
	});
});
