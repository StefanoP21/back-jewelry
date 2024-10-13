import { Server } from '../src/server';
import { envs } from '../src/core';

jest.mock('../src/server.ts');

describe('Testing app.ts', () => {
	it('should start server with correct arguments and start it', async () => {
		await import('../src/app');

		expect(Server).toHaveBeenCalledTimes(1);
		expect(Server).toHaveBeenCalledWith({
			port: envs.PORT,
			routes: expect.any(Function),
			apiPrefix: envs.API_PREFIX
		});
		expect(Server.prototype.start).toHaveBeenCalledTimes(1);
	});
});
