import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

let refund = {
	purchaseId: 1,
	comment: 'Este es un comentario de prueba',
	userDNI: '77229991',
	refundDetail: [
		{
			purchaseDetailId: 1,
			quantity: 2
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

let supplier = {
	nameContact: 'example',
	email: 'example@hotmail.com',
	phone: '223436729',
	companyName: 'Example Company',
	ruc: '20345678921'
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

	refund.purchaseId = bodyPurchase.data.id;
	refund.refundDetail[0].purchaseDetailId = bodyPurchase.data.purchaseDetail[0].id;
}, 25000);

afterAll(async () => {
	await prisma.user.deleteMany();
	await prisma.purchase.deleteMany();
	await prisma.supplier.deleteMany();
	await prisma.product.deleteMany();
	await prisma.material.deleteMany();
	await prisma.category.deleteMany();

	testServer.close();
});

describe('Testing refund routes', () => {
	it('should create a refund - api/refund', async () => {
		const { body } = await request(testServer.app)
			.post('/api/refund')
			.set('Authorization', `Bearer ${token}`)
			.send(refund)
			.expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				purchaseId: expect.any(Number),
				purchase: {
					bill: expect.any(String),
					supplier: expect.any(Object)
				},
				date: expect.any(String),
				comment: expect.any(String),
				userDNI: expect.any(String),
				refundDetail: expect.any(Array)
			}
		});
	});

	it('should get all refunds - api/refund', async () => {
		const { body } = await request(testServer.app)
			.get('/api/refund')
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Array)
		});
	});

	it('should get a refund by id - api/refund/:id', async () => {
		const id = await prisma.refund.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.get(`/api/refund/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				purchaseId: expect.any(Number),
				purchase: {
					bill: expect.any(String),
					supplier: expect.any(Object)
				},
				date: expect.any(String),
				comment: expect.any(String),
				userDNI: expect.any(String),
				refundDetail: expect.any(Array)
			}
		});
	});

	it('should delete a refund - api/refund/:id', async () => {
		const id = await prisma.refund.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.delete(`/api/refund/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				purchaseId: expect.any(Number),
				purchase: {
					bill: expect.any(String),
					supplier: expect.any(Object)
				},
				date: expect.any(String),
				comment: expect.any(String),
				userDNI: expect.any(String),
				refundDetail: expect.any(Array)
			}
		});
	});
});

describe('Testing refund routes - Error cases', () => {
	it('should return error when trying to get refunds with an invalid bearer token', async () => {
		const { body } = await request(testServer.app)
			.get('/api/refund')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when get refund by id - api/refund/:id', async () => {
		const id = 999999;

		const { body } = await request(testServer.app)
			.get(`/api/refund/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.NOT_FOUND);

		expect(body).toEqual({
			name: ErrorType.NOT_FOUND,
			message: ErrorMessages.REFUND_NOT_FOUND,
			stack: expect.any(String)
		});
	});
});
