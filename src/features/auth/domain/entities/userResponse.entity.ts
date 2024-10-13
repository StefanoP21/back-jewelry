import { UserEntity } from './user.entity';

export class UserResponseEntity {
	constructor(public readonly user: Omit<UserEntity, 'password'>) {}
}
