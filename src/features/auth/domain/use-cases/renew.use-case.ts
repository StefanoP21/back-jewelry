import { AuthEntity } from '../entities';
import { AuthRepository } from '../repositories/repository';

export interface RenewUserUseCase {
	execute(dni: string): Promise<AuthEntity>;
}

export class RenewUser implements RenewUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(dni: string): Promise<AuthEntity> {
		return this.repository.renew(dni);
	}
}
