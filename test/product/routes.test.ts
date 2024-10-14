import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

const product = {
	name: 'Producto de Prueba',
	description: 'Este es un proyecto de prueba',
	categoryId: 1,
	image: 'imagen/ruta',
	material: 'Material XD',
	price: 25.9,
	stock: 5
};

const user = {
	dni: '12345678',
	password: '123456'
};

let token: string;

beforeAll(async () => {
	await testServer.start();

	const { body } = await request(testServer.app).post('/api/auth/login').send(user);
	token = body.data.token;
});

afterAll(async () => {
	testServer.close();
});

describe('Testing product routes', () => {
	it('should create a new product - api/product', async () => {
		const { body } = await request(testServer.app)
			.post('/api/product')
			.set('Authorization', `Bearer ${token}`)
			.send(product)
			.expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				description: expect.any(String),
				categoryId: expect.any(Number),
				image: expect.any(String),
				material: expect.any(String),
				price: expect.any(String),
				stock: expect.any(Number)
			}
		});
	});

	it('should update a product - api/product/:id', async () => {
		const id = prisma.product.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);
		console.log(id);

		const { body } = await request(testServer.app)
			.put(`/api/product/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(product)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				description: expect.any(String),
				categoryId: expect.any(Number),
				image: expect.any(String),
				material: expect.any(String),
				price: expect.any(String),
				stock: expect.any(Number)
			}
		});
	});

	it('should get all products - api/product', async () => {
		const { body } = await request(testServer.app)
			.get('/api/product')
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Array)
		});
	});

	it('should get product by id - api/product/:id', async () => {
		const id = prisma.product.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);
		console.log(id);

		const { body } = await request(testServer.app)
			.get(`/api/product/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				description: expect.any(String),
				categoryId: expect.any(Number),
				image: expect.any(String),
				material: expect.any(String),
				price: expect.any(String),
				stock: expect.any(Number)
			}
		});
	});

	it('should delete a product - api/product/:id', async () => {
		const id = prisma.product.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);
		console.log(id);

		const { body } = await request(testServer.app)
			.delete(`/api/product/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(String)
		});
	});
});
