import { CustomError, ErrorMessages } from '../../../core';
import { prisma } from '../../../data/postgresql';
import { CustomerEntity, type CustomerDatasource, type CreateCustomerDto, type UpdateCustomerDto } from '../domain';

export class CustomerDatasourceImpl implements CustomerDatasource {
	constructor() {}

	async getAll(): Promise<CustomerEntity[]> {
		try {
			const customers = await prisma.customer.findMany({
				orderBy: { name: 'asc' }
			});
			return customers.map((customer) => CustomerEntity.fromObject(customer));
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener los clientes: ${error}`);
		}
	}

	async getById(id: number): Promise<CustomerEntity> {
		try {
			const customer = await prisma.customer.findUnique({ where: { id } });
			if (!customer) throw CustomError.notFound(ErrorMessages.CUSTOMER_NOT_FOUND);
			return CustomerEntity.fromObject(customer);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al obtener el cliente con id ${id}: ${error}`);
		}
	}

	async create(dto: CreateCustomerDto): Promise<CustomerEntity> {
		try {
			const customer = await prisma.customer.create({ data: dto });
			return CustomerEntity.fromObject(customer);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al crear el cliente: ${error}`);
		}
	}

	async update(dto: UpdateCustomerDto): Promise<CustomerEntity> {
		try {
			const { id } = await this.getById(dto.id);
			const customer = await prisma.customer.update({ where: { id }, data: dto });
			return CustomerEntity.fromObject(customer);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al actualizar el cliente con id ${dto.id}: ${error}`);
		}
	}

	async delete(id: number): Promise<CustomerEntity> {
		try {
			const { id: customerId } = await this.getById(id);

			const orders = await prisma.order.findMany({ where: { customerId } });
			if (orders.length > 0) {
				throw CustomError.badRequest(
					`El cliente con id ${customerId} tiene compras registradas y no puede ser eliminado.`
				);
			}

			const deletedCustomer = await prisma.customer.delete({ where: { id: customerId } });
			return CustomerEntity.fromObject(deletedCustomer);
		} catch (error) {
			if (error instanceof CustomError) throw error;
			throw CustomError.internalServer(`Error al eliminar el cliente con id ${id}: ${error}`);
		}
	}
}
