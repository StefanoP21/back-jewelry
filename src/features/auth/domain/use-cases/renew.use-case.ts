import { AuthEntity } from '../entities';
import { AuthRepository } from '../repositories/repository';

export interface RenewUserUseCase {
	execute(id: string): Promise<AuthEntity>;
}

export class RenewUser implements RenewUserUseCase {
	constructor(private readonly repository: AuthRepository) {}

	execute(id: string): Promise<AuthEntity> {
		return this.repository.renew(id);
	}
}
