import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

let order = {
	customerId: 1,
	userId: 1,
	paymentMethod: 'CASH',
	total: 150.5,
	totalDesc: 10,
	orderDetail: [
		{
			productId: 1,
			quantity: 1,
			unitPrice: 100
		}
	]
};

let purchase = {
	supplierId: 1,
	total: 150.5,
	bill: 'Factura de Prueba',
	userDNI: '77229991',
	purchaseDetail: [
		{
			productId: 1,
			quantity: 20,
			unitPrice: 15.5
		}
	]
};

let supplier = {
	nameContact: 'example',
	email: 'example@hotmail.com',
	phone: '223436729',
	companyName: 'Example Company',
	ruc: '20345678921'
};

let customer = {
	name: 'Sebastian',
	lastName: 'Simon',
	email: 'sebas2@hotmail.com',
	dni: '98765432',
	phone: '334135669'
};

let material = {
	name: 'Material de Prueba'
};

const category = {
	name: 'Categoria de Prueba'
};

let product = {
	name: 'Producto de Prueba',
	description: 'Este es un proyecto de prueba',
	categoryId: 1,
	image: 'imagen/ruta',
	materialId: 1
};

const user = {
	name: 'Oscar Antonio',
	lastname: 'Medina Reyes',
	dni: '12345678',
	email: 'oscar@hotmail.com',
	password: '123456',
	role: 'ADMIN'
};

let token: string;

beforeAll(async () => {
	await testServer.start();

	const { body } = await request(testServer.app).post('/api/auth/register').send(user);
	token = body.data.token;

	//* Crear material
	const { body: bodyMaterial } = await request(testServer.app)
		.post('/api/material')
		.set('Authorization', `Bearer ${token}`)
		.send(material);

	product.materialId = bodyMaterial.data.id;

	//* Crear categoría
	const { body: bodyCategory } = await request(testServer.app)
		.post('/api/category')
		.set('Authorization', `Bearer ${token}`)
		.send(category);

	product.categoryId = bodyCategory.data.id;

	//* Crear producto
	const { body: bodyProduct } = await request(testServer.app)
		.post('/api/product')
		.set('Authorization', `Bearer ${token}`)
		.send(product);

	//* Crear proveedor
	const { body: bodySupplier } = await request(testServer.app)
		.post('/api/supplier')
		.set('Authorization', `Bearer ${token}`)
		.send(supplier);

	purchase.supplierId = bodySupplier.data.id;
	purchase.purchaseDetail[0].productId = bodyProduct.data.id;

	//* Crear compra
	const { body: bodyPurchase } = await request(testServer.app)
		.post('/api/purchase')
		.set('Authorization', `Bearer ${token}`)
		.send(purchase);

	//* Crear cliente
	const { body: bodyCustomer } = await request(testServer.app)
		.post('/api/customer')
		.set('Authorization', `Bearer ${token}`)
		.send(customer);

	order.customerId = bodyCustomer.data.id;
	order.userId = body.data.user.id;
	order.orderDetail[0].productId = bodyProduct.data.id;
}, 25000);

afterAll(async () => {
	await prisma.user.deleteMany();
	await prisma.purchase.deleteMany();
	await prisma.supplier.deleteMany();
	await prisma.product.deleteMany();
	await prisma.material.deleteMany();
	await prisma.category.deleteMany();
	await prisma.customer.deleteMany();

	testServer.close();
});

describe('Testing order routes', () => {
	it('should create an order - api/order', async () => {
		const { body } = await request(testServer.app)
			.post('/api/order')
			.set('Authorization', `Bearer ${token}`)
			.send(order)
			.expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				customerId: expect.any(Number),
				customer: expect.any(Object),
				userId: expect.any(Number),
				date: expect.any(String),
				paymentMethod: expect.any(String),
				total: expect.any(String),
				totalDesc: expect.any(String),
				orderDetail: expect.any(Array)
			}
		});
	});

	it('should get all orders - api/order', async () => {
		const { body } = await request(testServer.app)
			.get('/api/order')
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Array)
		});
	});

	it('should get an order by id - api/order/:id', async () => {
		const id = await prisma.order.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.get(`/api/order/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				customerId: expect.any(Number),
				customer: expect.any(Object),
				userId: expect.any(Number),
				date: expect.any(String),
				paymentMethod: expect.any(String),
				total: expect.any(String),
				totalDesc: expect.any(String),
				orderDetail: expect.any(Array)
			}
		});
	});

	it('should delete an order - api/order/:id', async () => {
		const id = await prisma.order.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.delete(`/api/order/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				customerId: expect.any(Number),
				customer: expect.any(Object),
				userId: expect.any(Number),
				date: expect.any(String),
				paymentMethod: expect.any(String),
				total: expect.any(String),
				totalDesc: expect.any(String),
				orderDetail: expect.any(Array)
			}
		});
	});
});

describe('Testing refund routes - Error cases', () => {
	it('should return error when trying to get refunds with an invalid bearer token', async () => {
		const { body } = await request(testServer.app)
			.get('/api/order')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when get order by id - api/order/:id', async () => {
		const id = 999999;

		const { body } = await request(testServer.app)
			.get(`/api/order/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.NOT_FOUND);

		expect(body).toEqual({
			name: ErrorType.NOT_FOUND,
			message: ErrorMessages.ORDER_NOT_FOUND,
			stack: expect.any(String)
		});
	});
});
