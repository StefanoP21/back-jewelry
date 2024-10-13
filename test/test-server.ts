import { envs } from '../src/core';
import { Server } from '../src/server';
import { AppRoutes } from '../src/routes';

export const testServer = new Server({
	port: envs.PORT,
	routes: AppRoutes.routes,
	apiPrefix: envs.API_PREFIX
});
