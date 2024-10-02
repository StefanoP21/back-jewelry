import express, { type Router, type Request, type Response } from 'express';
import { type Server as ServerHttp } from 'http';
import cors from 'cors';
// import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core';
import { ErrorMiddleware } from './features/shared';

interface ServerOptions {
	port: number;
	routes: Router;
}

export class Server {
	public readonly app = express();
	private serverListener?: ServerHttp;
	private readonly port: number;
	private readonly routes: Router;

	constructor(options: ServerOptions) {
		const { port, routes } = options;
		this.port = port;
		this.routes = routes;
	}

	async start(): Promise<void> {
		//* Middlewares
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		// this.app.use(compression());

		//* limit repeated request to public APIs
		this.app.use(
			rateLimit({
				windowMs: SIXTY * SIXTY * ONE_THOUSAND, // ? 1 hour
				limit: ONE_HUNDRED,
				message: 'Too many request from this IP, please try again in one hour'
			})
		);

		//* Routes
		this.app.use(this.routes);

		//* Test route
		this.app.get('/', (_req: Request, res: Response) => {
			return res.status(HttpCode.OK).send({
				message: `Welcome to this API! \n Endpoints available at http://localhost:${this.port}/`
			});
		});

		//* Error Middleware
		this.routes.use(ErrorMiddleware.handleError);

		//* Listener
		this.serverListener = this.app.listen(this.port, () => {
			console.log(`Server running at http://localhost:${this.port} 🚀`);
		});
	}

	close(): void {
		this.serverListener?.close();
	}
}
