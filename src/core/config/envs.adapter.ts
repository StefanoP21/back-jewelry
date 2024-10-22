import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	API_PREFIX: get('API_PREFIX').required().asString(),
	POSTGRESQL_URL: get('POSTGRESQL_URL').required().asString(),
	JWT_SEED: get('JWT_SEED').required().asString()
};
