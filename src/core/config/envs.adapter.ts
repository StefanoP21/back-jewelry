import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	POSTGRESQL_URL: get('POSTGRESQL_URL').required().asString(),
	JWT_SEED: get('JWT_SEED').required().asString()
};
