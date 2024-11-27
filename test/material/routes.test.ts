import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../src/data/postgresql';
import { ErrorMessages, ErrorType, HttpCode } from '../../src/core';

let material = {
	name: 'Material de Prueba'
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

	const { body } = await request(testServer.app).post('/api/auth/register').send(user).expect(HttpCode.CREATED);
	token = body.data.token;
}, 15000);

afterAll(async () => {
	await prisma.user.deleteMany();
	testServer.close();
});

describe('Testing material routes', () => {
	it('should create a new material - api/material', async () => {
		const { body } = await request(testServer.app)
			.post('/api/material')
			.set('Authorization', `Bearer ${token}`)
			.send(material)
			.expect(HttpCode.CREATED);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String)
			}
		});
	});

	it('should update a material - api/material/:id', async () => {
		const id = await prisma.material.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.put(`/api/material/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(material)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String)
			}
		});
	});

	it('should get all materials - api/material', async () => {
		const { body } = await request(testServer.app)
			.get('/api/material')
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: expect.any(Array)
		});
	});

	it('should get material by id - api/material/:id', async () => {
		const id = await prisma.material.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.get(`/api/material/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.OK);

		expect(body).toEqual({
			data: {
				id: expect.any(Number),
				name: expect.any(String)
			}
		});
	});

	it('should delete a material - api/material/:id', async () => {
		const id = await prisma.material.findMany({ take: 1, orderBy: { id: 'desc' } }).then((res) => res[0].id);

		const { body } = await request(testServer.app)
			.delete(`/api/material/${id}`)
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

describe('Testing material routes - Error cases', () => {
	it('should return error when trying to get materials with an invalid bearer token', async () => {
		const { body } = await request(testServer.app)
			.get('/api/material')
			.set('Authorization', `123`)
			.expect(HttpCode.UNAUTHORIZED);

		expect(body).toEqual({
			name: ErrorType.UNAUTHORIZED,
			message: ErrorMessages.WRONG_AUTHORIZATION_HEADER,
			stack: expect.any(String)
		});
	});

	it('should return error when get material by id - api/material/:id', async () => {
		const id = 999999;

		const { body } = await request(testServer.app)
			.get(`/api/material/${id}`)
			.set('Authorization', `Bearer ${token}`)
			.expect(HttpCode.NOT_FOUND);

		expect(body).toEqual({
			name: ErrorType.NOT_FOUND,
			message: ErrorMessages.MATERIAL_NOT_FOUND,
			stack: expect.any(String)
		});
	});
});
