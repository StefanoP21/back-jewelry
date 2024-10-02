import { envs } from './core';
import { AppRoutes } from './routes';
import { Server } from './server';

(() => {
	main();
})();

async function main(): Promise<void> {
	//* Server
	const server = new Server({
		port: envs.PORT,
		routes: AppRoutes.routes
	});

	server.start();
}
