import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

let product = {
	name: 'Producto de Prueba',
	description: 'Este es un proyecto de prueba',
	categoryId: 1,
	image: 'imagen/ruta',
	material: 'Material XD',
	price: 25.9,
	stock: 5
};

const category = {
	name: 'Categoria de Prueba'
};

const user = {
	name: 'Oscar Antonio',
	lastname: 'Medina Reyes',
	dni: '77229991',
	email: 'omedina.reyes@gmail.com',
	password: '123456',
	role: 'ADMIN'
};

let token: string;

beforeAll(async () => {
	await testServer.start();

	const { body } = await request(testServer.app).post('/api/auth/register').send(user);
	token = body.data.token;

	const { body: bodyCategory } = await request(testServer.app)
		.post('/api/category')
		.set('Authorization', `Bearer ${token}`)
		.send(category);

	product.categoryId = bodyCategory.data.id;
});

afterAll(async () => {
	await prisma.user.deleteMany();
	await prisma.category.deleteMany();
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
				category: expect.any(Object),
				image: expect.any(String),
				material: expect.any(String),
				price: expect.any(String),
				stock: expect.any(Number)
			}
		});
	});

	it('should update a product - api/product/:id', async () => {
		const id = await prisma.product.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

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
				category: expect.any(Object),
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
		const id = await prisma.product.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.get(`/api/product/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String),
				description: expect.any(String),
				category: expect.any(Object),
				image: expect.any(String),
				material: expect.any(String),
				price: expect.any(String),
				stock: expect.any(Number)
			}
		});
	});

	it('should delete a product - api/product/:id', async () => {
		const id = await prisma.product.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.delete(`/api/product/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Object)
		});
	});
});

describe('Testing product routes - Error cases', () => {
	it('should return error when trying to get products with an invalid bearer token', async () => {
		const { body } = await request(testServer.app)
			.get('/api/product')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when get product by id - api/product/:id', async () => {
		const id = 999999;

		const { body } = await request(testServer.app)
			.get(`/api/product/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.NOT_FOUND);

		expect(body).toEqual({
			name: ErrorType.NOT_FOUND,
			message: ErrorMessages.PRODUCT_NOT_FOUND,
			stack: expect.any(String)
		});
	});
});
