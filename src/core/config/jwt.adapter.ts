import jwt from 'jsonwebtoken';

export class JwtAdapter {
	constructor(private readonly seed: string) {}

	async generateToken<T>(payload: Record<string, unknown>, duration: string = '2h'): Promise<T | null> {
		return new Promise((resolve) => {
			jwt.sign(payload, this.seed, { expiresIn: duration }, (err, token) => {
				if (err) resolve(null);

				resolve(token as T);
			});
		});
	}

	async validateToken<T>(token: string): Promise<T | null> {
		return new Promise((resolve) => {
			jwt.verify(token, this.seed, (err, decoded) => {
				if (err) return resolve(null);

				resolve(decoded as T);
			});
		});
	}
}
