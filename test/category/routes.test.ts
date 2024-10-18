import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

let category = {
	name: 'Categoria Prueba'
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

describe('Testing category routes', () => {
	it('should create a new category - api/category', async () => {
		const { body } = await request(testServer.app)
			.post('/api/category')
			.set('Authorization', `Bearer ${token}`)
			.send(category)
			.expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String)
			}
		});
	});

	it('should update a category - api/category/:id', async () => {
		const id = await prisma.category.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.put(`/api/category/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(category)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String)
			}
		});
	});

	it('should get all categories - api/category', async () => {
		const { body } = await request(testServer.app)
			.get('/api/category')
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Array)
		});
	});

	it('should get category by id - api/category/:id', async () => {
		const id = await prisma.category.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.get(`/api/category/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String)
			}
		});
	});

	it('should delete a category - api/category/:id', async () => {
		const id = await prisma.category.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.delete(`/api/category/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String)
			}
		});
	});
});

describe('Testing category routes - Error cases', () => {
	it('should return error when trying to get categories with an invalid bearer token', async () => {
		const { body } = await request(testServer.app)
			.get('/api/category')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when get category by id - api/category/:id', async () => {
		const id = 999999;

		const { body } = await request(testServer.app)
			.get(`/api/category/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.NOT_FOUND);

		expect(body).toEqual({
			name: ErrorType.NOT_FOUND,
			message: ErrorMessages.CATEGORY_NOT_FOUND,
			stack: expect.any(String)
		});
	});
});
